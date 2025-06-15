// Gestión de usuarios 
import { UtilManager } from "./utils.js";
export class UserManager {


    nickname() {
        let nombre = document.getElementById('nom').value.trim();
        let apellido = document.getElementById('apellido').value.trim();
        // Obtener la primera letra del nombre y convertirla a minúsculas
        let inicial = nombre.charAt(0).toLowerCase();

        // Concatenar la inicial con el apellido
        let nomuser = inicial + apellido.toLowerCase();

        // Asignar el valor generado al campo de usuario
        document.getElementById("usuario").value = nomuser;


    }
    editarUsuarios(button) {

        const row = button.closest('tr');

        const id = row.cells[0].innerText;

        axios.get(`https://back-granja.vercel.app/user/obtener_usuario/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                const user = response.data;
                document.getElementById('edit-id-usuario').value = user.id_usuario;
                document.getElementById('edit-nombre-usuario').value = user.nombres;
                document.getElementById('edit-apellido-usuario').value = user.apellidos;
                document.getElementById('edit-edad-usuario').value = user.edad;

                // Seleccionar el radio button de sexo según el valor recuperado
                if (user.sexo === "M") {
                    document.getElementById('edit-masculino').checked = true;
                } else if (user.sexo === "F") {
                    document.getElementById('edit-femenino').checked = true;
                } else {
                    document.getElementById('edit-masculino').checked = false;
                    document.getElementById('edit-femenino').checked = false;


                }

                document.getElementById('edit-usuario-username').value = user.usuario;
                document.getElementById('edit-usuario-contraseña').value = user.contraseña;
                document.getElementById('edit-usuario-rol').value = user.id_rol;

            })
            .catch(err => {
                console.log('Error: ', err);
                alert('Ocurrió un error al obtener los datos del usuario');
            });
    }
    cargarUsuarios() {
        const tablaActivos = $('#tablacontacs').DataTable();
        const tablaInactivos = $('#table-user-ban').DataTable();

        // Cantidad total de usuarios
        axios.get('https://back-granja.vercel.app/user/total_usuarios')
            .then(response => {
                document.getElementById('num_usuarios').innerHTML = `${response.data.total} Usuarios Registrados`;
            })
            .catch(err => console.log('Error: ', err));

        // Obtener todos los usuarios y llenar ambas tablas
        axios.get('https://back-granja.vercel.app/user/obtener_usuarios')
            .then(response => {
                tablaActivos.clear();
                tablaInactivos.clear();

                response.data.forEach(user => {
                    if (user.estado === 'activo') {
                        tablaActivos.row.add([
                            user.id_usuario,
                            user.nombres,
                            user.apellidos,
                            user.usuario,
                            '•'.repeat(user.contraseña.length) +
                            ` <button class="btn bi bi-eye-fill text-success fs-5 border-0" onclick="userManager.togglePass(this, '${user.contraseña}')"></button>`,
                            user.tipo_usuario,
                            `<button class="btn-editar-usuario btn btn-warning mx-5" data-bs-toggle="modal" data-bs-target="#modalEditarUsuario"><i class="bi bi-pencil-square"></i></button>`,
                            `<div class="form-check">
                            <input class="check-eliminar collapse" type="checkbox" id="check_eliminar" value="${user.id_usuario}">
                        </div>`
                        ]).draw(false);
                    } else if (user.estado === 'inactivo') {
                        tablaInactivos.row.add([
                            user.id_usuario,
                            user.nombres,
                            user.apellidos,
                            user.tipo_usuario,
                            `<div class="form-check">
                            <input class="check-eliminar-ban" type="checkbox" id="check_eliminar-ban" value="${user.id_usuario}">
                        </div>`
                        ]).draw(false);
                    }
                });

                tablaActivos.draw();
                tablaInactivos.draw();
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ha ocurrido un error al obtener los usuarios",
                });
                console.log('Error: ', err);
            });
    }
    agregarUsuarios(event) {
        event.preventDefault();
        const userManager = new UserManager();
        const utilManager = new UtilManager()


        const id_usuario = parseInt(document.getElementById('id-usuario').value.trim());
        const nombre = document.getElementById('nom').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const edad = parseInt(document.getElementById('edad').value.trim());
        const sexoElement = document.querySelector('input[name="txtsexo"]:checked');
        const sexo = sexoElement ? sexoElement.value : null;
        const usuario = document.getElementById('usuario').value.trim();
        const contraseña = document.getElementById('contraseña').value.trim();
        const rol = parseInt(document.getElementById('rol').value.trim());


        const camposValidacion = [
            {
                id: "nom",
                alertaId: "alert-nom",
                mensaje: "El nombre debe contener solo letras",
                validar: valor => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)
            },
            {
                id: "apellido",
                alertaId: "alert-apellido",
                mensaje: "El apellido debe contener solo letras",
                validar: valor => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)
            },
            {
                id: "edad",
                alertaId: "alert-edad",
                mensaje: "Ingrese una edad válida",
                validar: valor => !isNaN(valor) && valor > 0 && valor <= 90
            },
            {
                id: "lblgenero", 
                alertaId: "alert-sexo",
                mensaje: "Seleccione un género",
                obtenerValor: () => {
                    const seleccionado = document.querySelector('input[name="txtsexo"]:checked');
                    return seleccionado ? seleccionado.value : "";
                },
                validar: valor => valor !== ""
            },
            {

                id: "id-usuario",
                alertaId: "alert-id_usuario",
                mensaje: "Ingrese un número de cédula válido",
                validar: valor => !isNaN(valor) && valor > 0
            },
            {
                id: "usuario",
                alertaId: "alert-usuario",
                mensaje: "El usuario debe contener solo letras y tener entre 3 y 20 caracteres",
                validar: valor => /^[a-zA-Z]+$/.test(valor) && valor.length >= 3 && valor.length <= 20
            },
            {
                id: "contraseña",
                alertaId: "alert-contraseña",
                mensaje: "La contraseña debe tener entre 8 y 30 caracteres y solo contener letras y números",
                validar: valor => /^[a-zA-Z0-9]+$/.test(valor) && valor.length >= 8 && valor.length <= 30
            },
            {
                id: "rol",
                alertaId: "alert-rol",
                mensaje: "Debe seleccionar un rol",
                validar: valor => valor !== ""
            },
        ];


        if (utilManager.validarCampos(camposValidacion)) {
            let data = {
                id_usuario: id_usuario,
                nombres: nombre,
                apellidos: apellido,
                edad: edad,
                sexo: sexo,
                usuario: usuario,
                contraseña: contraseña,
                id_rol: rol
            }
            console.log(data)

            axios({
                method: 'POST',
                url: 'https://back-granja.vercel.app/user/nuevo_usuario', data,
            }).then(function (response) {
                Swal.fire({
                    title: "Usuario creado con éxito!",
                    icon: "success"
                });
                formAdd.reset()
                userManager.cargarUsuarios()
            }).catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ocurrio un error al crear usuario!",
                });
                console.log('Error: ', err);
            })
        }

    }
  
    guardarCambiosUsuarios() {
        const userManager = new UserManager();
        const utilManager = new UtilManager()
        const id = parseInt(document.getElementById('edit-id-usuario').value.trim())
        const nombre = document.getElementById('edit-nombre-usuario').value.trim();
        const apellido = document.getElementById('edit-apellido-usuario').value.trim();
        const edad = parseInt(document.getElementById('edit-edad-usuario').value.trim());
        const sexo = document.querySelector('input[name="edit-sexo-usuario"]:checked').value;
        const usuario = document.getElementById('edit-usuario-username').value.trim();
        const contraseña = document.getElementById('edit-usuario-contraseña').value.trim();
        const rol = parseInt(document.getElementById('edit-usuario-rol').value.trim());


        // const validaciones=()=>{

        //     if (!nombre || !apellido || !edad || !sexo || !id || !usuario || !contraseña || !rol) {
        //         Swal.fire({
        //             title: "Debes completar todos los campos!",
        //             icon: "warning"
        //         });
        //         return;
        //     }


        //     // Validar nombre y apellido (solo letras y espacios)
        //     const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        //     if (!nameRegex.test(nombre)) {
        //         crearAlert('edit-nombre-usuario', 'alert-nom', 'El nombre debe contener solo letras');
        //         setTimeout(() => {
        //             ocultarAlert("alert-nom");
        //         }, 3000);
        //         return;
        //     }
        //     if (!nameRegex.test(apellido)) {

        //         crearAlert('edit-apellido-usuario', 'alert-apellido', 'El apellido debe contener solo letras')
        //         setTimeout(() => {
        //             ocultarAlert("alert-apellido");
        //         }, 3000);
        //         return;

        //     }
        //     if (edad > 90) {
        //         crearAlert('edit-edad-usuario', 'alert-edad', 'Ingrese una edad valida')
        //         setTimeout(() => {
        //             ocultarAlert("alert-edad");
        //         }, 3000);
        //         return;
        //     }

        //     // Validar edad (debe ser un número positivo)
        //     if (isNaN(edad) || edad < 0) {
        //         crearAlert('edit-edad-usuario', 'alert-edad', 'Ingrese una edad valida')
        //         setTimeout(() => {
        //             ocultarAlert("alert-edad");
        //         }, 3000);
        //         return;

        //     }
        //     if (sexo == null) {
        //         crearAlert('edit-sexo-usuario', 'alert-sexo', 'Seleccione un genero')
        //         setTimeout(() => {
        //             ocultarAlert("alert-sexo");
        //         }, 3000);
        //         return;

        //     }

        //     // Validar cédula (solo números y positivos)
        //     if (isNaN(id) || id < 0) {
        //         crearAlert('edit-id-usuario', 'alert-id', 'Ingrese un número de cédula valido')
        //         setTimeout(() => {
        //             ocultarAlert("alert-id");
        //         }, 3000);
        //         return;

        //     }

        //     // Validar usuario (solo letras y números, longitud entre 6 y 20 caracteres)
        //     if (usuario.length < 3 || usuario.length > 20) {
        //         crearAlert('edit-usuario-usuario', 'alert-usuario', 'El usuario debe contar entre 3 y 20 caracteres')
        //         setTimeout(() => {
        //             ocultarAlert("alert-usuario");
        //         }, 3000);
        //         return;

        //     }
        //     const usuarioRegex = /^[a-zA-Z0-9]+$/; // Solo letras y números
        //     if (!usuarioRegex.test(usuario)) {
        //         crearAlert('edit-usuario-usuario', 'alert-usuario', 'El usuario solo puede contener letras y números')
        //         setTimeout(() => {
        //             ocultarAlert("alert-usuario");
        //         }, 3000);
        //         return;

        //     }

        //     // Validar contraseña (solo letras y números, longitud entre 8 y 30 caracteres)
        //     if (contraseña.length < 8 || contraseña.length > 30) {
        //         crearAlert('edit-contraseña-usuario', 'alert-contraseña', 'La contraseña debe contar entre 8 y 30 caracteres')
        //         setTimeout(() => {
        //             ocultarAlert("alert-contraseña");
        //         }, 3000);
        //         return;

        //     }
        //     const passwordRegex = /^[a-zA-Z0-9]+$/; // Solo letras y números
        //     if (!passwordRegex.test(contraseña)) {
        //         crearAlert('edit-contraseña-usuario', 'alert-contraseña', 'La contraseña debe contar entre 8 y 30 caracteres')
        //         setTimeout(() => {
        //             ocultarAlert("alert-contraseña");
        //         }, 3000);
        //         return;


        //     }

        // }
        const validacionesUsuario = [
            {
                id: "edit-nombre-usuario",
                alertaId: "alert-nom",
                mensaje: "El nombre debe contener solo letras",
                validar: valor => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)
            },
            {
                id: "edit-apellido-usuario",
                alertaId: "alert-apellido",
                mensaje: "El apellido debe contener solo letras",
                validar: valor => /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)
            },
            {
                id: "edit-edad-usuario",
                alertaId: "alert-edad",
                mensaje: "Ingrese una edad válida (1-90)",
                validar: valor => !isNaN(valor) && valor > 0 && valor <= 90
            },
            // {
            //     id: "edit-id-usuario",
            //     alertaId: "alert-id",
            //     mensaje: "Ingrese un número de cédula válido",
            //     validar: valor => !isNaN(valor) && valor > 0
            // }

            {
                id: "edit-usuario-username",
                alertaId: "alert-usuario",
                mensaje: "El usuario debe contar entre 3 y 20 caracteres y solo letras/números",
                validar: valor => /^[a-zA-Z0-9]{3,20}$/.test(valor)
            },
            {
                id: "edit-usuario-contraseña",
                alertaId: "alert-contraseña",
                mensaje: "La contraseña debe contar entre 8 y 30 caracteres y solo letras/números",
                validar: valor => /^[a-zA-Z0-9]{8,30}$/.test(valor)
            }
            // {
            //     id: "grupo-sexo", // ID del contenedor para mostrar la alerta
            //     alertaId: "alert-sexo", // ID único para la alerta
            //     mensaje: "Seleccione un género",
            //     obtenerValor: () => {
            //         const radios = document.querySelectorAll('input[name="edit-sexo-usuario"]');
            //         const seleccionado = [...radios].find(r => r.checked);
            //         return seleccionado ? seleccionado.value : "";
            //     },
            //     validar: valor => valor !== ""
            // }


        ];


        if (utilManager.validarCampos(validacionesUsuario)) {
            const data = {
                id_usuario: id,
                nombres: nombre,
                apellidos: apellido,
                edad: edad,
                sexo: sexo,
                usuario: usuario,
                contraseña: contraseña,
                id_rol: rol
            };
            console.log(data)



            axios.put(`https://back-granja.vercel.app/user/editar_usuario/${id}`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    userManager.cargarUsuarios();
                    Swal.fire({
                        icon: "success",
                        title: response.data.informacion,
                        showConfirmButton: false,
                        timer: 1500
                    });
                })
                .catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Ocurrio un error al actualizar!",
                    });
                    console.log('Error: ', err);
                });
        }
    }
    togglePass(button, contraseña) {
        // const userManager= new UserManager()

        // Encontrar la celda que contiene la contraseña
        let celda = button.closest('td');

        // Verificar si actualmente la contraseña está oculta o visible
        if (button.classList.contains('bi-eye-fill')) {
            // Si está oculta, mostrar la contraseña
            celda.innerHTML = contraseña +
                ` <button class="btn bi bi-eye-slash-fill text-success fs-5 border-0 " onclick="userManager.togglePass(this, '${contraseña}')"></button>`;
        } else {
            // Si está visible, ocultarla de nuevo con puntos
            celda.innerHTML = '•'.repeat(contraseña.length) +
                ` <button class="btn bi bi-eye-fill text-success fs-5 border-0 " onclick="userManager.togglePass(this, '${contraseña}')"></button>`;
        }
    };
    togglePassEdit(button) {

        var passwordInput = document.getElementById("edit-usuario-contraseña"); // Obtén el campo de la contraseña
        var icon = button; // Obtén el botón con el ícono del ojo

        // Verifica si la contraseña está oculta
        if (passwordInput.type === "password") {
            passwordInput.type = "text"; // Muestra la contraseña
            icon.classList.remove("bi-eye-fill"); // Cambia el ícono a ojo abierto
            icon.classList.add("bi-eye-slash-fill");
        } else {
            passwordInput.type = "password"; // Oculta la contraseña
            icon.classList.remove("bi-eye-slash-fill"); // Cambia el ícono a ojo cerrado
            icon.classList.add("bi-eye-fill");
        }
    }

    

}

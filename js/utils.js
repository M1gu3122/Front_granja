// Funciones utilitarias 

import { UserManager } from "./userManagement.js";

export let idUsuarioSeleccionado;
export let idUsuarioSelect = null;
export class UtilManager {
    selectAllChecks(clase, checkMaestro) {

        // Obtener todos los checkboxes individuales de cada usuario (asegúrate que la clase es la correcta)
        var checkboxesUsuarios = document.querySelectorAll(clase);  // Asegúrate que sea .form-check-input en cada checkbox

        // Recorrer todos los checkboxes y asignarles el mismo valor (true o false) que el de checkAll
        for (var i = 0; i < checkboxesUsuarios.length; i++) {
            checkboxesUsuarios[i].checked = checkMaestro.checked;
        }
    };

    toggleEliminar(button) {
        document.getElementById('btn-eliminar').classList.remove('collapse');
        const icono = button.querySelector('i');
        var checkboxes = document.querySelectorAll('.check-eliminar');
        const checkAll = document.getElementById('checkAll');
        checkAll.classList.remove('collapse')

        // Verificar el ícono actual
        if (icono.classList.contains('bi-person-dash')) {
            // Cambiar a ícono de "cancelar"
            button.innerHTML = `<i class="bi bi-x-circle-fill"></i>`;
        } else {
            // Cambiar a ícono de "dar de baja"
            button.innerHTML = `<i class="bi bi-person-dash"></i>`;
        }

        // Mostrar u ocultar los checkboxes

        // Si se ha cambiado a "x-circle", mostrar checkboxes
        if (icono.classList.contains('bi-person-dash')) {
            checkAll.classList.remove('d-none');
            checkboxes.forEach(element => {
                element.classList.remove("collapse")
            });
            // checkboxesUsuarios.forEach(chk => chk.classList.add('d-none'));
        } else {
            document.getElementById('btn-eliminar').classList.add('collapse');

            checkAll.classList.add('d-none');
            checkboxes.forEach(element => {
                element.classList.add("collapse")
            });
            // checkboxesUsuarios.forEach(chk => chk.classList.remove('d-none'));
        }
    };

    eliminarChecks() {
        const userManagement = new UserManager()
        const checkAll = document.getElementById('checkAll');
        const btnEliminar = document.getElementById('btn-eliminar');
        const checkboxesMarcados = document.querySelectorAll('.check-eliminar:checked');
        const idsSeleccionados = Array.from(checkboxesMarcados).map(cb => cb.value);

        const peticiones = idsSeleccionados.map(id => {
            const data = { estado: "inactivo" };
            return axios.put(`http://127.0.0.1:3000/user/editar_estado_usuario/${id}`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
        });

        Promise.all(peticiones)
            .then(responses => {
                console.log("Usuarios eliminados correctamente");
                userManagement.cargarUsuarios(document.getElementById("tablacontacs"), "activo");
                userManagement.cargarUsuarios(document.getElementById("table-user-ban"), "inactivo");

                // Resetear UI
                btnEliminar.classList.add('collapse');
                document.getElementById('checkAll').checked = false;
                checkAll.classList.add('d-none');

                // Ocultar todos los checkboxes individuales
                document.querySelectorAll('.check-eliminar').forEach(chk => {
                    chk.classList.add('collapse');
                });

                // Restaurar ícono del botón eliminar
                const icono = document.querySelector('#eliminarSeleccionados i');
                icono.classList.remove('bi-x-circle-fill');
                icono.classList.add('bi-person-dash');
            })

            .catch(error => {
                console.error("Error al eliminar usuarios:", error);
            });
    };
    cambiarEstado() {
        const userManagement = new UserManager()
        const checkboxesMarcados = document.querySelectorAll('.check-eliminar-ban:checked');
        const idsSeleccionados = Array.from(checkboxesMarcados).map(cb => cb.value);

        console.log('IDs seleccionados para eliminar:', idsSeleccionados);


        const peticiones = idsSeleccionados.map(id => {
            const data = { estado: "activo" };
            return axios.put(`http://127.0.0.1:3000/user/editar_estado_usuario/${id}`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
        });

        Promise.all(peticiones)
            .then(responses => {
                userManagement.cargarUsuarios(document.getElementById("table-user-ban"), "inactivo");
                userManagement.cargarUsuarios(document.getElementById("tablacontacs"), "activo");
                console.log("Usuarios eliminados correctamente");


                // Resetear UI
                document.getElementById('checkAll-ban').checked = false;

                // Ocultar todos los checkboxes individuales
                document.querySelectorAll('.check-eliminar-ban').forEach(chk => {
                    chk.classList.add('collapse');
                });


            })

            .catch(error => {
                console.error("Error al cambiar el estado:", error);
            });
    };



    crearAlert(elemento, id, mensaje) {
        // Eliminar alerta previa si existe
        const existingAlert = document.getElementById(id);
        if (existingAlert) existingAlert.remove();

        // Obtener el elemento base
        const baseElement = document.getElementById(elemento);
        if (!baseElement) return;

        // Verificamos si el propio elemento es el contenedor
        let mainContainer = baseElement.classList.contains('col-md-6')
            ? baseElement
            : baseElement.closest('.col-md-6') || baseElement.parentElement;

        if (!mainContainer) return;

        // Crear nueva alerta
        const newDiv = document.createElement('div');
        newDiv.textContent = mensaje;
        newDiv.classList.add('alert', 'alert-danger', 'text-center', 'mb-2');
        newDiv.setAttribute('id', id);

        // Insertar la alerta al inicio del contenedor
        mainContainer.insertBefore(newDiv, mainContainer.firstChild);
    }




    ocultarAlert = (id) => {
        let elemento = document.getElementById(id);
        elemento.classList.add("d-none")
    }
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("rol");


        window.location.href = "/html/login.html";
    }
    parseJwt(token) {
        const base64Url = token.split('.')[1]; // Obtener la parte del payload
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Reemplazos para el formato base64
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload); // Convertir a objeto JSON
    }
    cerrar() {
        const utilManager = new UtilManager();
        Swal.fire({
            title: "Seguro que desea salir?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, salir",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    title: "Adiós!",
                    text: "Tu sesión se ha cerrado.",
                    html: `<img src="/update_granja/img/mano.gif" alt="custom icon" style="width: 100px; height: 100px;">`,
                    showConfirmButton: true,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#28a745"
                }).then(() => {
                    utilManager.logout()
                });
            }
        });
    };
    buscarUsuarioEdit() {

        const busqueda = inputEditBuscar.value.trim();
        const spinner = document.getElementById("spinner-edit"); // Asegúrate de que el spinner tenga este ID
        spinner.classList.remove("d-none"); // Muestra el spinner
        // Ocultar la tabla antes de la búsqueda
        const tablaBuscar = document.getElementById('div-edit-buscar');
        tablaBuscar.classList.add("collapse"); // Oculta la tabla

        try {
            const response = axios.get(`http://127.0.0.1:3000/user/buscar_usuario_tb/${busqueda}`);
            const userData = response.data;

            if (userData.informacion === 'Usuario no encontrado') {
                alert('Usuario no encontrado');
            } else {



                const tablaBuscar = document.getElementById('div-edit-buscar');
                const tbody = tablaBuscar.querySelector('tbody');
                tbody.innerHTML = '';

                userData.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
            <td>${user.id_usuario}</td>
            <td>${user.nombres}</td>
            <td>${user.apellidos}</td>                
            <td><a onclick="editSeleccionar(this)" class="btn btn-success">Seleccionar</a> </td>
          `;
                    tbody.appendChild(row);
                });
                initDataTable("#tabla-edit-buscar", dataTableOptionsTablaEditBuscar);

                // tablaBuscar.classList.remove("collapse")
            }
        } catch (error) {
            console.error(error);
            alert('Error al buscar usuario');
        } finally {
            // Ocultar el spinner después de un retraso
            setTimeout(() => {
                spinner.classList.add("d-none"); // Oculta el spinner
                tablaBuscar.classList.remove("collapse"); // Muestra la tabla
            }, 300);
        };
    }

    buscarUsuario(inputBuscar, id_spinner, id_div_buscar, id_tabla, rol) {
        console.log(inputBuscar)
        console.log(id_spinner)
        console.log(id_div_buscar)
        console.log(id_tabla)
        let Rol = parseInt(rol)
        const busqueda = inputBuscar.value.trim();

        if (!busqueda) {
            console.log("No se ha ingresado un usuario");
        } else {
            const spinner = document.getElementById(`${id_spinner}`);
            spinner.classList.remove("d-none");


            id_div_buscar.classList.add("collapse");

            axios.get(`http://127.0.0.1:3000/user/buscar_usuario_tb/${busqueda}`, {
                params: { rol: Rol }
            })
                .then(response => {
                    const userData = response.data;

                    if (userData.informacion === 'Usuario no encontrado') {
                        alert('Usuario no encontrado');
                    } else {
                        console.log("encontrado")
                        const tablaBuscar = document.getElementById(`${id_tabla}`)
                        const tbody = tablaBuscar.querySelector('tbody');
                        tbody.innerHTML = '';

                        userData.forEach(user => {
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${user.id_usuario}</td>
                                <td>${user.nombres}</td>
                                <td>${user.apellidos}</td>
                                <td><a  class="btn btn-success">Seleccionar</a></td>
                            `;

                            const selectButton = row.querySelector('a');
                            selectButton.addEventListener('click', () => this.Seleccionar(selectButton, id_div_buscar));
                            tbody.appendChild(row);
                        });

                        // initDataTable("#tabla-buscar", dataTableOptionsTablaBuscar);
                    }
                })
                .catch(error => {
                    console.error(error);
                    alert('Error al buscar usuario');
                })
                .finally(() => {
                    setTimeout(() => {
                        spinner.classList.add("d-none");
                        id_div_buscar.classList.remove("collapse");
                    }, 300);
                });
        }
    }

    Seleccionar(elemento, div_tabla) {
        // const tablaBuscar = document.getElementById("cont-tabla");
        const fila = elemento.parentNode.parentNode;
        const idUsuario = fila.cells[0].textContent;
        idUsuarioSelect = idUsuario;

        // console.log('ID de usuario seleccionado:', idUsuarioSeleccionado);
        div_tabla.classList.add("collapse")
        return console.log("usuario seleccionado " + idUsuarioSeleccionado)

    }


    inputB(div_id) {
        div_id.classList.add("collapse")
    }
    verificarToken(rolesPermitidos = []) {
        const token = localStorage.getItem("token");
        const rol = localStorage.getItem("rol");

        if (!token) {
            window.location.replace = "/html/login.html";
            return false;
        }

        if (!rolesPermitidos.includes(rol)) {
            window.location.replace = "/html/login.html";
            return false;
        }

        return true; // Token y rol válidos
    }


    mensajeInicio(userInfo) {
        Swal.fire({
            position: "top-end",
            title: `Bienvenid@ : ${userInfo.usuario}`,
            html: `<img src="/update_granja/img/hola.gif" alt="custom icon" style="width: 100px; height: 100px;">`, // Imagen personalizada
            showConfirmButton: false,
            timer: 1500
        });
    }


    // validarCampos(campos) {
    //     const utilManager = new UtilManager()
    //     for (const campo of campos) {
    //         let valor;

    //         if (campo.isRadio) {
    //             valor = document.querySelector('input[name="txtsexo"]:checked');
    //         } else {
    //             const input = document.getElementById(campo.id);
    //             if (!input) {
    //                 console.warn(`Elemento con id "${campo.id}" no encontrado.`);
    //                 continue;
    //             }
    //             valor = input.value.trim();
    //         }

    //         const valorParaValidar = campo.isRadio ? valor : valor;

    //         if (!campo.validar(valorParaValidar)) {
    //             utilManager.crearAlert(campo.id, campo.alertaId, campo.mensaje);
    //             setTimeout(() => {
    //                 utilManager.ocultarAlert(campo.alertaId);
    //             }, 3000);
    //             return false; // se detiene al primer error
    //         }
    //     }
    //     return true; // todo bien
    // }
    validarCampos(campos) {
        const utilManager = new UtilManager();

        for (const campo of campos) {
            let valor;

            // Personalizado
            if (typeof campo.obtenerValor === 'function') {
                valor = campo.obtenerValor();
            } else {
                const input = document.getElementById(campo.id);
                if (!input) {
                    console.warn(`Elemento con id "${campo.id}" no encontrado.`);
                    continue;
                }
                valor = input.value.trim();
            }

            if (!campo.validar(valor)) {
                utilManager.crearAlert(campo.id, campo.alertaId, campo.mensaje);
                setTimeout(() => {
                    utilManager.ocultarAlert(campo.alertaId);
                }, 3000);
                return false;
            }
        }

        return true;
    }

    togglePass(button, contraseña = null, id_input) {
        const input = document.getElementById(id_input);
        console.log(input)

        if (input) {
            // Modo edición con <input>
            if (input.type === "password") {
                input.type = "text";
                button.classList.remove("bi-eye-fill");
                button.classList.add("bi-eye-slash-fill");
            } else {
                input.type = "password";
                button.classList.remove("bi-eye-slash-fill");
                button.classList.add("bi-eye-fill");
            }
        } else {
            // Modo visualización en <td>
            let celda = button.closest('td');
            if (!celda) {
                console.warn("El botón no está dentro de una celda de tabla (<td>).");
                return;
            }

            if (button.classList.contains('bi-eye-fill')) {
                celda.innerHTML = contraseña +
                    ` <button class="btn bi bi-eye-slash-fill text-success fs-5 border-0" onclick="utilManager.togglePass(this, '${contraseña}')"></button>`;
            } else {
                celda.innerHTML = '•'.repeat(contraseña.length) +
                    ` <button class="btn bi bi-eye-fill text-success fs-5 border-0" onclick="utilManager.togglePass(this, '${contraseña}')"></button>`;
            }
        }
    }

    inhabilitarUsuarios() {
        const utilManager = new UtilManager();
        const checkboxesMarcados = document.querySelectorAll('.check-eliminar:checked');
        const idsSeleccionados = Array.from(checkboxesMarcados).map(cb => cb.value);
        Swal.fire({
            title: `Deseas inhabilitar los usuarios seleccionados? `,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    title: "Hecho!",
                    icon: "success",
                    text: `Usuarios inhabilitados : ${idsSeleccionados.length}`,
                    showConfirmButton: true,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#28a745"
                }).then(() => {
                    utilManager.eliminarChecks()
                });
            }
        });
    };
    habilitarUsuarios() {
        const utilManager = new UtilManager();
        const checkboxesMarcados = document.querySelectorAll('.check-eliminar-ban:checked');
        const idsSeleccionados = Array.from(checkboxesMarcados).map(cb => cb.value);
        Swal.fire({
            title: `Deseas habilitar los usuarios seleccionados? `,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire({
                    title: "Hecho!",
                    icon: "success",
                    text: `Usuarios inhabilitados : ${idsSeleccionados.length}`,
                    showConfirmButton: true,
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#28a745"
                }).then(() => {
                    utilManager.cambiarEstado()
                });
            }
        });
    };




}

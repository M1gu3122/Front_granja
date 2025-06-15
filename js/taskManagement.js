// Gestión de tareas 
import { idUsuarioSelect, UtilManager } from "./utils.js";
let id_tarea= null;
const utilManager = new UtilManager();
const token = localStorage.getItem("token")

const userInfo = utilManager.parseJwt(token);
export class TaskManager {
    


    cargarTareas() {

        const tbodyt = document.querySelector('#taskTable tbody'); // Seleccionar el tbody de la tabla

        axios({
            method: 'GET',
            url: 'https://back-granja.vercel.app/tareas/obtener_tareas',

        }).then(function (response) {
            // console.log(response.data)

            const tabla = $('#taskTable').DataTable(); // Acceder a la tabla DataTable
            tabla.clear(); // Limpiar las filas actuales de DataTables

            response.data.forEach(tarea => {
                tabla.row.add([
                    tarea.id_tareas,
                    tarea.descripcion,
                    tarea.fecha_asignacion,
                    tarea.estado,
                    tarea.nombres,
                    `<a class="btn-editar-tareas bi bi-pencil-square btn btn-warning mx-5" data-bs-toggle="modal" data-bs-target="#modalEditTarea" ></a>`
                ]).draw(false);  // Añadir la fila y redibujar
            });


        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrio un error al cargar las tareas!",

            });
            console.log('Error: ', err)
        })
    }
    cargarTareasTb() {
        const id_usuario = userInfo.id;
        

        axios.get(`https://back-granja.vercel.app/tareas/obtener_tareas_trabajador/${id_usuario}`, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            }
        })
            .then(function (response) {
                const tabla = $('#taskTable').DataTable(); // Acceder a la tabla DataTable

                tabla.clear(); // Limpiar las filas actuales de DataTables

                response.data.forEach(tarea => {
                    let colorClass;

                    if (tarea.estado === "Completado") {
                        colorClass = "table-success";  // Verde para tareas completadas
                    } else if (tarea.estado === "En progreso") {
                        colorClass = "table-warning";  // Amarillo para tareas en progreso
                    } else if (tarea.estado === "Pendiente") {
                        colorClass = "table-danger";   // Rojo para tareas pendientes
                    }

                    const rowNode = tabla.row.add([
                        tarea.id_tareas,
                        tarea.descripcion,
                        tarea.fecha_asignacion,
                        tarea.estado,
                        `<a class="btn-editar-estado btn btn-warning mx-5 bi bi-pencil-square" data-bs-toggle="modal" data-bs-target="#editModal"></a>`
                    ]).draw(false).node(); // Devuelve el nodo de la fila agregada

                    // Cambiar la clase de la celda completa según el estado
                    $(rowNode).find('td').eq(3).addClass(colorClass); // Aplica la clase de color a la cuarta celda (celda del estado)
                });

            })

            .catch(function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ocurrio un error al cargar las tareas",
                });
                console.error('Error:', error);
            });
    }
    editarTareas(button, idUsuarioSeleccionado) {
        // Obtener la fila correspondiente al botón clicado
        const row = button.parentNode.parentNode;
        let fila_id_tareas = row.cells[0].innerText; // Capturar el ID de la tarea
        let id = parseInt(fila_id_tareas)
        let usuario = row.cells[4].innerText; // Capturar el nombre del usuario

        // Hacer la solicitud GET para obtener los detalles de la tarea
        axios.get(`https://back-granja.vercel.app/tareas/obtener_tareas_id/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}` // Si usas autenticación con tokens
            }
        })
            .then(response => {
                // Asumiendo que `response.data` es una lista, tomamos el primer elemento
                const report = response.data;
                console.log(response.data)


                if (report) {
                    // Asignar los valores obtenidos a los campos de un formulario de edición
                    document.getElementById('id-tarea').value = report.id_tareas;  // Usar 'id_tareas' según la estructura de tu tabla
                    let select = document.getElementById('edit-estado').value;
                    select = report.estado;
                    document.getElementById('edit-descripcion').value = report.descripcion;
                    document.getElementById('edit-fecha_asignacion').value = report.fecha_asignacion;
                    document.getElementById('edit-buscar').value = usuario;
                    idUsuarioSeleccionado = report.id_usuario
                    document.getElementById('alert').value = idUsuarioSeleccionado;


                } else {
                    alert('No se encontró la tarea.');
                }
            })
            .catch(err => {
                console.log('Error: ', err);
                alert('Ocurrió un error al obtener los datos del reporte');
            });
    };
    guardarCambiosTareas(idUsuarioSeleccionado) {
        const taskManager = new TaskManager();
        const utilManager = new UtilManager();

        // console.log(idUsuarioSeleccionado)
        const id = parseInt(document.getElementById('id-tarea').value);
        const descripcion = document.getElementById('edit-descripcion').value;
        const fecha_asignacion = document.getElementById('edit-fecha_asignacion').value;
        const estado = document.getElementById('edit-estado').value;
        const id_usuario = document.getElementById('alert').value;

        // console.log(id, descripcion, fecha_asignacion, estado, id_usuario)

        // if (descripcion === "") {
        //     crearAlert('edit-descripcion', 'alert-edit-descripcion', 'Por favor, seleccione una descripción')
        //     setTimeout(() => {
        //         ocultarAlert("alert-edit-descripcion");
        //     }, 3000);
        //     return;


        // }

        // if (fecha_asignacion === "") {
        //     crearAlert('edit-fecha_asignacion', 'alert-edit-fecha_asignacion',
        //         'Por favor, seleccione una fecha de asignación')
        //     setTimeout(() => {
        //         ocultarAlert("alert-edit-fecha_asignacion");
        //     }, 3000);
        //     return;

        // }

        // if (estado === "") {
        //     crearAlert('edit-estado', 'alert-edit-estado',
        //         'Por favor, seleccione un estado')
        //     setTimeout(() => {
        //         ocultarAlert("alert-edit-estado");
        //     }, 3000);
        //     return;

        // }

        // if (!id_usuario) {
        //     crearAlert('id-tarea', 'alert-id-tarea', 'Por favor, seleccione un usuario')
        //     setTimeout(() => {
        //         ocultarAlert("alert-id-tarea");
        //     }, 3000);
        //     return;


        // }
        const campos = [
            {
                id: "edit-descripcion",
                alertaId: "alert-edit-descripcion",
                mensaje: "Por favor, seleccione una descripción",
                validar: valor => valor !== ""
            },
            {
                id: "edit-fecha_asignacion",
                alertaId: "alert-edit-fecha_asignacion",
                mensaje: "Por favor, seleccione una fecha de asignación",
                validar: valor => valor !== ""
            },
            {
                id: "edit-estado",
                alertaId: "alert-edit-estado",
                mensaje: "Por favor, seleccione un estado",
                validar: valor => valor !== ""
            },
            {
                id: "id-tarea",
                alertaId: "alert-id-tarea",
                mensaje: "Por favor, seleccione un usuario",
                validar: valor => valor !== ""
            }
        ];

        if (utilManager.validarCampos(campos)) {

            const data = {

                descripcion: descripcion,
                fecha_asignacion: fecha_asignacion,
                estado: estado,
                id_usuario: id_usuario
            }
            console.log(data)
            axios({
                method: 'PUT',
                url: `https://back-granja.vercel.app/tareas/editar_tarea/${id}`, data,


                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                }
            })
                .then(function (response) {
                    Swal.fire({
                        title: "Tarea actualizada",
                        icon: "success"
                    });
                    // alert(response.data.informacion);

                    taskManager.cargarTareas();
                })
                .catch(err => {
                    Swal.fire({
                        title: "Error",
                        text: "Ocurrio un error al actualizar",
                        icon: "error"
                    });
                    console.log('Error: ', err);

                })
        }
    }

    agregarTareas(event) {
        const taskManager = new TaskManager();
        const utilManager = new UtilManager();
        const formTareas = document.getElementById("form-tareas");


        const descripcion = document.getElementById('descripcion').value.trim();
        const fecha_asignacion = document.getElementById('fecha_asignacion').value.trim();
        const estado = document.getElementById('estado').value;
        const id_usuario = parseInt(idUsuarioSelect);
        console.log(id_usuario)
        // const inptBuscar=document.getElementById("buscar")



        // if (descripcion === "") {
        //     crearAlert('descripcion', 'alert-descripcion', 'Por favor, seleccione una descripción')
        //     setTimeout(() => {
        //         ocultarAlert("alert-descripcion");
        //     }, 3000);
        //     return;

        // }

        // if (fecha_asignacion === "") {
        //     crearAlert('fecha_asignacion', 'alert-fecha_asignacion', 'Por favor seleccione una fecha de asignación')
        //     setTimeout(() => {
        //         ocultarAlert("alert-fecha_asignacion");
        //     }, 3000);
        //     return;

        // }


        // if (!id_usuario) {
        //     crearAlert('buscar', 'alert-id_usuario', 'Por favor seleccione un usuario')
        //     setTimeout(() => {
        //         ocultarAlert("alert-id_usuario");
        //     }, 3000);
        //     return;

        // }
        const campos = [
            {
                id: "descripcion",
                alertaId: "alert-descripcion",
                mensaje: "Por favor, seleccione una descripción",
                validar: valor => valor !== ""
            },
            {
                id: "fecha_asignacion",
                alertaId: "alert-fecha_asignacion",
                mensaje: "Por favor seleccione una fecha de asignación",
                validar: valor => valor !== ""
            },
            {
                id: "buscar",
                alertaId: "alert-id_usuario",
                mensaje: "Por favor seleccione un usuario",
                validar: valor => valor !== ""
            }
        ];
        const data = {
            descripcion: descripcion,
            fecha_asignacion: fecha_asignacion,
            estado: estado,
            id_usuario: id_usuario
        }
        console.log("esta es la data", data)
        if (utilManager.validarCampos(campos)) {


            console.log(typeof (id_usuario))
            axios({
                method: 'POST',
                url: 'https://back-granja.vercel.app/tareas/agregar_tarea', data,
            }
            ).then(function (response) {
                Swal.fire({
                    title: "Tarea Agregada exitosamente!",
                    icon: "success"
                });
                taskManager.cargarTareas()
                formTareas.reset();
            }).catch(err => {
                Swal.fire({
                    title: "Error",
                    text: "Error al agregar tarea",
                    icon: "error"
                });
                console.log('Error: ', err)
            })
        }
    }
        editEstado(button) {
        const row = button.parentNode.parentNode;
        id_tarea = row.cells[0].innerText;
        const estado = row.cells[3].innerText;
        document.querySelector('#edit-estado').value = estado;

    };

    guardarEstado() {
        const taskManager = new TaskManager();
        const estado = document.getElementById('edit-estado').value;

        axios({
            method: 'PUT',
            url: `https://back-granja.vercel.app/tareas/actualizar_estado/${id_tarea}`,
            data: {

                estado: estado,

            },
            // headers: {
            //     'Content-Type': 'application/json',
            //     // 'Authorization': `Bearer ${token}`
            //   }
        })
            .then(function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Exito",
                    text: response.data.informacion + '!'
                });


                taskManager.cargarTareasTb()
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ocurrio un error al cambiar estado!",
                });
                console.log('Error: ', err)
            });
    }
}

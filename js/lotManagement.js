import { UtilManager } from "./utils.js";

// Gestión de lotes 
export class LotManager {
    cargarLote() {
        const tbody = document.querySelector('#tabla-lote tbody'); // Seleccionar el tbody de la tabla

        axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/lotes/obtener_lotes',

        }).then(function (response) {

            const tabla = $('#tabla-lote').DataTable(); // Acceder a la tabla DataTable
            tabla.clear(); // Limpiar las filas actuales de DataTables

            response.data.forEach(lotes => {
                tabla.row.add([
                    lotes.id_lote,
                    lotes.num_aves,
                    lotes.fecha_ingreso,
                    lotes.id_galpon,
                    `<a class="editar-lote bi bi-pencil-square btn btn-warning mx-5 " data-bs-toggle="modal" data-bs-target="#modalEditLote" ></a>`
                ]).draw(false);  // Añadir la fila y redibujar
            });



        }).catch(err => {
            Swal.fire({
                title: "Error",
                text: "Error al cargar lotes",
                icon: "error"
            });
            console.log('Error: ', err)
        })
    }
    agregarLote(event) {
        const lotManagement = new LotManager();
        const utilManager = new UtilManager();
        const formLote = document.getElementById("form-lot");

        event.preventDefault();
        const id_galpon = document.getElementById('id_galpon').value.trim();
        const fecha_ingreso = document.getElementById('fecha_ingreso').value.trim();
        const num_aves_lote = document.getElementById('num_aves_lote').value.trim();

        // Validaciones
        // if (!num_aves_lote) {
        //     crearAlert("num_aves_lote", "alert-aves", "Debe ingresar un número de aves")
        //     setTimeout(() => {
        //         ocultarAlert("alert-aves");
        //     }, 3000);
        //     return;
        // }
        // if (isNaN(num_aves_lote) || num_aves_lote < 0) {
        //     crearAlert("num_aves_lote", "alert-aves", "El número de aves debe contener solo números positivos")
        //     setTimeout(() => {
        //         ocultarAlert("alert-aves");
        //     }, 3000);
        //     return;
        // }
        // if (!fecha_ingreso) {
        //     crearAlert("fecha_ingreso", "f_ingreso", "Debe ingresar una fecha de ingreso")
        //     setTimeout(() => {
        //         ocultarAlert("f_ingreso");
        //     }, 3000);
        //     return;
        // }
        // if (!id_galpon) {
        //     crearAlert("id_galpon", "id_gal", "Debe seleccionar un galpón")
        //     setTimeout(() => {
        //         ocultarAlert("id_gal");
        //     }, 3000);
        //     return;
        // }
        // if (isNaN(id_galpon) || id_galpon < 0) {
        //     crearAlert("id_galpon", "id_gal", "El galpón debe contener solo números positivos")
        //     setTimeout(() => {
        //         ocultarAlert("id_gal");
        //     }, 3000);
        //     return;
        // }

        const campos = [
            {
                id: "num_aves_lote",
                alertaId: "alert-aves",
                mensaje: "Debe ingresar un número de aves",
                validar: valor => valor !== ""
            },
            {
                id: "num_aves_lote",
                alertaId: "alert-aves",
                mensaje: "El número de aves debe contener solo números positivos",
                validar: valor => !isNaN(valor) && Number(valor) > 0
            },
            {
                id: "fecha_ingreso",
                alertaId: "f_ingreso",
                mensaje: "Debe ingresar una fecha de ingreso",
                validar: valor => valor !== ""
            },
            {
                id: "id_galpon",
                alertaId: "id_gal",
                mensaje: "Debe seleccionar un galpón",
                validar: valor => valor !== ""
            },
            {
                id: "id_galpon",
                alertaId: "id_gal",
                mensaje: "El galpón debe contener solo números positivos",
                validar: valor => !isNaN(valor) && Number(valor) > 0
            }
        ];
        if (utilManager.validarCampos(campos)) {

            axios({
                method: 'POST',
                url: 'http://127.0.0.1:3000/lotes/crear_lote',
                data: {
                    id_galpon: id_galpon,
                    fecha_ingreso: fecha_ingreso,
                    num_aves: num_aves_lote
                },
            }
            ).then(function (response) {
                lotManagement.cargarLote()
                Swal.fire({
                    title: "Exito",
                    text: "Lote creado correctamente!",
                    icon: "success"
                });

                formLote.reset();
            }).catch(err => {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrio un error al agregar el lote",
                    icon: "error"
                });
                console.log('Error: ', err)
            })
        }
    }
    editarLote(button) {
        const utilManager = new UtilManager();
        const row = button.parentNode.parentNode;
        const id_lote = row.cells[0].innerText;
        const num_aves_lote = row.cells[1].innerText;
        const fecha_ingreso = row.cells[2].innerText;
        const id_galpon = row.cells[3].innerText;

        document.getElementById('edit-id_lote').value = id_lote;
        document.getElementById('edit-num_aves_lote').value = num_aves_lote;
        document.getElementById('edit-fecha_ingreso').value = fecha_ingreso;
        document.getElementById('edit-id_galpon').value = id_galpon;

        const camposEditar = [
            {
                id: "edit-num_aves_lote",
                alertaId: "alert-edit-aves",
                mensaje: "Debe ingresar un número de aves",
                validar: valor => valor !== ""
            },
            {
                id: "edit-num_aves_lote",
                alertaId: "alert-edit-aves",
                mensaje: "El número de aves debe contener solo números positivos",
                validar: valor => !isNaN(valor) && Number(valor) > 0
            },
            {
                id: "edit-fecha_ingreso",
                alertaId: "alert-edit-fecha",
                mensaje: "Debe ingresar una fecha de ingreso",
                validar: valor => valor !== ""
            },
            {
                id: "edit-id_galpon",
                alertaId: "alert-edit-galpon",
                mensaje: "Debe seleccionar un galpón",
                validar: valor => valor !== ""
            },
            {
                id: "edit-id_galpon",
                alertaId: "alert-edit-galpon",
                mensaje: "El galpón debe contener solo números positivos",
                validar: valor => !isNaN(valor) && Number(valor) > 0
            }
        ];
        utilManager.validarCampos(camposEditar);
    }
    guardarCambiosLote() {
        const lotManager = new LotManager()
        const utilManager = new UtilManager();
        const id_lote = document.getElementById("edit-id_lote").value;
        const num_aves_lote = document.getElementById('edit-num_aves_lote').value;
        const fecha_ingreso = document.getElementById('edit-fecha_ingreso').value;
        const id_galpon = document.getElementById('edit-id_galpon').value;
        // Validaciones
        // if (!num_aves_lote) {
        //     crearAlert("edit-num_aves_lote", "alert-aves", "Debe ingresar un número de aves")
        //     setTimeout(() => {
        //         ocultarAlert("alert-aves");
        //     }, 3000);
        //     return;
        // }
        // if (isNaN(num_aves_lote) || num_aves_lote < 0) {
        //     crearAlert("edit-num_aves_lote", "alert-aves", "El número de aves debe contener solo números positivos")
        //     setTimeout(() => {
        //         ocultarAlert("alert-aves");
        //     }, 3000);
        //     return;
        // }
        // if (!fecha_ingreso) {
        //     crearAlert("edit-fecha_ingreso", "f_ingreso", "Debe ingresar una fecha de ingreso")
        //     setTimeout(() => {
        //         ocultarAlert("f_ingreso");
        //     }, 3000);
        //     return;
        // }
        // if (!id_galpon) {
        //     crearAlert("edit-id_galpon", "id_gal", "Debe seleccionar un galpón")
        //     setTimeout(() => {
        //         ocultarAlert("id_gal");
        //     }, 3000);
        //     return;
        // }
        // if (isNaN(id_galpon) || id_galpon < 0) {
        //     crearAlert("edit-id_galpon", "id_gal", "El galpón debe contener solo números positivos")
        //     setTimeout(() => {
        //         ocultarAlert("id_gal");
        //     }, 3000);
        //     return;
        // }
        const camposEditar = [
            {
                id: "edit-num_aves_lote",
                alertaId: "alert-aves",
                mensaje: "Debe ingresar un número de aves",
                validar: valor => valor !== ""
            },
            {
                id: "edit-num_aves_lote",
                alertaId: "alert-aves",
                mensaje: "El número de aves debe contener solo números positivos",
                validar: valor => !isNaN(valor) && Number(valor) > 0
            },
            {
                id: "edit-fecha_ingreso",
                alertaId: "f_ingreso",
                mensaje: "Debe ingresar una fecha de ingreso",
                validar: valor => valor !== ""
            },
            {
                id: "edit-id_galpon",
                alertaId: "id_gal",
                mensaje: "Debe seleccionar un galpón",
                validar: valor => valor !== ""
            },
            {
                id: "edit-id_galpon",
                alertaId: "id_gal",
                mensaje: "El galpón debe contener solo números positivos",
                validar: valor => !isNaN(valor) && Number(valor) > 0
            }
        ];
        if (utilManager.validarCampos(camposEditar)) {

            // Si todas las validaciones pasan, se procede a actualizar el lote
            axios({
                method: 'PUT',
                url: `http://127.0.0.1:3000/lotes/actualizar_lote/${id_lote}`,
                data: {
                    num_aves: num_aves_lote,
                    fecha_ingreso: fecha_ingreso,
                    id_galpon: id_galpon
                },
                // headers: {
                //     'Content-Type': 'application/json',
                //     // 'Authorization': `Bearer ${token}`
                //   }
            })
                .then(function (response) {
                    lotManager.cargarLote()
                    Swal.fire({
                        title: "Exito",
                        text: response.data.informacion + "!",
                        icon: "success"
                    });

                })
                .catch(err => {
                    Swal.fire({
                        title: "Error",
                        text: "Ocurrio un error al actualizar",
                        icon: "error"
                    });
                    console.log('Error: ', err)
                });
        }
    }
}

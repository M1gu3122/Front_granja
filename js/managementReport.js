export let idUsuarioSeleccionado = null;
import { idUsuarioSelect } from "./utils.js";
import { UtilManager } from "./utils.js";
const formReporte = document.getElementById("form-reportes");
export class ReportManagement {
    agregarReporte = (event) => {
        event.preventDefault();
        const managementReport = new ReportManagement();
        const utilManager = new UtilManager();
        const id_usuario = null;
        const fecha_registro = document.getElementById('fecha-registro').value.trim();
        const id_lote = document.getElementById('id-lote').value.trim();
        const estado_general = document.getElementById('estado-general').value.trim();
        const diagnostico = document.getElementById('diagnostico').value.trim();
        const tratamiento_prescrito = document.getElementById('t-prescrito').value.trim();
        const dosis = document.getElementById('dosis').value.trim();
        const frecuencia = document.getElementById('frecuencia-tratamiento').value.trim();
        const fecha_inicio_tratamiento = document.getElementById('fecha-inicio-tratamiento').value.trim();
        const fecha_fin_tratamiento = document.getElementById('fecha-fin-tratamiento').value.trim();

        const validarCampos = [
            {
                id: "buscar",
                alertaId: "alert",
                mensaje: "Debes seleccionar un usuario",
                validar: valor => valor !== ""
            },
            {
                id: "fecha-registro",
                alertaId: "alert-fecha-registro",
                mensaje: "Debe completar la fecha de registro.",
                validar: valor => valor !== ""
            },
            {
                id: "id-lote",
                alertaId: "alert-id-lote",
                mensaje: "Debe completar el id del lote.",
                validar: valor => valor !== ""
            },
            {
                id: "estado-general",
                alertaId: "alert-estado-general",
                mensaje: "Debe completar el estado general.",
                validar: valor => valor !== ""
            },
            {
                id: "diagnostico",
                alertaId: "alert-diagnostico",
                mensaje: "Debe completar el diagnostico.",
                validar: valor => valor !== ""
            },
            {
                id: "t-prescrito",
                alertaId: "alert-t-prescrito",
                mensaje: "Debe completar el tratamiento prescrito.",
                validar: valor => valor !== ""
            },
            {
                id: "dosis",
                alertaId: "alert-dosis",
                mensaje: "Debe completar la dosis.",
                validar: valor => valor !== ""
            },
            {
                id: "frecuencia-tratamiento",
                alertaId: "alert-frecuencia",
                mensaje: "Debe completar la frecuencia.",
                validar: valor => valor !== ""
            },
            {
                id: "fecha-inicio-tratamiento",
                alertaId: "alert-fecha-inicio",
                mensaje: "Debe completar la fecha de inicio del tratamiento.",
                validar: valor => valor !== ""
            },
            {
                id: "fecha-fin-tratamiento",
                alertaId: "alert-fecha-fin",
                mensaje: "Debe completar la fecha de fin del tratamiento.",
                validar: valor => valor !== ""
            },
            {
                id: "id-lote",
                alertaId: "alert-id-lote",
                mensaje: "ID de lote inválido. No se permiten letras ni caracteres especiales.",
                validar: valor => /^[^a-zA-Z]*$/.test(valor)
            },
            {
                id: "estado-general",
                alertaId: "alert-estado-general",
                mensaje: "Estado general inválido. No se permiten caracteres especiales.",
                validar: valor => /^[^!@#$%^&*()_+={}\[\]:;\"'<>,.?\/\\|`~]*$/.test(valor)
            },
            {
                id: "diagnostico",
                alertaId: "alert-diagnostico",
                mensaje: "Diagnóstico inválido. No se permiten caracteres especiales.",
                validar: valor => /^[^!@#$%^&*()_+={}\[\]:;\"'<>,.?\/\\|`~]*$/.test(valor)
            },
            {
                id: "t-prescrito",
                alertaId: "alert-tratamiento-prescrito",
                mensaje: "Tratamiento prescrito inválido. No se permiten caracteres especiales.",
                validar: valor => /^[^!@#$%^&*()_+={}\[\]:;\"'<>,.?\/\\|`~]*$/.test(valor)
            },
            {
                id: "dosis",
                alertaId: "alert-dosis",
                mensaje: "No se permiten caracteres especiales.",
                validar: valor => /^[^!@#$%^&*()_+={}\[\]:;\"'<>,.?\/\\|`~]*$/.test(valor)
            },
            {
                id: "frecuencia-tratamiento",
                alertaId: "alert-frecuencia",
                mensaje: "Frecuencia inválida. No se permiten caracteres especiales.",
                validar: valor => /^[^!@#$%^&*()_+={}\[\]:;\"'<>,.?\/\\|`~]*$/.test(valor)
            }
        ]

        if (utilManager.validarCampos(validarCampos)) {
            let data = {
                id_usuario: idUsuarioSelect,
                fecha_registro: fecha_registro,
                id_lote: id_lote,
                estado_general: estado_general,
                diagnostico: diagnostico,
                tratamiento_prescrito: tratamiento_prescrito,
                dosis: dosis,
                frecuencia_tratamiento: frecuencia,
                fecha_inicio_tratamiento: fecha_inicio_tratamiento,
                fecha_fin_tratamiento: fecha_fin_tratamiento
            }
            axios({
                method: 'POST',
                url: 'http://127.0.0.1:3000/reportes/crear_reporte',
                data,
            }).then(function (response) {
                Swal.fire({
                    title: "Reporte creado con éxito!",
                    icon: "success"
                });
                formReporte.reset()
                managementReport.cargarReportes();
            }).catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ocurrio un error al crear reporte!",
                });
                console.log('Error: ', err)

            })
        }

    }
    cargarReportes = () => {

        axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/reportes/obtener_reportes',
        }).then(function (response) {
            // Check if the DataTable is already initialized
            let tabla;
            if ($.fn.dataTable.isDataTable('#tabla-reportes')) {
                tabla = $('#tabla-reportes').DataTable();
                tabla.clear(); // Clear existing data
            } else {
                // Initialize DataTable if not already initialized
                tabla = $('#tabla-reportes').DataTable({
                    // Your DataTable options here
                    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
                    columnDefs: [
                        { className: "centered", targets: [0, 1, 2, 3, 4] },
                        { orderable: false, targets: [4] },
                        { searchable: false, targets: [1] }
                    ],
                    pageLength: 10,
                    language: {
                        lengthMenu: "Mostrar _MENU_ registros por página",
                        zeroRecords: "Ningún usuario encontrado",
                        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
                        infoEmpty: "Ningún usuario encontrado",
                        infoFiltered: "(filtrados desde _MAX_ registros totales)",
                        search: "Buscar:",
                        loadingRecords: "Cargando...",
                        paginate: {
                            first: "Primero",
                            last: "Último",
                            next: "Siguiente",
                            previous: "Anterior"
                        }
                    }
                });
            }



            // Recorre el array de datos
            response.data.forEach(item => {


                // Agrega los datos a la tabla
                tabla.row.add([
                    item.id_reporte,  // primer elemento
                    item.id_lote,     // segundo elemento
                    item.fecha_registro,    // fecha formateada
                    item.nombres,      // cuarto elemento
                    `<a class="btn-edit-report bi bi-pencil-square btn btn-warning mx-5" data-bs-toggle="modal" data-bs-target="#editModal" onclick="editReportes(this,'editar')"></a>`,
                    `<a class="bi bi-eye-fill  btn btn-primary mx-5"  data-bs-toggle="modal" data-bs-target="#ModalVista" onclick="editReportes(this,'ver')"></a>`,

                ]).draw(); // Agregar la fila y actualizar la tabla
            });


        }).catch(err => console.log('Error: ', err));
    }

    editReportes = (button,inputsEdit=[]) => {

        const reportManagement = new ReportManagement();
        const row = button.parentNode.parentNode;
        const id = row.cells[0].innerText;
        const nombre = row.cells[3].innerText;
        idUsuarioSeleccionado = id;

        // Llamada a Axios para obtener el reporte
        axios.get(`http://127.0.0.1:3000/reportes/obtener_reporte/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const report = response.data;

                // Asignar los valores del reporte a los campos del formulario
                document.getElementById(inputsEdit[0]).value = report.id_reporte;
                document.getElementById(inputsEdit[1]).value = nombre;
                document.getElementById(inputsEdit[2]).value = report.fecha_registro;
                document.getElementById(inputsEdit[3]).value = report.id_lote;
                document.getElementById(inputsEdit[4]).value = report.estado_general;
                document.getElementById(inputsEdit[5]).value = report.diagnostico;
                document.getElementById(inputsEdit[6]).value = report.tratamiento_prescrito;
                document.getElementById(inputsEdit[7]).value = report.dosis;
                document.getElementById(inputsEdit[8]).value = report.frecuencia_tratamiento;
                document.getElementById(inputsEdit[9]).value = report.fecha_inicio_tratamiento;
                document.getElementById(inputsEdit[10]).value = report.fecha_fin_tratamiento;



                // Cargar reportes después de obtener los datos
                reportManagement.cargarReportes();
            })
            .catch(err => {
                console.log('Error: ', err);
                alert('Ocurrió un error al obtener los datos del reporte');
            });
    }

    guardarCambiosReportes = () => {
        const utilManager = new UtilManager();
        console.log(idUsuarioSeleccionado)
        const reportManagement = new ReportManagement();
        const id_reporte = document.getElementById('edit-id-reporte').value;
        const id_usuario = idUsuarioSelect;
        const fecha_registro = document.getElementById('edit-fecha-registro').value;
        const id_lote = document.getElementById('edit-id-lote').value;
        const estado_general = document.getElementById('edit-estado-general').value;
        const diagnostico = document.getElementById('edit-diagnostico').value;
        const tratamiento_prescrito = document.getElementById('edit-t-prescrito').value;
        const dosis = document.getElementById('edit-dosis').value;
        const frecuencia_tratamiento = document.getElementById('edit-frecuencia-tratamiento').value;
        const fecha_inicio_tratamiento = document.getElementById('edit-fecha-inicio-tratamiento').value;
        const fecha_fin_tratamiento = document.getElementById('edit-fecha-fin-tratamiento').value;
        const validarCampos = [
            {
                id: "edit-buscar",
                alertaId: "alert",
                mensaje: "Debes seleccionar un usuario",
                validar: valor => valor !== ""
            },
            {
                id: "edit-fecha-registro",
                alertaId: "alert-fecha-registro",
                mensaje: "Debe completar la fecha de registro.",
                validar: valor => valor !== ""
            },
            {
                id: "edit-id-lote",
                alertaId: "alert-id-lote",
                mensaje: "Debe completar el id del lote.",
                validar: valor => valor !== ""
            },
            {
                id: "edit-estado-general",
                alertaId: "alert-estado-general",
                mensaje: "Debe completar el estado general.",
                validar: valor => valor !== ""
            },
            {
                id: "edit-diagnostico",
                alertaId: "alert-diagnostico",
                mensaje: "Debe completar el diagnostico.",
                validar: valor => valor !== ""
            },
            {
                id: "edit-t-prescrito",
                alertaId: "alert-t-prescrito",
                mensaje: "Debe completar el tratamiento prescrito.",
                validar: valor => valor !== ""
            },
            {
                id: "edit-dosis",
                alertaId: "alert-dosis",
                mensaje: "Debe completar la dosis.",
                validar: valor => valor !== ""
            },
            {
                id: "edit-frecuencia-tratamiento",
                alertaId: "alert-frecuencia",
                mensaje: "Debe completar la frecuencia.",
                validar: valor => valor !== ""
            },
            {
                id: "edit-fecha-inicio-tratamiento",
                alertaId: "alert-fecha-inicio",
                mensaje: "Debe completar la fecha de inicio del tratamiento.",
                validar: valor => valor !== ""
            },
            {
                id: "edit-fecha-fin-tratamiento",
                alertaId: "alert-fecha-fin",
                mensaje: "Debe completar la fecha de fin del tratamiento.",
                validar: valor => valor !== ""
            },
            {
                id: "edit-id-lote",
                alertaId: "alert-id-lote",
                mensaje: "ID de lote inválido. No se permiten letras ni caracteres especiales.",
                validar: valor => /^[^a-zA-Z]*$/.test(valor)
            },
            {
                id: "edit-estado-general",
                alertaId: "alert-estado-general",
                mensaje: "Estado general inválido. No se permiten caracteres especiales.",
                validar: valor => /^[^!@#$%^&*()_+={}\[\]:;\"'<>,.?\/\\|`~]*$/.test(valor)
            },
            {
                id: "edit-diagnostico",
                alertaId: "alert-diagnostico",
                mensaje: "Diagnóstico inválido. No se permiten caracteres especiales.",
                validar: valor => /^[^!@#$%^&*()_+={}\[\]:;\"'<>,.?\/\\|`~]*$/.test(valor)
            },
            {
                id: "edit-t-prescrito",
                alertaId: "alert-tratamiento-prescrito",
                mensaje: "Tratamiento prescrito inválido. No se permiten caracteres especiales.",
                validar: valor => /^[^!@#$%^&*()_+={}\[\]:;\"'<>,.?\/\\|`~]*$/.test(valor)
            },
            {
                id: "edit-dosis",
                alertaId: "alert-dosis",
                mensaje: "No se permiten caracteres especiales.",
                validar: valor => /^[^!@#$%^&*()_+={}\[\]:;\"'<>,.?\/\\|`~]*$/.test(valor)
            },
            {
                id: "edit-frecuencia-tratamiento",
                alertaId: "alert-frecuencia",
                mensaje: "Frecuencia inválida. No se permiten caracteres especiales.",
                validar: valor => /^[^!@#$%^&*()_+={}\[\]:;\"'<>,.?\/\\|`~]*$/.test(valor)
            }
        ]
        if (utilManager.validarCampos(validarCampos)) {

            let data = {
                id_usuario: id_usuario,
                fecha_registro: fecha_registro,
                id_lote: id_lote,
                estado_general: estado_general,
                diagnostico: diagnostico,
                tratamiento_prescrito: tratamiento_prescrito,
                dosis: dosis,
                frecuencia_tratamiento: frecuencia_tratamiento,
                fecha_inicio_tratamiento: fecha_inicio_tratamiento,
                fecha_fin_tratamiento: fecha_fin_tratamiento
            }
            console.log(data)
            axios({
                method: 'PUT',
                url: `http://127.0.0.1:3000/reportes/editar_reporte/${id_reporte}`,
                data,
                // headers: {
                //     'Content-Type': 'application/json',
                //     // 'Authorization': `Bearer ${token}`
                //   }
            })
                .then(function (response) {
                    Swal.fire({
                        title: "Reporte actualizado correctamente!",
                        icon: "success"
                    });

                    reportManagement.cargarReportes()
                })
                .catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Ocurrio un error al actualizar!",
                    });
                    console.log('Error: ', err)
                })
        }
    }
    ModalVer() {



    }
}



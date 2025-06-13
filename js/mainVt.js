import { ReportManagement } from "./managementReport.js"
import { idUsuarioSeleccionado, UtilManager } from "./utils.js"
const reportManagement = new ReportManagement();
const utilManager = new UtilManager();
const btnGuardarCambios = document.getElementById("btn-guardar-cambios")
const btnBuscar = document.getElementById('btn-buscar');
const btnEditBuscar = document.getElementById('btn-edit-buscar');
const inputBuscar = document.getElementById('buscar');
const inputEditBuscar = document.getElementById('edit-buscar');
const divTablaBuscar = document.getElementById('div-buscar');
const divTablaEditBuscar = document.getElementById('editDivBuscar');
const formReporte = document.getElementById("form-reportes");
const btnCerrarSesion = document.getElementById('salir');
const inputs = ['edit-id-reporte', 'edit-buscar', 'edit-fecha-registro', 'edit-id-lote', 'edit-estado-general', 'edit-diagnostico', 'edit-t-prescrito', 'edit-dosis', 'edit-frecuencia-tratamiento', 'edit-fecha-inicio-tratamiento', 'edit-fecha-fin-tratamiento']

const inputsVista = ['ver-id-reporte', 'ver-usuario', 'ver-fecha-registro', 'ver-id-lote', 'ver-estado-general', 'ver-diagnostico', 'ver-t-prescrito', 'ver-dosis', 'ver-frecuencia-tratamiento', 'ver-fecha-inicio-tratamiento', 'ver-fecha-fin-tratamiento']
window.editReportes = (button, modo) => {
    if (modo === 'ver') {
        reportManagement.editReportes(button, inputsVista);
    } else if (modo === 'editar') {
        reportManagement.editReportes(button, inputs);
    }
};



btnGuardarCambios.addEventListener("click", () => reportManagement.guardarCambiosReportes())
btnCerrarSesion.addEventListener('click', utilManager.cerrar)
btnBuscar.addEventListener("click", () => utilManager.buscarUsuario(inputBuscar, "spinner", divTablaBuscar, "tabla-buscar", "3"));
btnEditBuscar.addEventListener('click', () => utilManager.buscarUsuario(inputEditBuscar, "spinner-edit", divTablaEditBuscar, "tabla-edit-buscar", "3"))
formReporte.addEventListener("submit", (event) => {
    event.preventDefault();
    reportManagement.agregarReporte(event);
});

document.addEventListener('DOMContentLoaded', function () {
    reportManagement.cargarReportes();


})
// document.addEventListener('click', function (event) {
//     // Usamos una función anónima para asegurarnos de que se pase el botón correcto
//     const btn = event.target.closest('.btn-edit-report');
//     if (btn) {
//         // Llamamos a editarUsuarios con el botón correcto
//         reportManagement.editReportes(btn );
//     }
// });

$(document).ready(function () {
    let tabla;

    $.ajax({
        url: 'http://127.0.0.1:3000/reportes/obtener_todos_los_reportes',
        method: 'GET',
        success: function (data) {
            console.log("Datos obtenidos:", data);
            const tbody = $('#tablaExportacion tbody');
            tbody.empty(); // Limpia la tabla por si ya tenía datos

            data.forEach(function (item) {
                tbody.append(`
                    <tr>
                        <td>${item.id_reporte}</td>
                        <td>${item.fecha_registro}</td>
                        <td>${item.id_lote}</td>
                        <td>${item.estado_general}</td>
                        <td>${item.diagnostico}</td>
                        <td>${item.tratamiento_prescrito}</td>
                        <td>${item.dosis}</td>
                        <td>${item.frecuencia_tratamiento}</td>
                        <td>${item.fecha_inicio_tratamiento}</td>
                        <td>${item.fecha_fin_tratamiento}</td>
                    </tr>
                `);
            });

            tabla = $('#tablaExportacion').DataTable({
                dom: 't',
                buttons: [

                    { extend: 'copy', className: 'btnExport btn-export' },
                    { extend: 'csv', className: 'btnExport btn-export' },
                    { extend: 'excel', className: 'btnExport btn-export' },
                    { extend: 'pdf', className: 'btnExport btn-export' },
                    { extend: 'print', className: 'btnExport btn-export' }
                ],
                language: {
                    // url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
                }
            });

            // Si quieres hacer la exportación automática a Excel por ejemplo:
            // tabla.button('.buttons-excel').trigger();
        },
        error: function (xhr, status, error) {
            console.error("Error al cargar los datos:", error);
        }
    });
    $('#btnCopiar').on('click', function () {
        tabla.button('.buttons-copy').trigger();
    });

    $('#btnCSV').on('click', function () {
        tabla.button('.buttons-csv').trigger();
    });

    $('#btnExcel').on('click', function () {
        tabla.button('.buttons-excel').trigger();
    });

    $('#btnPDF').on('click', function () {
        tabla.button('.buttons-pdf').trigger();
    });

    $('#btnImprimir').on('click', function () {
        tabla.button('.buttons-print').trigger();
    });
});



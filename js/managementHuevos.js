import { UtilManager } from "./utils.js";
export class ManagementTb {

    // Huevos
    registroHuevos(event) {
        event.preventDefault();
        const managementTb = new ManagementTb();
        const utilManager = new UtilManager();
        const form_huevos = document.getElementById("form-huevos");

        const cantidad = document.getElementById('cantidad_huevos').value.trim();
        const fecha = document.getElementById('fecha_ingreso').value.trim();
        const idLote = document.getElementById('id_lote').value.trim();
        const camposValidacion = [
            {
                id: "cantidad_huevos",
                alertaId: "cant",
                mensaje: "Debe ingresar una cantidad de huevos",
                validar: valor => valor.trim() !== ""
            },
            {
                id: "cantidad_huevos",
                alertaId: "cant",
                mensaje: "Ingrese una cantidad válida",
                validar: valor => !isNaN(valor) && parseFloat(valor) >= 0
            },
            {
                id: "fecha_ingreso",
                alertaId: "Fecha",
                mensaje: "Debe ingresar una fecha de ingreso",
                validar: valor => valor.trim() !== ""
            },
            {
                id: "id_lote",
                alertaId: "id_lotes",
                mensaje: "Debe seleccionar un lote",
                validar: valor => valor.trim() !== ""
            },
            {
                id: "id_lote",
                alertaId: "id_lotes",
                mensaje: "Ingrese un id válido",
                validar: valor => !isNaN(valor) && parseInt(valor) >= 0
            }
        ];
        if (utilManager.validarCampos(camposValidacion)) {

            axios({
                method: 'POST',
                url: 'https://back-granja.vercel.app/huevos/agregar_huevos',
                data: {
                    cantidad: cantidad,
                    fecha: fecha,
                    id_lote: idLote
                },
            }
            ).then(function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Exito",
                    text: "Registro exitoso!",
                });
                managementTb.cargarHuevos()
                form_huevos.reset();
            }).catch(err => {
                console.log('Error: ', err)
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ocurrio un error al registrar!",
                });
            })
        }
    }
    cargarHuevos() {
        // const token = localStorage.getItem('token');
        axios.get('https://back-granja.vercel.app/huevos/obtener_huevos', {
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`
            }
        })
            .then(function (response) {
                const tabla = $('#tabla-huevos').DataTable(); // Acceder a la tabla DataTable
                tabla.clear(); // Limpiar las filas actuales de DataTables

                response.data.forEach(huevos => {
                    tabla.row.add([
                        huevos.id_recoleccion,
                        huevos.cantidad,
                        huevos.fecha,
                        huevos.id_lote,
                    ]).draw(false); 
                });



            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    }

}

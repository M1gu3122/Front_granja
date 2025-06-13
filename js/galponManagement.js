// Gestión de galpones 
import { UtilManager } from "./utils.js";
export class GalponManager {
    agregarGalpon(event) {
        const galponManager = new GalponManager()
        const utilManager = new UtilManager();
        event.preventDefault();
        const capacidad = document.getElementById('capacidadgal').value;
        const numAves = document.getElementById('numaves').value;
        const formGalpon = document.getElementById("form-addgalpon");


        // if (!capacidad) {
        //     crearAlert("capacidadgal", "capacidad_g", "Debe ingresar la capacida del galpon")
        //     setTimeout(() => {
        //         ocultarAlert("capacidad_g");
        //     }, 3000);
        //     return;
        // }
        // if (isNaN(capacidad) || capacidad < 0) {
        //     crearAlert("capacidadgal", "capacidad_g", "Este campo debe contener solo números positivos")
        //     setTimeout(() => {
        //         ocultarAlert("capacidad_g");
        //     }, 3000);
        //     return;
        // }
        // if (!numAves) {
        //     crearAlert("numaves", "numAves", "Debe ingresar el numero de aves del galpón")
        //     setTimeout(() => {
        //         ocultarAlert("numAves");
        //     }, 3000);
        //     return;
        // }
        // if (isNaN(numAves) || numAves < 0) {
        //     crearAlert("numaves", "numAves", "Este campo debe contener solo números positivos")
        //     setTimeout(() => {
        //         ocultarAlert("numAves");
        //     }, 3000);
        //     return;
        // }
        const camposGalpon = [
            {
                id: "capacidadgal",
                alertaId: "capacidad_g",
                mensaje: "Debe ingresar la capacidad del galpón",
                validar: valor => valor !== ""
            },
            {
                id: "capacidadgal",
                alertaId: "capacidad_g",
                mensaje: "Este campo debe contener solo números positivos",
                validar: valor => !isNaN(valor) && Number(valor) > 0
            },
            {
                id: "numaves",
                alertaId: "numAves",
                mensaje: "Debe ingresar el número de aves del galpón",
                validar: valor => valor !== ""
            },
            {
                id: "numaves",
                alertaId: "numAves",
                mensaje: "Este campo debe contener solo números positivos",
                validar: valor => !isNaN(valor) && Number(valor) > 0
            }
        ];
        if (utilManager.validarCampos(camposGalpon)) {



            axios({
                method: 'POST',
                url: 'http://127.0.0.1:3000/galpones/crear_galpon',
                data: {
                    capacidad: capacidad,
                    aves: numAves
                },
            }
            ).then(function (response) {
                galponManager.cargarGalpones()
                Swal.fire({
                    title: "Exito",
                    text: "Galpon creado correctamente!",
                    icon: "success"
                });
                formGalpon.reset();
            }).catch(err => {
                Swal.fire({
                    title: "Error",
                    text: "Ocurrio un error al agregar el galpón",
                    icon: "error"
                });
                console.log('Error: ', err)
            })
        }
    }
    cargarGalpones() {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/galpones/obtener_galpones',

        }).then(function (response) {

            const tabla = $('#tabla-galpones').DataTable(); // Acceder a la tabla DataTable
            tabla.clear(); // Limpiar las filas actuales de DataTables

            response.data.forEach(galpon => {
                tabla.row.add([
                    galpon.id_galpon,
                    galpon.capacidad,
                    galpon.aves,
                    `<a class="editar-galpon bi bi-pencil-square btn btn-warning mx-5 " data-bs-toggle="modal" data-bs-target="#modalEditGalpon" ></a>`
                ]).draw(false);  // Añadir la fila y redibujar
            });
        }).catch(err => console.log('Error: ', err))
    }
    editarGalpon(button) {
        const row = button.parentNode.parentNode;
        const id_galpon = row.cells[0].innerText;
        const capacidad = row.cells[1].innerText;
        const num_aves = row.cells[2].innerText;

        document.getElementById('edit-idgalpon').value = id_galpon;
        document.getElementById('edit-capacidad').value = capacidad;
        document.getElementById('edit-num_aves').value = num_aves;

    }
    guardarCambiosGalpon() {
        const galponManager = new GalponManager()
        const utilManager = new UtilManager();
        const id_galpon = document.getElementById('edit-idgalpon').value;
        const capacidad = document.getElementById('edit-capacidad').value;
        const num_aves = document.getElementById('edit-num_aves').value;

        // if (!capacidad) {
        //     crearAlert("edit-capacidad", "capacidad", "Debe ingresar la capacidad del galpón")
        //     setTimeout(() => {
        //         ocultarAlert("capacidad");
        //     }, 3000);

        //     return;
        // }
        // if (isNaN(capacidad) || capacidad < 0) {
        //     crearAlert("edit-capacidad", "capacidad", "solo se admiten números positivos")
        //     setTimeout(() => {
        //         ocultarAlert("capacidad");
        //     }, 3000);

        //     return;
        // }
        // if (!num_aves) {
        //     crearAlert("edit-num_aves", "num_aves", "Debe ingresar el numero de aves del galpón")
        //     setTimeout(() => {
        //         ocultarAlert("num_aves");
        //     }, 3000);
        //     return;
        // }
        // if (isNaN(num_aves) || num_aves < 0) {
        //     crearAlert("edit-num_aves", "num_aves", "solo se admiten números positivos")
        //     setTimeout(() => {
        //         ocultarAlert("num_aves");
        //     }, 3000);
        //     return;
        // }
        const camposEditarGalpon = [
            {
                id: "edit-capacidad",
                alertaId: "capacidad",
                mensaje: "Debe ingresar la capacidad del galpón",
                validar: valor => valor !== ""
            },
            {
                id: "edit-capacidad",
                alertaId: "capacidad",
                mensaje: "Solo se admiten números positivos",
                validar: valor => !isNaN(valor) && Number(valor) > 0
            },
            {
                id: "edit-num_aves",
                alertaId: "num_aves",
                mensaje: "Debe ingresar el número de aves del galpón",
                validar: valor => valor !== ""
            },
            {
                id: "edit-num_aves",
                alertaId: "num_aves",
                mensaje: "Solo se admiten números positivos",
                validar: valor => !isNaN(valor) && Number(valor) > 0
            }
        ];
        if (utilManager.validarCampos(camposEditarGalpon)) {
            
        
        axios({
            method: 'PUT',
            url: `http://127.0.0.1:3000/galpones/actualizar_galpon/${id_galpon}`,
            data: {
                capacidad: capacidad,
                aves: num_aves
            },
            // headers: {
            //     'Content-Type': 'application/json',
            //     // 'Authorization': `Bearer ${token}`
            //   }
        })
            .then(function (response) {
                Swal.fire({
                    title: "Exito",
                    text: "Galpon actualizado correctamente",
                    icon: "success"
                });
                galponManager.cargarGalpones();
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
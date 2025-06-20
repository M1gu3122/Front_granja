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
                url: 'https://back-granja.vercel.app/galpones/crear_galpon',
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
            url: 'https://back-granja.vercel.app/galpones/obtener_galpones',

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
            url: `https://back-granja.vercel.app/galpones/actualizar_galpon/${id_galpon}`,
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

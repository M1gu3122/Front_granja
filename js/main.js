// Esto debe ser lo primero del archivo
const token = localStorage.getItem("token");
const rol = localStorage.getItem("rol");



import { UserManager } from './userManagement.js';
import { TaskManager } from './taskManagement.js';
import { LotManager } from './lotManagement.js';
import { GalponManager } from './galponManagement.js';
import { UtilManager } from './utils.js'
import { idUsuarioSeleccionado } from './utils.js';
import { inicializarGraficos } from './chart.js'
console.log(idUsuarioSeleccionado)
window.userManager = new UserManager();
const userManager = new UserManager();
const taskManager = new TaskManager();
const lotManager = new LotManager();
const galponManager = new GalponManager();
const utilManager = new UtilManager();


const userInfo = utilManager.parseJwt(token);





const initEventListeners = () => {
    const btnCerrarSesion = document.getElementById('salir');
    const btnEye = document.getElementById('button-addon2');
    const btnEye2 = document.getElementById('btnEye');
    const checkAll = document.getElementById('checkAll');
    const checkAllBan = document.getElementById('checkAll-ban');
    const btnEliminar = document.getElementById('btn-eliminar');
    const btnCambiarEstado = document.getElementById('cambiar-estado-ban');
    const seleccionados = document.getElementById('eliminarSeleccionados');

    checkAll.addEventListener('change', () => utilManager.selectAllChecks(".check-eliminar", checkAll))
    checkAllBan.addEventListener('change', () => utilManager.selectAllChecks(".check-eliminar-ban", checkAllBan))

    seleccionados.addEventListener('click', function () {
        utilManager.toggleEliminar(this);
    });


    // Obtenemos el botón que debe tener el id 'eliminarSeleccionados'
    btnEliminar.addEventListener('click', utilManager.inhabilitarUsuarios)
    btnCambiarEstado.addEventListener('click', utilManager.habilitarUsuarios)











    // formularios
    const formTareas = document.getElementById("form-tareas");
    const formLote = document.getElementById("form-lot");
    const formGalpon = document.getElementById("form-addgalpon");

    //botones 
    const btnBuscar = document.getElementById('btn-buscar');
    const btnEditBuscar = document.getElementById('btn-edit-buscar');
    const btnGuardarCambios = document.getElementById("btn-save-changes")
    const btnGuardarCambiosEdit = document.getElementById('btn-save-changes-edit')
    const btnGuardarCambioslote = document.getElementById('guardarCambiosLote')
    const btnGuardarCambiosGalpon = document.getElementById('guardarCambiosGalpon')

    // div
    const idTablaBuscar = document.getElementById("cont-tabla");
    const divEditBuscar = document.getElementById('div-edit-buscar')

    // input_texto
    const inputnickname = document.getElementById("usuario");
    const inputBuscar = document.getElementById('buscar');
    const inputEditBuscar = document.getElementById('edit-buscar');



    //EventListeners 
    formTareas.addEventListener("submit", (event) => {
        event.preventDefault();
        taskManager.agregarTareas(event);
    });
    formGalpon.addEventListener("submit", galponManager.agregarGalpon);
    formLote.addEventListener("submit", lotManager.agregarLote);
    const formAdd = document.getElementById("formAdd");
    formAdd.addEventListener("submit", userManager.agregarUsuarios);

    btnGuardarCambiosEdit.addEventListener("click", () => taskManager.guardarCambiosTareas(idUsuarioSeleccionado));
    btnGuardarCambioslote.addEventListener("click", lotManager.guardarCambiosLote)
    btnGuardarCambiosGalpon.addEventListener("click", galponManager.guardarCambiosGalpon)
    btnBuscar.addEventListener('click', () => utilManager.buscarUsuario(inputBuscar, "spinner", idTablaBuscar, "tabla-buscar", "2"));
    btnEditBuscar.addEventListener('click', () => utilManager.buscarUsuario(inputEditBuscar, "spinner-edit", divEditBuscar, "tabla-edit-buscar", "2"))
    btnGuardarCambios.addEventListener("click", userManager.guardarCambiosUsuarios)

    inputnickname.addEventListener("click", userManager.nickname)
    inputBuscar.addEventListener("click", () => utilManager.inputB(idTablaBuscar));
    btnEye.addEventListener("click", () => utilManager.togglePass(btnEye, null, 'edit-usuario-contraseña'));
    btnEye2.addEventListener("click", () => utilManager.togglePass(btnEye2, null, 'contraseña'));
    btnCerrarSesion.addEventListener('click', utilManager.cerrar)















};



document.addEventListener('DOMContentLoaded', function () {
    // utilManager.verificarToken(['administrador']);
    initEventListeners()
    inicializarGraficos()
    userManager.cargarUsuarios("activo");
    userManager.cargarUsuarios("inactivo");
    taskManager.cargarTareas();
    lotManager.cargarLote()
    galponManager.cargarGalpones();
    // userManager.cargarUsuariosBan()
    utilManager.mensajeInicio(userInfo);
});
document.addEventListener('click', function (event) {
    // Usamos una función anónima para asegurarnos de que se pase el botón correcto
    const btn = event.target.closest('.btn-editar-usuario');
    if (btn) {
        // Llamamos a editarUsuarios con el botón correcto
        userManager.editarUsuarios(btn);
    }
});
document.addEventListener('click', function (event) {
    // Usamos una función anónima para asegurarnos de que se pase el botón correcto
    const btn = event.target.closest('.btn-editar-tareas');
    if (btn) {
        // Llamamos a editarUsuarios con el botón correcto
        taskManager.editarTareas(btn, idUsuarioSeleccionado);
    }
});
document.addEventListener('click', function (event) {
    // Usamos una función anónima para asegurarnos de que se pase el botón correcto
    const btn = event.target.closest('.editar-lote');
    if (btn) {
        // Llamamos a editarUsuarios con el botón correcto
        lotManager.editarLote(btn);
    }
});
document.addEventListener('click', function (event) {
    // Usamos una función anónima para asegurarnos de que se pase el botón correcto
    const btn = event.target.closest('.editar-galpon');
    if (btn) {
        // Llamamos a editarUsuarios con el botón correcto
        galponManager.editarGalpon(btn);
    }
});




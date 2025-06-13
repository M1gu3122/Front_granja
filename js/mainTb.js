import { UtilManager } from "./utils.js";
import { ManagementTb } from "./managementHuevos.js";
import { TaskManager } from "./taskManagement.js";
import { LotManager } from "./lotManagement.js";
import { GalponManager } from "./galponManagement.js";
const utilManager = new UtilManager();
const managementTb = new ManagementTb();
const taskManager = new TaskManager()
const lotManager = new LotManager();
const galponManager = new GalponManager();

const form_huevos = document.getElementById("form-huevos");
const token = localStorage.getItem("token")
const btnGuardar = document.getElementById("btn-guardar");
const btnGuardarLote = document.getElementById("btn-guardar-lote");
const btnGuardarGalpon = document.getElementById("btn-guardar-galpon");
const btnCerrarSesion = document.getElementById('btn-logout');

const userInfo = utilManager.parseJwt(token);


const id_usuario = parseInt(userInfo.id); 

const initEventListeners = () => {
    btnGuardar.addEventListener('click', taskManager.guardarEstado)
    btnGuardarLote.addEventListener('click', lotManager.guardarCambiosLote)
    btnGuardarGalpon.addEventListener('click', galponManager.guardarCambiosGalpon)
    form_huevos.addEventListener("submit", managementTb.registroHuevos);
    btnCerrarSesion.addEventListener('click', utilManager.cerrar);

}

document.addEventListener('DOMContentLoaded', function () {
    initEventListeners()
    taskManager.cargarTareasTb()
    lotManager.cargarLote()
    galponManager.cargarGalpones()
    managementTb.cargarHuevos()
    utilManager.mensajeInicio(userInfo);
    utilManager.verificarToken(['trabajador']);
    





});
document.addEventListener('click', function (event) {
    const btn = event.target.closest('.btn-editar-estado');
    if (btn) {
        taskManager.editEstado(btn);
    }
});
document.addEventListener('click', function (event) {
    const btn = event.target.closest('.editar-lote');
    if (btn) {
        lotManager.editarLote(btn);
    }
});
document.addEventListener('click', function (event) {
    const btn = event.target.closest('.editar-galpon');
    if (btn) {
        galponManager.editarGalpon(btn);
    }
});
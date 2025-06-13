//         const ctxUsuarios = document.getElementById('chartUsuarios').getContext('2d');
//         const chartUsuarios = new Chart(ctxUsuarios, {
//             type: 'pie',
//             data: {
//                 labels: [], 
//                 datasets: [{
//                     label: 'Número de Usuarios',
//                     data: [], 
//                     backgroundColor: [
//                         'rgba(169, 223, 191)',
//                         'rgba(169, 204, 227 )',
//                         'rgba(240, 178, 122)'
//                       ],
//                       borderColor: [
//                         'rgba(39, 174, 96)',
//                         'rgba(84, 153, 199)', 
//                         'rgba(220, 118, 51)'  
//                       ],
                      
//                     borderWidth: 2
//                 }]
//             },
//             options: {

//             }
//         });

       
//         fetch('http://127.0.0.1:3000/user/obtener_usuarios'
//             ,{
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // 'Authorization': `Bearer ${token}`
//                 }
//             }
//         )
//             .then(response => response.json())
//             .then(datos => mostrarUsuarios(datos))
//             .catch(error => console.log('Error:', error));

//         function mostrarUsuarios(data) {
//             const conteoPorRol = {};

//             data.forEach(usuario => {
//                 if (conteoPorRol[usuario.tipo_usuario]) {
//                     conteoPorRol[usuario.tipo_usuario]++;
//                 } else {
//                     conteoPorRol[usuario.tipo_usuario] = 1;
//                 }
//             });

//             chartUsuarios.data.labels = Object.keys(conteoPorRol);
//             chartUsuarios.data.datasets[0].data = Object.values(conteoPorRol);
//             chartUsuarios.update();
//         }





//         const ctxHuevos = document.getElementById('chartHuevos').getContext('2d');
//         const chartHuevos = new Chart(ctxHuevos, {
//             type: 'line',
//             data: {
//                 labels: [], 
//                 datasets: [{
//                     label: 'Huevos recolectados',
//                     data: [], 
//                     backgroundColor: 'rgba( 255, 213, 79 )',
//                     borderColor: 'rgba(75, 192, 192, 1)',
//                     borderWidth: 2
//                 }]
//             },
//             options: {
//                 scales: {
//                     y: {
//                         beginAtZero: true
//                     }
//                 }
//             }
//         });

//         fetch('http://127.0.0.1:3000/huevos/total_huevos',{
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Authorization': `Bearer ${token}`
//             }
//         })
//             .then(response => response.json())
//             .then(datos => mostrarHuevos(datos))
//             .catch(error => console.log('Error:', error));


// function mostrarHuevos(data) {
//     const formatearFecha = (fechaStr) => {
//         const fecha = new Date(fechaStr);
//         const opciones = { year: 'numeric', month: 'short', day: 'numeric' };
//         return fecha.toLocaleDateString('es-ES', opciones);
//     };

//     chartHuevos.data.labels = data.map(item => formatearFecha(item.fecha));
//     chartHuevos.data.datasets[0].data = data.map(item => item.total_huevos);
//     chartHuevos.update();
// }




// // Crear el gráfico de aves inicialmente vacío
// const ctxAves = document.getElementById('chartAves').getContext('2d');
// const chartAves = new Chart(ctxAves, {
//     type: 'bar',
//     data: {
//         labels: [], // Etiquetas para los galpones
//         datasets: [{
//             label: 'Número de Aves por Galpón',
//             data: [], // Datos del número de aves por galpón
//             backgroundColor: 'rgba(171, 235, 198 , 0.5)',
//             borderColor: 'rgba(39, 174, 96)',
//             borderWidth: 2
//         }]
//     },
//     options: {
        
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
    
//     }
// });

// // Fetch los datos de la API para aves
// fetch('http://127.0.0.1:3000/graficos/total_aves_por_galpon',
//     {headers: {
//         'Content-Type': 'application/json',
//         // 'Authorization': `Bearer ${token}`
//     }}
// )
//     .then(response => response.json())
//     .then(datos => mostrarAves(datos))
//     .catch(error => console.log('Error:', error));

// // Función para procesar y mostrar los datos de aves en el gráfico
// function mostrarAves(data) {
//     // Actualizar el gráfico con los datos procesados
//     chartAves.data.labels = data.map(item => `Galpón ${item.id_galpon}`);
//     chartAves.data.datasets[0].data = data.map(item => item.total_aves);
//     chartAves.update();
// }



// // Crear el gráfico de lotes y aves inicialmente vacío
// const ctxLotesAves = document.getElementById('chartLote').getContext('2d');
// const chartLotesAves = new Chart(ctxLotesAves, {
//     type: 'doughnut',
//     data: {
//         labels: [], // Etiquetas para los galpones
//         datasets: [
            
//             {
//                 label: 'Número de Lotes',
//                 data: [], // Datos del número de lotes por galpón
//                 backgroundColor: 'rgba(245, 183, 177)',
//                 borderColor: 'rgba(192, 57, 43)',
//                 borderWidth: 2
//             },
//             {
//                 label: 'Número de Aves',
//                 data: [], // Datos del número total de aves por galpón
//                 backgroundColor: 'rgba(248, 196, 113,0.5)',
//                 borderColor: 'rgba(220, 118, 51)',
//                 borderWidth: 2
//             }
//         ]
//     },
//     options: {
//         // indexAxis: 'y',

//         // scales: {
//         //     y: {
//         //         beginAtZero: true
//         //     }
//         // }
//     }
// });

// // Fetch los datos de la API para lotes
// fetch('http://127.0.0.1:3000/graficos/lotes_y_aves_por_galpon',{
//     headers: {
//         'Content-Type': 'application/json',
//         // 'Authorization': `Bearer ${token}`
//     }
// })
//     .then(response => response.json())
//     .then(datos => mostrarLotesAves(datos))
//     .catch(error => console.log('Error:', error));

// // Función para procesar y mostrar los datos de lotes y aves en el gráfico
// function mostrarLotesAves(data) {
//     // Actualizar el gráfico con los datos procesados
//     chartLotesAves.data.labels = data.map(item => `Galpón ${item.id_galpon}`);
//     chartLotesAves.data.datasets[0].data = data.map(item => item.numero_lotes);
//     chartLotesAves.data.datasets[1].data = data.map(item => item.total_aves);
//     chartLotesAves.update();
// }


// // Crear el gráfico de tareas pendientes por usuario inicialmente vacío
// const ctxTareas = document.getElementById('chartTareas').getContext('2d');
// const chartTareas = new Chart(ctxTareas, {
//     type: 'bar',
//     data: {
//         labels: [], // Etiquetas para los usuarios
//         datasets: [{
//             label: 'Número de Tareas Pendientes',
//             data: [], // Datos del número de tareas pendientes por usuario
//             backgroundColor: 'rgba(232, 218, 239 ,0.5)',
//             borderColor: 'rgba(108, 52, 131 )',
//             borderWidth: 1
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });

// // Fetch los datos de la API para tareas
// fetch('http://127.0.0.1:3000/graficos/tareas_pendientes_por_usuario', {
//     headers: {
//         'Content-Type': 'application/json',
//         // 'Authorization': `Bearer ${token}`
//     }
// })
// .then(response => response.json())
// .then(datos => mostrarTareas(datos))
// .catch(error => console.log('Error:', error));

// // Función para procesar y mostrar los datos de tareas en el gráfico
// function mostrarTareas(data) {
//     // Verifica que data sea un array
//     if (Array.isArray(data)) {
//         // Actualizar el gráfico con los datos procesados
//         chartTareas.data.labels = data.map(item => item.nombres);
//         chartTareas.data.datasets[0].data = data.map(item => item.tareas_pendientes);
//         chartTareas.update();
//     } else {
//         console.error('La estructura de datos no es la esperada:', data);
//     }
// }



// // Crear el gráfico de diagnósticos inicialmente vacío
// const ctxDiagnosticos = document.getElementById('chartDiagnosticos').getContext('2d');
// const chartDiagnosticos = new Chart(ctxDiagnosticos, {
//     type: 'bar',
//     data: {
//         labels: [], // Etiquetas para los diagnósticos
//         datasets: [{
//             label: 'Diagnosticos Frecuentes',
//             data: [], // Datos de la frecuencia de diagnósticos
//             backgroundColor: 'rgba(239, 83, 80 , 0.5)',
//             borderColor: 'rgba(239, 83, 80)',
//             borderWidth: 2
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });

// // Fetch los datos de la API para diagnósticos
// fetch('http://127.0.0.1:3000/graficos/frecuencia_diagnostico',
//     {headers: {
//         'Content-Type': 'application/json',
//         // 'Authorization': `Bearer ${token}`
//     }}
// )
//     .then(response => response.json())
//     .then(datos => mostrarDiagnosticos(datos))
//     .catch(error => console.log('Error:', error));

// // Función para procesar y mostrar los datos de diagnósticos en el gráfico
// function mostrarDiagnosticos(data) {
//     // Actualizar el gráfico con los datos procesados
//     chartDiagnosticos.data.labels = data.map(item => item.diagnostico);
//     chartDiagnosticos.data.datasets[0].data = data.map(item => item.frecuencia);
//     chartDiagnosticos.update();
// }

// Función para crear un gráfico
// Function to create a chart
export const crearGrafico = (ctx, tipo, datos, opciones) => {
    return new Chart(ctx, {
        type: tipo,
        data: datos,
        options: opciones
    });
};

// Function to fetch data from the API
export const obtenerDatos = (url, callback) => {
    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(datos => callback(datos))
    .catch(error => console.log('Error:', error));
};

// Function to process users
export const procesarUsuarios = (data) => {
    const conteoPorRol = {};
    data.forEach(usuario => {
        conteoPorRol[usuario.tipo_usuario] = (conteoPorRol[usuario.tipo_usuario] || 0) + 1;
    });
    return conteoPorRol;
};

// Function to process eggs
export const procesarHuevos = (data) => {
    return data.map(item => ({
        fecha: formatearFecha(item.fecha),
        total_huevos: item.total_huevos
    }));
};

// Function to format dates
const formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    const opciones = { year: 'numeric', month: 'short', day: 'numeric' };
    return fecha.toLocaleDateString('es-ES', opciones);
};

// Function to process birds
export const procesarAves = (data) => {
    return {
        labels: data.map(item => `Galpón ${item.id_galpon}`),
        data: data.map(item => item.total_aves)
    };
};

// Function to process lots and birds
export const procesarLotesAves = (data) => {
    return {
        labels: data.map(item => `Galpón ${item.id_galpon}`),
        lotes: data.map(item => item.numero_lotes),
        aves: data.map(item => item.total_aves)
    };
};

// Function to process tasks
export const procesarTareas = (data) => {
    return {
        labels: data.map(item => item.nombres),
        tareas: data.map(item => item.tareas_pendientes)
    };
};

// Function to process diagnostics
export const procesarDiagnosticos = (data) => {
    return {
        labels: data.map(item => item.diagnostico),
        frecuencias: data.map(item => item.frecuencia)
    };
};

// Initialize charts
export const inicializarGraficos = () => {
    // Chart for Users
    const ctxUsuarios = document.getElementById('chartUsuarios').getContext('2d');
    const chartUsuarios = crearGrafico(ctxUsuarios, 'pie', {
        labels: [],
        datasets: [{
            label: 'Número de Usuarios',
            data: [],
            backgroundColor: [
                'rgba(169, 223, 191)',
                'rgba(169, 204, 227)',
                'rgba(240, 178, 122)'
            ],
            borderColor: [
                'rgba(39, 174, 96)',
                'rgba(84, 153, 199)',
                'rgba(220, 118, 51)'
            ],
            borderWidth: 2
        }]
    }, {});

    obtenerDatos('http://127.0.0.1:3000/user/obtener_usuarios', (data) => {
        const conteoPorRol = procesarUsuarios(data);
        chartUsuarios.data.labels = Object.keys(conteoPorRol);
        chartUsuarios.data.datasets[0].data = Object.values(conteoPorRol);
        chartUsuarios.update();
    });

    // Chart for Eggs
    const ctxHuevos = document.getElementById('chartHuevos').getContext('2d');
    const chartHuevos = crearGrafico(ctxHuevos, 'line', {
        labels: [],
        datasets: [{
            label: 'Huevos recolectados',
            data: [],
            backgroundColor: 'rgba(255, 213, 79)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
        }]
    }, {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    });

    obtenerDatos('http://127.0.0.1:3000/huevos/total_huevos', (data) => {
        const huevosProcesados = procesarHuevos(data);
        chartHuevos.data.labels = huevosProcesados.map(item => item.fecha);
        chartHuevos.data.datasets[0].data = huevosProcesados.map(item => item.total_huevos);
        chartHuevos.update();
    });

    // Chart for Birds
    const ctxAves = document.getElementById('chartAves').getContext('2d');
    const chartAves = crearGrafico(ctxAves, 'bar', {
        labels: [],
        datasets: [{
            label: 'Número de Aves por Galpón',
            data: [],
            backgroundColor: 'rgba(171, 235, 198, 0.5)',
            borderColor: 'rgba(39, 174, 96)',
            borderWidth: 2
        }]
    }, {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    });

    obtenerDatos('http://127.0.0.1:3000/graficos/total_aves_por_galpon', (data) => {
        const avesProcesadas = procesarAves(data);
        chartAves.data.labels = avesProcesadas.labels;
        chartAves.data.datasets[0].data = avesProcesadas.data;
        chartAves.update();
    });

    // Chart for Lots and Birds
    const ctxLotesAves = document.getElementById('chartLote').getContext('2d');
    const chartLotesAves = crearGrafico(ctxLotesAves, 'doughnut', {
        labels: [],
        datasets: [
            {
                label: 'Número de Lotes',
                data: [],
                backgroundColor: 'rgba(245, 183, 177)',
                borderColor: 'rgba(192, 57, 43)',
                borderWidth: 2
            },
            {
                label: 'Número de Aves',
                data: [],
                backgroundColor: 'rgba(248, 196, 113, 0.5)',
                borderColor: 'rgba(220, 118, 51)',
                borderWidth: 2
            }
        ]
    }, {});

    obtenerDatos('http://127.0.0.1:3000/graficos/lotes_y_aves_por_galpon', (data) => {
        const lotesAvesProcesados = procesarLotesAves(data);
        chartLotesAves.data.labels = lotesAvesProcesados.labels;
        chartLotesAves.data.datasets[0].data = lotesAvesProcesados.lotes;
        chartLotesAves.data.datasets[1].data = lotesAvesProcesados.aves;
        chartLotesAves.update();
    });

    // Chart for Tasks
    const ctxTareas = document.getElementById('chartTareas').getContext('2d');
    const chartTareas = crearGrafico(ctxTareas, 'bar', {
        labels: [],
        datasets: [{
            label: 'Número de Tareas Pendientes',
            data: [],
            backgroundColor: 'rgba(232, 218, 239, 0.5)',
            borderColor: 'rgba(108, 52, 131)',
            borderWidth: 1
        }]
    }, {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    });

    obtenerDatos('http://127.0.0.1:3000/graficos/tareas_pendientes_por_usuario', (data) => {
        const tareasProcesadas = procesarTareas(data);
        chartTareas.data.labels = tareasProcesadas.labels;
        chartTareas.data.datasets[0].data = tareasProcesadas.tareas;
        chartTareas.update();
    });

    // Chart for Diagnostics
    const ctxDiagnosticos = document.getElementById('chartDiagnosticos').getContext('2d');
    const chartDiagnosticos = crearGrafico(ctxDiagnosticos, 'bar', {
        labels: [],
        datasets: [{
 label: 'Diagnósticos Frecuentes',
            data: [],
            backgroundColor: 'rgba(239, 83, 80, 0.5)',
            borderColor: 'rgba(239, 83, 80)',
            borderWidth: 2
        }]
    }, {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    });

    obtenerDatos('http://127.0.0.1:3000/graficos/frecuencia_diagnostico', (data) => {
        const diagnosticosProcesados = procesarDiagnosticos(data);
        chartDiagnosticos.data.labels = diagnosticosProcesados.labels;
        chartDiagnosticos.data.datasets[0].data = diagnosticosProcesados.frecuencias;
        chartDiagnosticos.update();
    });
};
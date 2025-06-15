
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

    obtenerDatos('https://back-granja.vercel.app/user/obtener_usuarios', (data) => {
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

    obtenerDatos('https://back-granja.vercel.app/huevos/total_huevos', (data) => {
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

    obtenerDatos('https://back-granja.vercel.app/graficos/total_aves_por_galpon', (data) => {
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

    obtenerDatos('https://back-granja.vercel.app/graficos/lotes_y_aves_por_galpon', (data) => {
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

    obtenerDatos('https://back-granja.vercel.app/graficos/tareas_pendientes_por_usuario', (data) => {
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

    obtenerDatos('https://back-granja.vercel.app/graficos/frecuencia_diagnostico', (data) => {
        const diagnosticosProcesados = procesarDiagnosticos(data);
        chartDiagnosticos.data.labels = diagnosticosProcesados.labels;
        chartDiagnosticos.data.datasets[0].data = diagnosticosProcesados.frecuencias;
        chartDiagnosticos.update();
    });
};

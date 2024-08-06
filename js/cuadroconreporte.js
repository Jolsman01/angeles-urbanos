let pedidoNumero = 1;
let pedidos = [];

function updateOptions() {
    const tipoPrenda = document.getElementById('tipoPrenda').value;
    const dynamicOptions = document.getElementById('dynamicOptions');

    dynamicOptions.innerHTML = '';

    const ubicaciones = [
        'Pecho centro',
        'Pecho derecha',
        'Pecho izquierda',
        'Centro',
        'Frente abajo derecha',
        'Frente abajo izquierda',
        'Frente abajo centro',
        'Mangas',
        'Espalda Arriba',
        'Espalda Centro',
        'Espalda Abajo',
    ];

    ubicaciones.forEach(ubicacion => {
        const div = document.createElement('div');
        div.className = 'opcion-logo';
        div.innerHTML = `
            <label for="${ubicacion.replace(/\s+/g, '_')}">${ubicacion}:</label>
            <input type="number" id="${ubicacion.replace(/\s+/g, '_')}" name="${ubicacion.replace(/\s+/g, '_')}" min="0" value="0">
        `;
        dynamicOptions.appendChild(div);
    });
}

function mostrarCamposTalles(esGeneral) {
    const camposTalles = document.getElementById('camposTalles');
    const nombresTallesDiv = document.getElementById('nombresTallesDiv');

    if (esGeneral) {
        camposTalles.style.display = 'block';
        nombresTallesDiv.style.display = 'none';
    } else {
        camposTalles.style.display = 'none';
        nombresTallesDiv.style.display = 'block';
    }
}

// Función para actualizar las opciones de tela según el tipo de prenda seleccionado
function actualizarOpcionesTela() {
    const tipoPrenda = document.getElementById('tipoPrenda').value;
    const tipoTela = document.getElementById('tipoTela');
    tipoTela.innerHTML = ''; // Limpiar opciones anteriores

    let opcionesTela = [];

    switch (tipoPrenda) {
        case 'remera':
            opcionesTela = ['Algodón'];
            break;
        case 'remera_sublimacion':
            opcionesTela = ['Poliéster 100%', 'Poliéster/Algodón 50/50'];
            break;
        case 'chomba':
            opcionesTela = ['Piqué de Algodón'];
            break;
        case 'buzo':
        case 'campera':
            opcionesTela = ['Friza Premium'];
            break;
        case 'rompevientos':
            opcionesTela = ['Nylon'];
            break;
    }

    // Agregar las opciones de tela al select
    opcionesTela.forEach(tela => {
        const option = document.createElement('option');
        option.value = tela.toLowerCase().replace(/ /g, '_');
        option.textContent = tela;
        tipoTela.appendChild(option);
    });

    // Restaurar selección de tipo de tela desde localStorage si existe
    const storedTipoTela = localStorage.getItem('tipoTela');
    if (storedTipoTela) {
        tipoTela.value = storedTipoTela;
    }
}
function generarInforme() {
    const tipoPrenda = document.getElementById('tipoPrenda').value;
    const cantidadPrendas = document.getElementById('cantidadPrendas').value;
    const tipoTela = document.getElementById('tipoTela').value;
    const nombresTalles = document.getElementById('nombresTalles').value.split('\n').filter(item => item.trim() !== '');
    const otrosDetalles = document.getElementById('otrosDetalles').value;
    const prendaGeneralParticular = document.querySelector('input[name="generalParticular"]:checked').value;

    const dynamicOptions = document.getElementById('dynamicOptions');
    const opciones = dynamicOptions.querySelectorAll('input[type="number"]');
    let logoInfo = 'En la prenda seleccionada lleva logos en:\n';

    opciones.forEach(opcion => {
        const cantidad = opcion.value;
        if (cantidad > 0) {
            const ubicacion = opcion.id.replace(/_/g, ' ');
            logoInfo += `- ${ubicacion}: ${cantidad}\n`;
        }
    });

    const pedido = {
        numero: pedidoNumero,
        tipoPrenda: tipoPrenda,
        cantidadPrendas: cantidadPrendas,
        tipoTela: tipoTela,
        nombresTalles: nombresTalles,
        otrosDetalles: otrosDetalles,
        prendaGeneralParticular: prendaGeneralParticular,
        logoInfo: logoInfo
    };

    pedidos.push(pedido);
    actualizarInforme();
    pedidoNumero++;
}

function actualizarInforme() {
    const informeContainer = document.getElementById('detallesPedido');
    detallesPedido.innerHTML = '';

    pedidos.forEach(pedido => {
        const pedidoDiv = document.createElement('div');
        pedidoDiv.className = 'pedido';

        let nombresTallesHTML = '<ul>';
        pedido.nombresTalles.forEach(item => {
            nombresTallesHTML += `<li>${item}</li>`;
        });
        nombresTallesHTML += '</ul>';

        pedidoDiv.innerHTML = `
            <h2>Pedido: ${pedido.numero}</h2>
            <p>Hay ${pedido.cantidadPrendas} de ${pedido.tipoPrenda.replace(/_/g, ' ')}</p>
            <p>Tipo de tela: ${pedido.tipoTela.replace(/_/g, ' ')}</p>
            <p>${pedido.logoInfo}</p>
            <p>Listado de nombres y talles:</p>
            ${nombresTallesHTML}
            <p>Otros detalles: ${pedido.otrosDetalles}</p>
            <p>Las prendas son: ${pedido.prendaGeneralParticular === 'general' ? 'Generales (todas iguales)' : 'Particulares (cada una diferente)'}</p>
        `;

        detallesPedido.appendChild(pedidoDiv);
    });
}

function agregarOtroPedido() {
    generarInforme();
    // Resetear los campos del formulario
    document.getElementById('tipoPrenda').value = '';
    document.getElementById('cantidadPrendas').value = '';
    document.getElementById('tipoTela').innerHTML = '';
    document.getElementById('nombresTalles').value = '';
    document.getElementById('otrosDetalles').value = '';
    document.getElementById('dynamicOptions').innerHTML = '';
    document.querySelector('input[name="generalParticular"]:checked').checked = false;
}

// Inicializar opciones de tela y restaurar datos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Marcar la sesión como activa
    sessionStorage.setItem('isActive', 'true');

    actualizarOpcionesTela();
    updateOptions();

    // Agregar event listeners para guardar datos cuando se cambian los inputs
    document.getElementById('tipoPrenda').addEventListener('change', () => {
        actualizarOpcionesTela();
        updateOptions();
        guardarDatos();
    });
    document.getElementById('tipoTela').addEventListener('change', guardarDatos);
    document.getElementById('nombresTalles').addEventListener('input', guardarDatos);
    document.getElementById('otrosDetalles').addEventListener('input', guardarDatos);
});

// Limpiar localStorage al cerrar la pestaña o ventana
window.addEventListener('beforeunload', () => {
    // Verificar si la sesión está activa
    if (!sessionStorage.getItem('isActive')) {
        localStorage.clear();
    }
    // Eliminar la marca de sesión activa
    sessionStorage.removeItem('isActive');
});


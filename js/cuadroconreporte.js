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

function mostrarFormulario() {
    const formGenerales = document.getElementById('formGenerales');
    const formParticulares = document.getElementById('formParticulares');
    const seleccion = document.querySelector('input[name="generalParticular"]:checked').value;

    if (seleccion === 'general') {
        formGenerales.style.display = 'block';
        formParticulares.style.display = 'none';
        generarCamposGenerales();
    } else if (seleccion === 'particular') {
        formGenerales.style.display = 'none';
        formParticulares.style.display = 'block';
        generarFormulariosParticulares();
    }
}

function generarCamposGenerales() {
    const cantidadPrendas = parseInt(document.getElementById('cantidadPrendas').value);
    const tallesGenerales = document.getElementById('tallesGenerales');

    tallesGenerales.innerHTML = ''; // Limpiar campos anteriores

    // Aquí puedes definir los talles que se necesiten
    const talles = ['Talle 10', 'Talle 12', 'Talle 14', 'Talle 16', 'Talle S', 'Talle M', 'Talle L', 'Talle XL', 'Talle XXL', 'Talle XXXL'];

    talles.forEach(talle => {
        const div = document.createElement('div');
        div.innerHTML = `
            <label for="${talle}">${talle}:</label>
            <input type="number" id="${talle.replace(/\s+/g, '_')}" min="0" value="0">
        `;
        tallesGenerales.appendChild(div);
    });
}

function generarFormulariosParticulares() {
    const cantidadPrendas = parseInt(document.getElementById('cantidadPrendas').value);
    const especificacionesParticulares = document.getElementById('especificacionesParticulares');

    especificacionesParticulares.innerHTML = ''; // Limpiar formularios anteriores

    for (let i = 1; i <= cantidadPrendas; i++) {
        const div = document.createElement('div');
        div.innerHTML = `
            <h4>Prenda ${i}:</h4>
            <label for="talle${i}">Talle:</label>
            <select id="talle${i}">
                <option value="10"> Talle 10  (44x59)</option>
                <option value="12"> Talle 12 (46x61)</option>
                <option value="14"> Talle 14 (48x63)</option>
                <option value="16"> Talle 16 (50x67)</option>
                <option value="S"> Talle S/P (52x69)</option>
                <option value="M"> Talle M (54x72)</option>
                <option value="L"> Talle L (56x73)</option>
                <option value="XL"> Talle XL (58x74)</option>
                <option value="XXL"> Talle XXL (60x78)</option>
            </select><br>
            <label for="nombreLogo${i}">Nombre o Logo:</label>
            <input type="text" id="nombreLogo${i}" placeholder="Nombre o logo específico">
        `;
        especificacionesParticulares.appendChild(div);
    }
}

function validarGenerales() {
    const cantidadPrendas = parseInt(document.getElementById('cantidadPrendas').value);
    let totalTalles = 0;

    const tallesGenerales = document.getElementById('tallesGenerales').getElementsByTagName('input');

    for (let i = 0; i < tallesGenerales.length; i++) {
        totalTalles += parseInt(tallesGenerales[i].value) || 0;
    }

    if (totalTalles !== cantidadPrendas) {
        alert('La suma de las cantidades por talle no coincide con la cantidad total de prendas.');
        return false;
    }
    return true;
}

function validarParticulares() {
    const cantidadPrendas = parseInt(document.getElementById('cantidadPrendas').value);

    for (let i = 1; i <= cantidadPrendas; i++) {
        const talle = document.getElementById(`talle${i}`).value;
        const nombreLogo = document.getElementById(`nombreLogo${i}`).value;

        if (!talle) {
            alert(`Por favor, selecciona un talle para la prenda ${i}.`);
            return false;
        }

        if (!nombreLogo) {
            alert(`Por favor, ingresa un nombre o logo para la prenda ${i}.`);
            return false;
        }
    }
    return true;
}

function generarInformeGenerales() {
    const cantidadPrendas = parseInt(document.getElementById('cantidadPrendas').value);
    let informe = `Total de prendas: ${cantidadPrendas}\n\nDistribución por talles:\n`;

    const tallesGenerales = document.getElementById('tallesGenerales').getElementsByTagName('input');

    for (let i = 0; i < tallesGenerales.length; i++) {
        const cantidadTalle = parseInt(tallesGenerales[i].value) || 0;
        if (cantidadTalle > 0) {
            informe += `${tallesGenerales[i].id.replace(/_/g, ' ')}: ${cantidadTalle}\n`;
        }
    }

    alert(informe);
}

function generarInformeParticulares() {
    const cantidadPrendas = parseInt(document.getElementById('cantidadPrendas').value);
    let informe = `Total de prendas: ${cantidadPrendas}\n\nEspecificaciones de cada prenda:\n`;

    for (let i = 1; i <= cantidadPrendas; i++) {
        const talle = document.getElementById(`talle${i}`).value;
        const nombreLogo = document.getElementById(`nombreLogo${i}`).value;

        informe += `Prenda ${i}: Talle: ${talle}, Nombre/Logo: ${nombreLogo}\n`;
    }

    alert(informe);
}

// Guardar datos en el almacenamiento local
function guardarDatos() {
    localStorage.setItem('tipoPrenda', document.getElementById('tipoPrenda').value);
    localStorage.setItem('tipoTela', document.getElementById('tipoTela').value);
    localStorage.setItem('pedidoNumero', pedidoNumero);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

// Generar el informe completo dependiendo del tipo de prenda
function generarelminiInforme() {
    const seleccion = document.querySelector('input[name="generalParticular"]:checked').value;

    if (seleccion === 'general' && validarGenerales()) {
        generarInformeGenerales();
    } else if (seleccion === 'particular' && validarParticulares()) {
        generarInformeParticulares();
    }

    // Incrementar el número de pedido
    pedidoNumero++;
    guardarDatos();
}

// Restablecer el formulario para un nuevo pedido
function agregarOtroPedido() {
    const form = document.getElementById('pedidoForm');
    form.reset();
    mostrarFormulario(); // Asegura que se muestren los campos correctos
}

// Cargar datos de localStorage al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarOpcionesTela();
    const tipoPrenda = localStorage.getItem('tipoPrenda');
    if (tipoPrenda) {
        document.getElementById('tipoPrenda').value = tipoPrenda;
    }

    guardarDatos(); // Guardar datos al inicio
});


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
    const detallesPedido = document.getElementById('detallesPedido');
    detallesPedido.innerHTML = '';

    pedidos.forEach(pedido => {
        const pedidoDiv = document.createElement('div');
        pedidoDiv.className = 'pedido';

        let nombresTallesHTML = '<ul>';
        if (pedido.prendaGeneralParticular === 'general') {
            const tallesGenerales = document.getElementById('tallesGenerales').getElementsByTagName('input');
            for (let i = 0; i < tallesGenerales.length; i++) {
                const cantidadTalle = parseInt(tallesGenerales[i].value) || 0;
                if (cantidadTalle > 0) {
                    nombresTallesHTML += `<li>${tallesGenerales[i].id.replace(/_/g, ' ')}: ${cantidadTalle}</li>`;
                }
            }
        } else if (pedido.prendaGeneralParticular === 'particular') {
            pedido.nombresTalles.forEach(item => {
                nombresTallesHTML += `<li>${item}</li>`;
            });
        }
        nombresTallesHTML += '</ul>';

        pedidoDiv.innerHTML = `
            <h2>Pedido: ${pedido.numero}</h2>
            <p>Hay ${pedido.cantidadPrendas} de ${pedido.tipoPrenda.replace(/_/g, ' ')}</p>
            <p>Tipo de tela: ${pedido.tipoTela.replace(/_/g, ' ')}</p>
            <p>Fecha de entrega: ${pedido.fechaEntrega}</p>
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

    actualizarOpcionesTela();
    updateOptions();
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

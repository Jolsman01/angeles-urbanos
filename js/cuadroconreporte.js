// Limpieza opcional del localStorage
// localStorage.clear();


let usuarioNombre = localStorage.getItem('usuarioNombre') || 'Usuario';  // Nombre del usuario
let pedidoNumero = parseInt(localStorage.getItem('pedidoNumero')) || 1;  // Número de pedido actual
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];  // Pedidos existentes en localStorage
let pedidoId = `${usuarioNombre}_${new Date().toISOString().split('T')[0]}_${pedidoNumero}`;  // Generar el ID del pedido

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

// Mostrar formularios dependiendo de si las prendas son generales o particulares
function mostrarFormulario() {
    const formGenerales = document.getElementById('formGenerales');
    const formParticulares = document.getElementById('formParticulares');
    const seleccion = document.querySelector('input[name="generalParticular"]:checked').value;

    if (seleccion === 'general') {
        formGenerales.style.display = 'block';
        formParticulares.style.display = 'none';
        generarCamposGenerales();  // Generar los campos de talles para prendas generales
    } else if (seleccion === 'particular') {
        formGenerales.style.display = 'none';
        formParticulares.style.display = 'block';
        generarFormulariosParticulares();  // Generar formularios para prendas particulares
    }
}

// Generar campos de talles para prendas generales
function generarCamposGenerales() {
    const cantidadPrendas = parseInt(document.getElementById('cantidadPrendas').value);
    const tallesGenerales = document.getElementById('tallesGenerales');
    tallesGenerales.innerHTML = '';  // Limpiar campos anteriores

    const talles = ['Talle 10 (44x59)', 'Talle 12 (46x61)', 'Talle 14 (48x63)', 'Talle 16 (50x67)', 'Talle S/P (52x69)', 'Talle M (54x72)', 'Talle L (56x73)', 'Talle XL (58x74)', 'Talle XXL (60x78)'];

    talles.forEach(talle => {
        const div = document.createElement('div');
        div.innerHTML = `
            <label for="${talle}">${talle}:</label>
            <input type="number" id="${talle.replace(/\s+/g, '_')}" min="0" value="0">
        `;
        tallesGenerales.appendChild(div);
    });
}

// Generar formularios para prendas particulares
function generarFormulariosParticulares() {
    const cantidadPrendas = parseInt(document.getElementById('cantidadPrendas').value);
    const especificacionesParticulares = document.getElementById('especificacionesParticulares');
    especificacionesParticulares.innerHTML = '';  // Limpiar formularios anteriores

    for (let i = 1; i <= cantidadPrendas; i++) {
        const div = document.createElement('div');
        div.innerHTML = `
            <h4>Prenda ${i}:</h4>
            <label for="talle${i}">Talle:</label>
            <select id="talle${i}">
                <option value="10"> Talle 10 (44x59)</option>
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

// Validar prendas generales
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

// Validar prendas particulares
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

function agregarOtroPedido() {
    guardarDatos();
    limpiarFormulario();  // Limpiar las opciones de la prenda previa
    updateOptions(); 
}


// Guardar datos en el almacenamiento local
function guardarDatos() {
    localStorage.setItem('tipoPrenda', document.getElementById('tipoPrenda').value);
    localStorage.setItem('tipoTela', document.getElementById('tipoTela').value);
    localStorage.setItem('pedidoNumero', pedidoNumero);
    localStorage.setItem('pedidos', JSON.stringify(pedidos));
    localStorage.setItem('pedidoId', pedidoId);
    localStorage.setItem('usuarioNombre', usuarioNombre);
}

// Limpiar formulario para agregar otra prenda
function limpiarFormulario() {
    document.getElementById('tipoPrenda').value = '';
    document.getElementById('tipoTela').value = '';
    document.getElementById('cantidadPrendas').value = '';
    document.getElementById('otrosDetalles').value = '';
    document.getElementById('dynamicOptions').innerHTML = '';  // Limpiar opciones dinámicas
    document.querySelector('input[name="generalParticular"]:checked').checked = false;  // Limpiar la selección de General/Particular
}

function generarInforme() {
    // Obtén los valores básicos
    const tipoPrenda = document.getElementById('tipoPrenda').value;
    const cantidadPrendas = document.getElementById('cantidadPrendas').value;
    const tipoTela = document.getElementById('tipoTela').value;
    const otrosDetalles = document.getElementById('otrosDetalles').value;
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    const prendaGeneralParticular = document.querySelector('input[name="generalParticular"]:checked').value;
    const nombreUsuario = document.getElementById('username').value;

    // Generar ID único para el pedido si es el primer pedido
    if (!pedidoId) {
        pedidoId = `${nombreUsuario}_${fechaEntrega}_${pedidoNumero}`;
    }

    // Comprobar si todos los campos obligatorios están llenos
    if (!tipoPrenda || !cantidadPrendas || !tipoTela || !otrosDetalles || !fechaEntrega || !prendaGeneralParticular || !nombreUsuario) {
        alert("Por favor, complete todos los campos antes de generar el informe.");
        return;
    }

    // Agregar información sobre logos/agregados
    const dynamicOptions = document.getElementById('dynamicOptions');
    const opciones = dynamicOptions.querySelectorAll('input[type="number"]');
    let logoInfo = 'Ubicaciones seleccionadas:\n';

    opciones.forEach(opcion => {
        const cantidad = opcion.value;
        if (cantidad > 0) {
            const ubicacion = opcion.id.replace(/_/g, ' ');
            logoInfo += `- ${ubicacion}: ${cantidad}\n`;
        }
    });

    // Variable para almacenar nombres y talles si es prenda particular
    let nombresTalles = [];

    if (prendaGeneralParticular === 'particular') {
        for (let i = 1; i <= cantidadPrendas; i++) {
            const talle = document.getElementById(`talle${i}`).value;
            const nombreLogo = document.getElementById(`nombreLogo${i}`).value;
            nombresTalles.push(`Prenda ${i}: Talle ${talle}, Nombre/Logo: ${nombreLogo}`);
        }
    }

    // Crear un pedido
    const pedido = {
        nombreUsuario: nombreUsuario,
        pedidoId: pedidoId,
        numero: pedidoNumero,
        tipoPrenda: tipoPrenda,
        cantidadPrendas: cantidadPrendas,
        tipoTela: tipoTela,
        prendaGeneralParticular: prendaGeneralParticular,
        logoInfo: logoInfo,
        otrosDetalles: otrosDetalles,
        fechaEntrega: fechaEntrega,
        nombresTalles: nombresTalles
    };

     // Guardar el pedido en el array de pedidos
     const existingPedido = pedidos.find(p => p.pedidoId === pedidoId);
     if (existingPedido) {
         // Si ya existe un pedido con el mismo ID, actualizarlo
         Object.assign(existingPedido, pedido);
     } else {
         // Si es un nuevo pedido, agregarlo al array
         pedidos.push(pedido);
     }

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    // Actualizar la segunda columna con el nuevo informe
    actualizarInforme();

    // Incrementar el número de pedido y actualizar el ID solo si es un nuevo pedido
    if (!existingPedido) {
        pedidoNumero++;
        localStorage.setItem('pedidoNumero', pedidoNumero);
    }
}

function actualizarInforme() {
    const detallesPedido = document.getElementById('detallesPedido');
    detallesPedido.innerHTML = '';  // Limpiar el contenido anterior para evitar duplicaciones

    // Filtrar pedidos para mostrar solo los del usuario actual
    const usuarioActual = document.getElementById('username').value;
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    

    const pedidosFiltrados = pedidos.filter(pedido => pedido.pedidoId.startsWith(`${usuarioActual}_${fechaEntrega}`));
    // Recorrer todos los pedidos almacenados
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
            <p>Nombre de Usuario: ${pedido.nombreUsuario}</p>
            <p>Fecha de Entrega: ${pedido.fechaEntrega}</p>
            <p>Tipo de prenda: ${pedido.tipoPrenda.replace(/_/g, ' ')}</p>
            <p>Cantidad de prendas: ${pedido.cantidadPrendas}</p>
            <p>Tipo de tela: ${pedido.tipoTela.replace(/_/g, ' ')}</p>
            <p>${pedido.logoInfo}</p>
            <p>Otros detalles: ${pedido.otrosDetalles}</p>
            <p>Las prendas son: ${pedido.prendaGeneralParticular === 'general' ? 'Generales (todas iguales)' : 'Particulares (cada una diferente)'}</p>
            ${nombresTallesHTML}
        `;

        // Agregar el nuevo pedido a la columna de detalles
        detallesPedido.appendChild(pedidoDiv);
    });
}


function downloadPDF() {
    // Seleccionamos el contenido de la segunda columna
    var element = document.querySelector('.pequeños-box');

    // Configuración de html2pdf
    var options = {
        margin:       0.5,
        filename:     'pedido.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generamos el PDF
    html2pdf().from(element).set(options).save();
}

// Inicializar opciones de tela y restaurar datos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    sessionStorage.setItem('isActive', 'true'); // Marcar la sesión como activa
    actualizarOpcionesTela();
    updateOptions();

    // Restaurar selección de tipo de prenda desde localStorage
    const tipoPrenda = localStorage.getItem('tipoPrenda');
    if (tipoPrenda) {
        document.getElementById('tipoPrenda').value = tipoPrenda;
        actualizarOpcionesTela();
    }
});

// Limpiar localStorage al cerrar la pestaña o ventana
window.addEventListener('beforeunload', () => {
    if (!sessionStorage.getItem('isActive')) {
        localStorage.clear();
    }
    sessionStorage.removeItem('isActive');
});

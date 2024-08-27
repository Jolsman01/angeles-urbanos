// Limpieza opcional del localStorage
// localStorage.clear();
let usuarioNombre = localStorage.getItem('usuarioNombre');  // Nombre del usuario
let pedidoNumero = parseInt(localStorage.getItem('pedidoNumero')) || 1;  // Número de pedido actual
let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];  // Pedidos existentes en localStorage
let pedidoId = '';  // Inicializamos vacío y lo generaremos correctamente más tarde

function updateOptions() {
    const tipoPrendaElement = document.getElementById('tipoPrenda');
    if (!tipoPrendaElement) {
        console.error("El elemento 'tipoPrenda' no se encuentra en el DOM.");
        return;
    }

    const tipoPrenda = tipoPrendaElement.value;
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

function iniciarNuevoPedido() {
    localStorage.clear();  // Limpiar todo el localStorage al iniciar un nuevo pedido
    pedidoNumero = 1;  // Reiniciar el número de pedido
    usuarioNombre = document.getElementById('username').value || 'Usuario';
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    
    if (!usuarioNombre || !fechaEntrega) {
        alert("Por favor, ingrese un nombre de usuario y seleccione una fecha de entrega.");
        return;
    }
    
    pedidoId = `${usuarioNombre}_${fechaEntrega}_${pedidoNumero}`;  // Crear un nuevo ID de pedido

    // Actualizar el localStorage con el nuevo estado inicial
    localStorage.setItem('usuarioNombre', usuarioNombre);
    localStorage.setItem('pedidoNumero', pedidoNumero);
    localStorage.setItem('pedidos', JSON.stringify([]));  // Iniciar con un array vacío de pedidos

    limpiarFormulario();  // Limpiar el formulario de la primera columna para empezar de nuevo
    
    // Limpiar la segunda columna
    const detallesPedido = document.getElementById('detallesPedido');
    detallesPedido.innerHTML = '';  // Limpia la segunda columna para iniciar un nuevo pedido
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

function generarInforme() {
    // Obtén los valores básicos
    const tipoPrenda = document.getElementById('tipoPrenda').value;
    const cantidadPrendas = document.getElementById('cantidadPrendas').value;
    const tipoTela = document.getElementById('tipoTela').value;
    const otrosDetalles = document.getElementById('otrosDetalles').value;
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    const prendaGeneralParticular = document.querySelector('input[name="generalParticular"]:checked').value;
    const nombreUsuario = document.getElementById('username').value;

    // Comprobar si todos los campos obligatorios están llenos
    if (!tipoPrenda || !cantidadPrendas || !tipoTela || !fechaEntrega || !prendaGeneralParticular || !nombreUsuario) {
        alert("Por favor, complete todos los campos antes de generar el informe.");
        return;
    }

    // Generar ID único para el pedido si es el primer pedido
    if (!pedidoId) {
        pedidoId = `${nombreUsuario}_${fechaEntrega}_${pedidoNumero}`;
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

    if (prendaGeneralParticular === 'general') {
        // Capturar detalles de talles para prendas generales
        const tallesGenerales = document.getElementById('tallesGenerales').getElementsByTagName('input');
        for (let i = 0; i < tallesGenerales.length; i++) {
            const cantidadTalle = parseInt(tallesGenerales[i].value) || 0;
            if (cantidadTalle > 0) {
                nombresTalles.push(`${tallesGenerales[i].id.replace(/_/g, ' ')}: ${cantidadTalle}`);
            }
        }
    } else if (prendaGeneralParticular === 'particular') {
        // Capturar detalles de talles y nombres para prendas particulares
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
        nombresTalles: nombresTalles,
        prendas: [] 
    };

    // Guardar el pedido en el array de pedidos
    const existingPedido = pedidos.find(p => p.pedidoId === pedidoId);
    if (existingPedido) {
        // Si ya existe un pedido con el mismo ID, actualizarlo
        Object.assign(existingPedido, pedido);
    } else {
        // Si es un nuevo pedido, agregarlo al array
        pedidos.push(pedido);
        pedidoNumero++;
        localStorage.setItem('pedidoNumero', pedidoNumero);  // Actualizar número de pedido
    }

    // Guardar el array actualizado en el localStorage
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    // Actualizar la segunda columna con el nuevo informe
    actualizarInforme();
}

function actualizarInforme() {
    const detallesPedido = document.getElementById('detallesPedido');
    detallesPedido.innerHTML = ''; // Limpiar la segunda columna

    // Obtener el usuario actual y la fecha de entrega
    const usuarioActual = document.getElementById('username').value;
    const fechaEntrega = document.getElementById('fechaEntrega').value;

    // Filtrar los pedidos por usuario y fecha
    const pedidosFiltrados = pedidos.filter(pedido => 
        pedido.nombreUsuario === usuarioActual && pedido.fechaEntrega === fechaEntrega
    );

    // Verificar si se encontraron pedidos
    if (pedidosFiltrados.length === 0) {
        detallesPedido.textContent = 'No se encontraron pedidos para este usuario y fecha.';
        return;
    }

    // Iterar sobre los pedidos filtrados y crear el HTML
    pedidosFiltrados.forEach(pedido => {
        const pedidoDiv = document.createElement('div');
        pedidoDiv.className = 'pedido';
        let nombresTallesHTML = '';

    if (pedido.prendaGeneralParticular === 'general') {
        // Mostrar detalles de talles para prendas generales
        nombresTallesHTML = `<p>Talles y Cantidades: ${pedido.nombresTalles.join(', ')}</p>`;
    } else if (pedido.prendaGeneralParticular === 'particular') {
        // Mostrar detalles de talles y nombres para prendas particulares
        nombresTallesHTML = `<p>Nombres y Talles:</p><ul>${pedido.nombresTalles.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }
        pedidoDiv.innerHTML = `
            <h2>ID del Pedido: ${pedido.pedidoId}</h2>
            <h3>Tipo de Prenda: ${pedido.tipoPrenda}</h3>
            <p>Cantidad: ${pedido.cantidadPrendas}</p>
            <p>Tipo de Tela: ${pedido.tipoTela}</p>
            <p>Fecha de Entrega: ${pedido.fechaEntrega}</p>
            <p>Detalles: ${pedido.otrosDetalles}</p>
            <p>${pedido.prendaGeneralParticular === 'general' ? 'Prendas generales' : 'Prendas particulares'}</p>
            ${pedido.nombresTalles.length > 0 ? `<p>Nombres y Talles: ${pedido.nombresTalles.join(', ')}</p>` : ''}
            <p>${pedido.logoInfo}</p>
        `;
        detallesPedido.appendChild(pedidoDiv);
    });
}

function getLogosFromDynamicOptions() {
    const dynamicOptions = document.getElementById('dynamicOptions').querySelectorAll('input[type="number"]');
    let logos = [];

    dynamicOptions.forEach(opcion => {
        const cantidad = opcion.value;
        if (cantidad > 0) {
            const ubicacion = opcion.id.replace(/_/g, ' ');
            logos.push({ ubicacion: ubicacion, cantidad: cantidad });
        }
    });

    return logos;
}

// Limpiar formulario para agregar otra prenda
function limpiarFormulario() {
    document.getElementById('tipoPrenda').value = '';
    document.getElementById('tipoTela').value = '';
    document.getElementById('cantidadPrendas').value = '';
    document.getElementById('otrosDetalles').value = '';
    document.getElementById('dynamicOptions').innerHTML = '';  // Limpiar opciones dinámicas
    actualizarOpcionesTela();
    updateOptions();  // Actualizar las opciones dinámicas


    const generalParticular = document.querySelector('input[name="generalParticular"]:checked');
    if (generalParticular) {
        generalParticular.checked = false;  // Limpiar la selección de General/Particular
    }

}

function agregarOtroPedido() {
    // Verifica si hay un pedido en progreso
    if (!pedidos.length) {
        alert("No se ha iniciado un pedido. Por favor, genera un pedido primero.");
        return;
    }
    // Crear una nueva prenda basada en los valores actuales del formulario
    const nuevaPrenda = {
        tipoPrenda: document.getElementById('tipoPrenda').value,
        cantidadPrendas: document.getElementById('cantidadPrendas').value,
        tipoTela: document.getElementById('tipoTela').value,
        otrosDetalles: document.getElementById('otrosDetalles').value,
        prendaGeneralParticular: document.querySelector('input[name="generalParticular"]:checked').value,
        nombresTalles: getNombresTalles(), // Esto captura la información de talles y nombres
        logos: getLogosFromDynamicOptions()
    };
    
    // Asegúrate de que el pedido actual tiene un array 'prendas'
    if (!pedidos[pedidos.length - 1].prendas) {
        pedidos[pedidos.length - 1].prendas = [];
    }

    pedidos[pedidos.length - 1].prendas.push(nuevaPrenda);

    // Guardar los cambios en el localStorage
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

     // Añadir la nueva prenda a la segunda columna directamente
     agregarPrendaAInforme(nuevaPrenda);

    // Limpiar el formulario de la primera columna para que puedas agregar otra prenda
    limpiarFormulario();
}

function agregarPrendaAInforme(prenda) {
    const detallesPedido = document.getElementById('detallesPedido');

    let nombresTallesHTML = '';

    if (prenda.prendaGeneralParticular === 'general') {
        nombresTallesHTML = `<p>Talles y Cantidades: ${prenda.nombresTalles.join(', ')}</p>`;
    } else if (prenda.prendaGeneralParticular === 'particular') {
        nombresTallesHTML = `<p>Nombres y Talles:</p><ul>${prenda.nombresTalles.map(item => `<li>${item}</li>`).join('')}</ul>`;
    }

    const pedidoDiv = document.createElement('div');
    pedidoDiv.className = 'pedido';
    pedidoDiv.innerHTML = `
        <h3>Prenda Añadida: ${prenda.tipoPrenda}</h3>
        <p>Cantidad: ${prenda.cantidadPrendas}</p>
        <p>Tipo de Tela: ${prenda.tipoTela}</p>
        <p>Detalles: ${prenda.otrosDetalles}</p>
        ${nombresTallesHTML}
        <p>Ubicaciones seleccionadas:</p>
        <ul>${prenda.logos.map(logo => `<li>${logo.ubicacion}: ${logo.cantidad}</li>`).join('')}</ul>
    `;
    detallesPedido.appendChild(pedidoDiv);
}

function getNombresTalles() {
    const prendaGeneralParticular = document.querySelector('input[name="generalParticular"]:checked').value;
    let nombresTalles = [];

    if (prendaGeneralParticular === 'general') {
        const tallesGenerales = document.getElementById('tallesGenerales').getElementsByTagName('input');
        for (let i = 0; i < tallesGenerales.length; i++) {
            const cantidadTalle = parseInt(tallesGenerales[i].value) || 0;
            if (cantidadTalle > 0) {
                nombresTalles.push(`${tallesGenerales[i].id.replace(/_/g, ' ')}: ${cantidadTalle}`);
            }
        }
    } else if (prendaGeneralParticular === 'particular') {
        const cantidadPrendas = parseInt(document.getElementById('cantidadPrendas').value);
        for (let i = 1; i <= cantidadPrendas; i++) {
            const talle = document.getElementById(`talle${i}`).value;
            const nombreLogo = document.getElementById(`nombreLogo${i}`).value;
            nombresTalles.push(`Prenda ${i}: Talle ${talle}, Nombre/Logo: ${nombreLogo}`);
        }
    }

    return nombresTalles;
}

function downloadPDF() {
    let filename = pedidoId ? `${pedidoId}.pdf` : 'pedido.pdf';  // Si 'pedidoId' está vacío, usar un valor por defecto
    
    // Seleccionamos el contenido de la segunda columna
    var element = document.querySelector('.pequeños-box');

    // Expande temporalmente el contenedor para que todo su contenido sea visible
    element.style.height = 'auto';
    element.style.overflow = 'visible';
    element.style.fontSize = '12px';  // Cambia el tamaño de la fuente aquí (ajústalo según tus necesidades)
    // Ajusta los tamaños de H2, H3, y H4
    element.querySelectorAll('h2').forEach(el => el.style.fontSize = '15px');
    element.querySelectorAll('h3').forEach(el => el.style.fontSize = '14px');
    element.querySelectorAll('h4').forEach(el => el.style.fontSize = '13px');

    // Configuración de html2pdf
    var options = {
        margin:       0.5,
        filename:     filename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2,
            useCORS: true,  // Asegura la captura de contenido externo
            logging: true,  // Opción para depurar en caso de problemas
            windowWidth: element.scrollWidth,  // Ajusta el ancho de captura
            windowHeight: element.scrollHeight  // Ajusta la altura de captura
        },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Generamos el PDF
    html2pdf().from(element).set(options).save().then(() => {
        // Restaura los estilos originales después de guardar el PDF
        element.style.height = '';
        element.style.overflow = '';
        element.style.fontSize = '';  // Restaura el tamaño de la fuente original
        element.querySelectorAll('h2').forEach(el => el.style.fontSize = '');  // Restaura H2
        element.querySelectorAll('h3').forEach(el => el.style.fontSize = '');  // Restaura H3
        element.querySelectorAll('h4').forEach(el => el.style.fontSize = '');  // Restaura H4
    });
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

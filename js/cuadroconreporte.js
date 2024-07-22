// Función para actualizar las opciones de tela según el tipo de prenda seleccionado
function actualizarOpcionesTela() {
    const tipoPrenda = document.getElementById('tipoPrenda').value;
    const tipoTela = document.getElementById('tipoTela');
    tipoTela.innerHTML = ''; // Limpiar opciones anteriores

    let opcionesTela = [];

    switch (tipoPrenda) {
        case 'remera':
            opcionesTela = ['Algodón', 'Jersey Algodón'];
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

function updateOptions() {
    const select = document.getElementById('ubicacionNombre');
    const dynamicOptions = document.getElementById('dynamicOptions');
    dynamicOptions.innerHTML = ''; // clear existing options

    if (select.value === 'Estampados') {
        dynamicOptions.innerHTML = `
            <label for="estampados">Cantidad de Estampas:</label>
            <input type="number" id="estampados" name="estampados" min="0">
        `;
    } else if (select.value === 'Bordados') {
        dynamicOptions.innerHTML = `
            <label for="bordados">Cantidad de Bordados:</label>
            <input type="number" id="bordados" name="bordados" min="0">
        `;
    } else if (select.value === 'Ambas') {
        dynamicOptions.innerHTML = `
            <label for="estampados">Cantidad de Estampados:</label>
            <input type="number" id="estampados" name="estampados" min="0">
            <label for="bordados">Cantidad de Bordados:</label>
            <input type="number" id="bordados" name="bordados" min="0">
        `;
    }
}

// Función para guardar datos en localStorage
function guardarDatos() {
    const tipoPrenda = document.getElementById('tipoPrenda').value;
    const tipoTela = document.getElementById('tipoTela').value;
    const ubicacionNombre = document.getElementById('ubicacionNombre').value;
    const nombresTalles = document.getElementById('nombresTalles').value;
    const otrosDetalles = document.getElementById('otrosDetalles').value;

    localStorage.setItem('tipoPrenda', tipoPrenda);
    localStorage.setItem('tipoTela', tipoTela);
    localStorage.setItem('ubicacionNombre', ubicacionNombre);
    localStorage.setItem('nombresTalles', nombresTalles);
    localStorage.setItem('otrosDetalles', otrosDetalles);
}

// Función para restaurar datos desde localStorage
function restaurarDatos() {
    const tipoPrenda = localStorage.getItem('tipoPrenda');
    const tipoTela = localStorage.getItem('tipoTela');
    const ubicacionNombre = localStorage.getItem('ubicacionNombre');
    const nombresTalles = localStorage.getItem('nombresTalles');
    const otrosDetalles = localStorage.getItem('otrosDetalles');

    if (tipoPrenda) document.getElementById('tipoPrenda').value = tipoPrenda;
    if (tipoTela) document.getElementById('tipoTela').value = tipoTela;
    if (ubicacionNombre) document.getElementById('ubicacionNombre').value = ubicacionNombre;
    if (nombresTalles) document.getElementById('nombresTalles').value = nombresTalles;
    if (otrosDetalles) document.getElementById('otrosDetalles').value = otrosDetalles;
}

// Función para guardar el informe en localStorage
function guardarInforme() {
    const modeloChomba = document.getElementById('modeloChomba').innerText;
    const tipoTelaInfo = document.getElementById('tipoTelaInfo').innerText;
    const ubicacionNombreInfo = document.getElementById('ubicacionNombreInfo').innerText;
    const otrosDetallesText = document.getElementById('otrosDetallesText').innerText;
    const listaTallesNombres = Array.from(document.getElementById('listaTallesNombres').children).map(li => li.innerText);

    localStorage.setItem('modeloChomba', modeloChomba);
    localStorage.setItem('tipoTelaInfo', tipoTelaInfo);
    localStorage.setItem('ubicacionNombreInfo', ubicacionNombreInfo);
    localStorage.setItem('otrosDetallesText', otrosDetallesText);
    localStorage.setItem('listaTallesNombres', JSON.stringify(listaTallesNombres));
}

// Función para restaurar el informe desde localStorage
function restaurarInforme() {
    const modeloChomba = localStorage.getItem('modeloChomba');
    const tipoTelaInfo = localStorage.getItem('tipoTelaInfo');
    const ubicacionNombreInfo = localStorage.getItem('ubicacionNombreInfo');
    const otrosDetallesText = localStorage.getItem('otrosDetallesText');
    const listaTallesNombres = JSON.parse(localStorage.getItem('listaTallesNombres'));

    if (modeloChomba) document.getElementById('modeloChomba').innerText = modeloChomba;
    if (tipoTelaInfo) document.getElementById('tipoTelaInfo').innerText = tipoTelaInfo;
    if (ubicacionNombreInfo) document.getElementById('ubicacionNombreInfo').innerText = ubicacionNombreInfo;
    if (otrosDetallesText) document.getElementById('otrosDetallesText').innerText = otrosDetallesText;

    if (listaTallesNombres) {
        const lista = document.getElementById('listaTallesNombres');
        lista.innerHTML = '';
        listaTallesNombres.forEach(item => {
            const li = document.createElement('li');
            li.innerText = item;
            lista.appendChild(li);
        });
    }
}

// Función para generar el informe basado en los datos ingresados
function generarInforme() {
    const tipoPrenda = document.getElementById('tipoPrenda').value;
    const tipoTela = document.getElementById('tipoTela').value;
    const ubicacionNombre = document.getElementById('ubicacionNombre').value;
    const nombresTalles = document.getElementById('nombresTalles').value.split('\n').filter(item => item.trim() !== '');
    const otrosDetalles = document.getElementById('otrosDetalles').value;

    document.getElementById('modeloChomba').innerText = `Modelo de indumentaria: ${tipoPrenda.replace(/_/g, ' ').toUpperCase()}`;
    document.getElementById('tipoTelaInfo').innerText = `Tipo de tela: ${tipoTela.replace(/_/g, ' ')}`;
    document.getElementById('ubicacionNombreInfo').innerText = `El nombre debe ir: ${ubicacionNombre}`;
    document.getElementById('otrosDetallesText').innerText = otrosDetalles;

    const listaTallesNombres = document.getElementById('listaTallesNombres');
    listaTallesNombres.innerHTML = '';
    nombresTalles.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        listaTallesNombres.appendChild(li);
    });

    // Guardar datos e informe en localStorage
    guardarDatos();
    guardarInforme();
}

// Inicializar opciones de tela y restaurar datos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    // Marcar la sesión como activa
    sessionStorage.setItem('isActive', 'true');

    restaurarDatos();
    actualizarOpcionesTela();
    restaurarInforme();

    // Agregar event listeners para guardar datos cuando se cambian los inputs
    document.getElementById('tipoPrenda').addEventListener('change', () => {
        actualizarOpcionesTela();
        guardarDatos();
    });
    document.getElementById('tipoTela').addEventListener('change', guardarDatos);
    document.getElementById('ubicacionNombre').addEventListener('change', guardarDatos);
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
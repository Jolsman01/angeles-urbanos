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
}

// Inicializar opciones de tela cuando se carga la página
document.addEventListener('DOMContentLoaded', actualizarOpcionesTela);

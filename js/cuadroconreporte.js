function actualizarOpcionesTela() {
    const tipoPrenda = document.getElementById('tipoPrenda').value;
    const tipoTela = document.getElementById('tipoTela');
    tipoTela.innerHTML = ''; // Limpiar opciones anteriores

    if (tipoPrenda === 'remera') {
        tipoTela.innerHTML += '<option value="algodon">Algodón</option>';
        tipoTela.innerHTML += '<option value="jersey_algodon">Jersey Algodón</option>';
    } else if (tipoPrenda === 'remera_sublimacion') {
        tipoTela.innerHTML += '<option value="poliester100">Poliéster 100%</option>';
        tipoTela.innerHTML += '<option value="poliester_algodon">Poliéster/Algodón 50/50</option>';
    } else if (tipoPrenda === 'chomba') {
        tipoTela.innerHTML += '<option value="pique_algodon">Piqué de Algodón</option>';
    } else if (tipoPrenda === 'buzo') {
        tipoTela.innerHTML += '<option value="friza_premium">Friza Premium</option>';
    } else if (tipoPrenda === 'campera') {
        tipoTela.innerHTML += '<option value="friza_premium">Friza Premium</option>';
    } else if (tipoPrenda === 'rompevientos') {
        tipoTela.innerHTML += '<option value="nylon">Nylon</option>';
    }
}

function generarInforme() {
    const tipoPrenda = document.getElementById('tipoPrenda').value;
    const tipoTela = document.getElementById('tipoTela').value;
    const ubicacionNombre = document.getElementById('ubicacionNombre').value;
    const nombresTalles = document.getElementById('nombresTalles').value.split('\n');
    const otrosDetalles = document.getElementById('otrosDetalles').value;

    document.getElementById('modeloChomba').innerText = `Modelo de ${tipoPrenda.charAt(0).toUpperCase() + tipoPrenda.slice(1)}: ${tipoPrenda}`;
    document.getElementById('tipoTelaInfo').innerText = `Tipo de tela: ${tipoTela}`;
    document.getElementById('ubicacionNombreInfo').innerText = `El nombre debe ir: ${ubicacionNombre}`;
    document.getElementById('otrosDetallesText').innerText = otrosDetalles;

    const listaTallesNombres = document.getElementById('listaTallesNombres');
    listaTallesNombres.innerHTML = '';
    nombresTalles.forEach(item => {
        if (item.trim() !== '') {
            const li = document.createElement('li');
            li.innerText = item;
            listaTallesNombres.appendChild(li);
        }
    });
}

// Inicializar opciones de tela cuando se carga la página
document.addEventListener('DOMContentLoaded', actualizarOpcionesTela);
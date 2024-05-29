document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todos los elementos con la clase 'cuadro'
    const cuadros = document.querySelectorAll('.cuadro');

    // Crea el contenedor del modal y añádelo al body
    const modalContainer = document.createElement('div');
    modalContainer.id = 'modalContainer';
    modalContainer.style.display = 'none';
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modalContainer.style.zIndex = '1000';
    modalContainer.style.justifyContent = 'center';
    modalContainer.style.alignItems = 'center';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '10px';
    modalContent.style.position = 'relative';
    modalContent.style.maxWidth = '80%';
    modalContent.style.maxHeight = '80%';
    modalContent.style.overflowY = 'auto';

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';

    modalContent.appendChild(closeButton);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);

    cuadros.forEach(cuadro => {
        cuadro.addEventListener('click', function() {
            const item = this.querySelector('h3').innerText;

            modalContent.innerHTML = `
                <button style="position: absolute; top: 10px; right: 10px;">Cerrar</button>
                <div class="title" style="font-size: 24px; margin-bottom: 10px;">${item}</div>
                <div class="content" style="font-size: 18px;">
                    Contenido editable para ${item}. Añade aquí lo que necesites.
                </div>
            `;

            // Añadir el botón de cerrar al nuevo contenido
            modalContent.querySelector('button').addEventListener('click', function() {
                modalContainer.style.display = 'none';
            });

            // Mostrar el modal
            modalContainer.style.display = 'flex';
        });
    });

    // Cerrar el modal al hacer clic fuera del contenido del modal
    modalContainer.addEventListener('click', function(event) {
        if (event.target === modalContainer) {
            modalContainer.style.display = 'none';
        }
    });
});

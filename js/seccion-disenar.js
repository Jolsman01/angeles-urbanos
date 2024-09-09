// document.addEventListener("DOMContentLoaded", function() {
//     // Selecciona todos los elementos con la clase 'cuadro'
//     const cuadros = document.querySelectorAll('.cuadro');

//     // Crea el contenedor del modal y añádelo al body
//     const modalContainer = document.createElement('div');
//     modalContainer.id = 'modalContainer';
//     modalContainer.style.display = 'none';
//     modalContainer.style.position = 'fixed';
//     modalContainer.style.top = '0';
//     modalContainer.style.left = '0';
//     modalContainer.style.width = '100%';
//     modalContainer.style.height = '100%';
//     modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
//     modalContainer.style.zIndex = '1000';
//     modalContainer.style.justifyContent = 'center';
//     modalContainer.style.alignItems = 'center';

//     const modalContent = document.createElement('div');
//     modalContent.style.backgroundColor = 'white';
//     modalContent.style.padding = '20px';
//     modalContent.style.borderRadius = '10px';
//     modalContent.style.position = 'relative';
//     modalContent.style.maxWidth = '80%';
//     modalContent.style.maxHeight = '80%';
//     modalContent.style.overflowY = 'auto';

//     const closeButton = document.createElement('button');
//     closeButton.innerText = 'Cerrar';
//     closeButton.style.position = 'absolute';
//     closeButton.style.top = '10px';
//     closeButton.style.right = '10px';

//     modalContent.appendChild(closeButton);
//     modalContainer.appendChild(modalContent);
//     document.body.appendChild(modalContainer);

//     cuadros.forEach(cuadro => {
//         cuadro.addEventListener('click', function() {
//             const item = this.querySelector('h3').innerText;
//             let imageUrl = '';

//             // Determine the image URL based on the item text
//             switch(item.toLowerCase()) {
//                 case 'chomba':
//                     imageUrl = '../imagenes/imagenes_seccion_disenar/chomba.png';
//                     break;
//                 case 'remera':
//                     imageUrl = '../imagenes/imagenes_seccion_disenar/remera.png';
//                     break;
//                 case 'remera v':
//                     imageUrl = '../imagenes/imagenes_seccion_disenar/remera_v.png';
//                     break;
//                 case 'campera':
//                     imageUrl = '../imagenes/imagenes_seccion_disenar/campera.png';
//                     break;
//                 case 'canguro':
//                     imageUrl = '../imagenes/imagenes_seccion_disenar/canguro.png';
//                     break;
//                 case 'gorras':
//                     imageUrl = '../imagenes/imagenes_seccion_disenar/gorras.png';
//                     break;
//                 default:
//                     imageUrl = '';
//             }

//             modalContent.innerHTML = `
//                 <button style="position: absolute; top: 10px; right: 10px;">Cerrar</button>
//                 <section class="fondo-naranja">
//                     <div class="fondo-naranja-flex">
//                         <img src="${imageUrl}" alt="${item.toUpperCase()}">
//                         <div class="menu-modelo">
//                             <label for="opciones"></label>
//                             <select id="opciones" name="opciones">
//                                 <option value="">MODELO</option>
//                                 <option value="A">OPCION A</option>
//                                 <option value="B">OPCION B</option>
//                                 <option value="C">OPCION C</option>
//                                 <option value="D">OPCION D</option>
//                             </select>
//                         </div>
//                         <div class="botones-colores">
//                             <button class="boton-color"></button>
//                             <button class="boton-color"></button>
//                             <button class="boton-color"></button>
//                             <button class="boton-color"></button>
//                             <button class="boton-color"></button>
//                             <button class="boton-color"></button>
//                             <button class="boton-color"></button>
//                             <button class="boton-color"></button>
//                             <button class="boton-color"></button>
//                         </div>
//                     </div>
//                 </section>
//             `;

//             // Añadir el botón de cerrar al nuevo contenido
//             modalContent.querySelector('button').addEventListener('click', function() {
//                 modalContainer.style.display = 'none';
//             });

//             // Mostrar el modal
//             modalContainer.style.display = 'flex';
//         });
//     });

//     // Cerrar el modal al hacer clic fuera del contenido del modal
//     modalContainer.addEventListener('click', function(event) {
//         if (event.target === modalContainer) {
//             modalContainer.style.display = 'none';
//         }
//     });
// });

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
    modalContent.style.backgroundColor = 'transparent'; // Hacer el fondo transparente
    modalContent.style.borderRadius = '10px';
    modalContent.style.position = 'relative';
    modalContent.style.width = '70%';
    modalContent.style.height = '70%';
    modalContent.style.overflowY = 'auto';

    const closeButton = document.createElement('button');
    closeButton.innerText = 'Cerrar';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';

    modalContent.appendChild(closeButton);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);

    // Adaptar modal para pantallas pequeñas
    function adjustModalSize() {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            modalContent.style.width = '90%';
            modalContent.style.height = '90%';
        } else {
            modalContent.style.width = '70%';
            modalContent.style.height = '70%';
        }
    }

    adjustModalSize();
    window.addEventListener('resize', adjustModalSize);

    cuadros.forEach(cuadro => {
        cuadro.addEventListener('click', function() {
            const item = this.querySelector('h3').innerText.toLowerCase();
            let imageUrl = '';
            let opciones = {};
            // Determine the image URL based on the item text
            switch(item) {
                case 'chomba':
                    opciones = {
                        A: '../imagenes/imagenes_seccion_disenar/chomba.png',
                        B: '../imagenes/imagenes_colorazul_disenos/Prueba_chomba_connaranja1.png',
                        C: '../imagenes/imagenes_colorbordo_disenos/Chombabordo.png'
                    };
                    imageUrl = opciones.A; // Por defecto se muestra la opción A
                    break;
                case 'remera':
                    opciones = {
                        A: '../imagenes/imagenes_seccion_disenar/remera_en_o.png',
                        B: '../imagenes/imagenes_colorazul_disenos/Remera_en_o_Azul1.png',
                        C: '../imagenes/imagenes_colorbordo_disenos/remera_eno_bordo.png'
                    };
                    imageUrl = opciones.A; // Por defecto se muestra la opción A
                    break;
                case 'remera v':
                    opciones = {
                        A: '../imagenes/imagenes_seccion_disenar/remera_en_v.png',
                        B: '../imagenes/imagenes_colorazul_disenos/Remera_en_v_Azul1.png',
                        C: '../imagenes/imagenes_colorbordo_disenos/Remera_env_bordo.png'
                    };
                    imageUrl = opciones.A; // Por defecto se muestra la opción A
                    break;
                case 'campera':
                    opciones = {
                        A:  '../imagenes/imagenes_seccion_disenar/campera.png',
                        B: '../imagenes/imagenes_colorazul_disenos/Campera_Azul1.png',
                        C: '../imagenes/imagenes_colorbordo_disenos/Camperabordo.png'
                    };
                    imageUrl = opciones.A; // Por defecto se muestra la opción A
                    break;
                case 'canguro':
                    opciones = {
                        A:  '../imagenes/imagenes_seccion_disenar/canguro.png',
                        B: '../imagenes/imagenes_colorazul_disenos/Canguro_Azul1.png',
                        C: '../imagenes/imagenes_colorbordo_disenos/Cangurobordo.png'
                    };
                    imageUrl = opciones.A; // Por defecto se muestra la opción A
                    break;
                case 'gorras':
                    opciones = {
                        A:  '../imagenes/imagenes_seccion_disenar/gorras.png',
                        B: '../imagenes/imagenes_colorazul_disenos/Gorra_Azul1.png',
                        C: '../imagenes/imagenes_colorbordo_disenos/Gorrabordo.png'
                    };
                    imageUrl = opciones.A; // Por defecto se muestra la opción A
                    break;
                default:
                    imageUrl = '';
            }
    
            // Crea el contenido del modal
            modalContent.innerHTML = `
                <button style="position: absolute; top: 10px; right: 10px;">Cerrar</button>
                <section class="fondo-naranja" style="height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
                    <div class="fondo-naranja-flex">
                        <img id="imagen-prenda" src="${imageUrl}" alt="${item.toUpperCase()}" style="width: 600px; height: 600px; margin-bottom: -130px; margin-top:-40px; object-fit:contain;">
                        <div class="menu-modelo">
                            <label for="opciones"></label>
                            <select id="opciones" name="opciones">
                                <option value="A">OPCION A</option>
                                <option value="B">OPCION B</option>
                                <option value="C">OPCION C</option>
                            </select>
                        </div>
                    </div>
                </section>
            `;

            modalContainer.style.display = 'flex';

          // Cerrar el modal
          modalContent.querySelector('button').addEventListener('click', function() {
            modalContainer.style.display = 'none';
        });

        // Cambiar imagen según la opción seleccionada
        const selectElement = modalContent.querySelector('#opciones');
        selectElement.addEventListener('change', function() {
            const selectedOption = this.value;
            const imgElement = document.getElementById('imagen-prenda');
            imgElement.src = opciones[selectedOption];
        });
    });
});

// Cerrar el modal al hacer clic fuera del contenido
modalContainer.addEventListener('click', function(event) {
    if (event.target === modalContainer) {
        modalContainer.style.display = 'none';
    }
});

// Cerrar el modal al presionar la tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        modalContainer.style.display = 'none';
    }
});
});





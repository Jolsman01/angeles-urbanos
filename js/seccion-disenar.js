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

    cuadros.forEach(cuadro => {
        cuadro.addEventListener('click', function() {
            const item = this.querySelector('h3').innerText;
            let imageUrl = '';
            let redirigirUrl = '';

            // Determine the image URL based on the item text
            switch(item.toLowerCase()) {
                case 'chomba':
                    imageUrl = '../imagenes/imagenes_seccion_disenar/chomba.png';
                    redirigirUrl = '#';
                    break;
                case 'remera':
                    imageUrl = '../imagenes/imagenes_seccion_disenar/remera_en_o.png';
                    redirigirUrl = '#';
                    break;
                case 'remera v':
                    imageUrl = '../imagenes/imagenes_seccion_disenar/remera_en_v.png';
                    redirigirUrl = '#';
                    break;
                case 'campera':
                    imageUrl = '../imagenes/imagenes_seccion_disenar/campera.png';
                    redirigirUrl = '#';
                    break;
                case 'canguro':
                    imageUrl = '../imagenes/imagenes_seccion_disenar/canguro.png';
                    redirigirUrl = '#';
                    break;
                case 'gorras':
                    imageUrl = '../imagenes/imagenes_seccion_disenar/gorras.png';
                    redirigirUrl = '#';
                    break;
                default:
                    imageUrl = '';
                    redirigirUrl = '#';
            }

            modalContent.innerHTML = `
                <button style="position: absolute; top: 10px; right: 10px;">Cerrar</button>
                <section class="fondo-naranja" style="height: 100%; width: 100%; display: flex; align-items: center; justify-content: center;">
                    <div class="fondo-naranja-flex">
                        <img src="${imageUrl}" alt="${item.toUpperCase()}">
                        <div class="contenedor-boton">
                        <button class="boton-diseñemos">DISEÑEMOS</button>
                        </div>
                    </div>
                </section>
            `;
        const styles = document.createElement('style');
styles.innerHTML = `
    .contenedor-boton {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 20px;
    }

    .boton-diseñemos {
        background-color: blue;
        color: orange;
        border: 5px solid blue;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.3s;
    }

    .boton-diseñemos:hover {
        background-color: darkblue;
        transform: scale(1.05);
    }
`;
document.head.appendChild(styles);

            // Añadir el botón de cerrar al nuevo contenido
            modalContent.querySelector('button').addEventListener('click', function() {
                modalContainer.style.display = 'none';
            });

            //agregar función de redireccion al botón diseñemos

            // Mostrar el modal
            modalContainer.style.display = 'flex';
        });
    });

    // Cerrar el modal al hacer clic fuera del contenido del modal
    modalContainer.addEventListener('click', function(event) {
        if (event.target === modalContainer || event.target === modalContent) {
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

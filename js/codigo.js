console.dir(document.body);
console.table(platos);

// Métodos de acceso y modificación de nodos

// Sección Principal

let sectionPrincipal = document.getElementById('principal');
console.dir(sectionPrincipal);
sectionPrincipal.classList.add('container-fluid', 'mx-auto', 'p-5', 'text-center');

// Creación de un nuevo elemento

let hrElement = document.createElement('hr');
hrElement.style.width = '50%';
hrElement.style.margin = '20px auto';
hrElement.style.border = '2px dotted #ffffff';

// Uso de date para mostrar el menú del día

sectionPrincipal.appendChild(hrElement);

let hoy = new Date().getDay();
const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// Modificación de nodos  

let tituloH1 = sectionPrincipal.querySelector('#titulo');
console.dir(tituloH1);
let nombreDia = hoy === 0 ? dias[6] : dias[hoy];
tituloH1.innerText = `Sugerencias del ${nombreDia}`;
tituloH1.style.font = 'bold 40px Montserrat';


let cuentaRegresiva = document.getElementById('cuentaRegresiva');
console.dir(cuentaRegresiva);
cuentaRegresiva.classList.add('d-inline-block', 'p-2', 'm-3');
cuentaRegresiva.style.font = '22px Patrick Hand';
cuentaRegresiva.style.color = '#428C60';
cuentaRegresiva.style.background = '#E5E2C8';
cuentaRegresiva.style.borderRadius = '15px';

let sectionCarrito = document.getElementById('carrito');
sectionCarrito.classList.add('mx-auto', 'p-5');
sectionCarrito.classList.add('text-center');

let sectionPlatos = document.getElementById('menuPlatos');
console.dir(sectionPlatos);

let articuloCartas = document.getElementById('cartas');
articuloCartas.classList.add('container');
articuloCartas.classList.add('gap-3');
articuloCartas.classList.add('mx-auto');
articuloCartas.classList.add('my-3');

articuloCartas.classList.add('container', 'row', 'justify-content-center');

let tablaCarrito = document.getElementById('carrito');
tablaCarrito.classList.add('mx-auto', 'p-5');
tablaCarrito.classList.add('text-center');

// Cuenta Regresiva

function calcularTiempoRestante() {
    const ahora = new Date();
    const horaActual = ahora.getHours();

    const horaInicio = 11;
    const horaFin = 14;

    if (horaActual >= horaInicio && horaActual < horaFin) {
        return {
            dentroHorario: true,
            mensaje: 'Estás a tiempo de hacer tu pedido'
        };
    } else if (horaActual >= 0 && horaActual < 11) {
        return {
            dentroHorario: false,
            mensaje: `Falta poco para que puedas hacer tu pedido del ${nombreDia}`
        };
    } else {
        const manana = new Date(ahora);
        manana.setDate(manana.getDate() + 1);
        manana.setHours(horaInicio, 0, 0);

        const tiempoRestante = manana - ahora;
        return {
            dentroHorario: false,
            mensaje: `Faltan ${Math.floor(tiempoRestante / 3600000)} horas y ${Math.floor((tiempoRestante % 3600000) / 60000)} minutos para el próximo menú del día`
        };
    }
}

function mostrarMensaje() {
    const resultado = calcularTiempoRestante();

    document.getElementById('cuentaRegresiva').innerText = resultado.mensaje;
}

mostrarMensaje();
setInterval(mostrarMensaje, 1000);


// Cartas de platos

function renderizarPlato(plato) {
    return `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center">
                    <img src="${plato.imagen}" alt="${plato.nombre}" width="150px" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8 d-flex align-items-center">
                    <div class="card-body">
                        <h5 class="card-title" style="font-size: 20px; font-family: Montserrat;">${plato.nombre}</h5>
                        <button class="btn btn-secondary" style="background-color:#E8E8E8; border:0px; color:#428C60; font-weight:500; font-size:12px;"> 🥣 Este menú es: ${plato.tipoDeMenu}</button>
                        <p style="font-size: 25px; font-weight: bold; font-family: Patrick Hand;">$${plato.precio}</p>
                        <button id="${plato.id}" class="btn btnAgregarAlPedido agregar"> Agregar al pedido </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

let carrito = [];

// Evento clic a los botones de compra + Tostify
function agregarEventoClic() {
    let botones = document.getElementsByClassName('agregar');

    for (const boton of botones) {
        boton.addEventListener('click', () => {
            const prodACarro = platos.find((plato) => plato.id == boton.id);
            agregarAlCarrito(prodACarro);
            guardarCarritoEnLocalStorage();

            // Toastify


            Toastify({
                text: `🤩 ✅ ${prodACarro.nombre} fue agregado al pedido`,
                duration: 3000,
                newWindow: true,
                close: false,
                gravity: "right",
                position: "center", 
                style: {
                    background: "linear-gradient(to right, #e8fcab, #92e842)",
                    'text-align': 'center', 
                    'font-family': 'Montserrat',
                    'color':'#424242',
                },
            }).showToast();
        });
    };
}


// Agregar platos al carrito

const contenedorPlatos = document.getElementById('menuPlatos');
const tablaBody = document.getElementById('tablabody');


function agregarAlCarrito(plato) {
    carrito.push(plato);
    console.table(carrito);
    tablaBody.innerHTML += `
        <tr>
            <td style="font-size: 16px; color: #D6FFE7;  ; font-family: Montserrat;">${plato.id}</td>
            <td style="font-size: 16px; color: #D6FFE7;  ; font-family: Montserrat;">${plato.nombre}</td>
            <td style="font-size: 16px; color: #D6FFE7;  ; font-family: Montserrat;">$${plato.precio}</td>
            <td><button class="btn-eliminar btnEliminarCarrito" onclick="eliminarDelCarrito(${plato.id})"> ❌ No lo quiero</button></td>
        </tr>
    `;
}

for (const plato of platos) {
    articuloCartas.innerHTML += renderizarPlato(plato);
}
agregarEventoClic();


// Eliminar platos al carrito

function eliminarDelCarrito(id) {
    carrito = carrito.filter(plato => plato.id !== id);
    actualizarTabla();
    guardarCarritoEnLocalStorage();
}


// Actualizar tabla del carrito
function actualizarTabla() {
    tablaBody.innerHTML = '';
    carrito.forEach(plato => {
        tablaBody.innerHTML += `
            <tr>
                <td style="font-size: 16px; color: #D6FFE7;  ; font-family: Montserrat;">${plato.id}</td>
                <td style="font-size: 16px; color: #D6FFE7;  ; font-family: Montserrat;">${plato.nombre}</td>
                <td style="font-size: 16px; color: #D6FFE7;  ; font-family: Montserrat;">$${plato.precio}</td>
                <td><button class="btn-eliminar btnEliminarCarrito" onclick="eliminarDelCarrito(${plato.id})"> ❌ No lo quiero</button></td>
            </tr>
        `;
    });
    guardarCarritoEnLocalStorage();
}

//Dark mode

const contenedor = document.getElementById('principal');
const switchElement = document.getElementById('modeSwitch');

switchElement.addEventListener('change', () => {
    if (switchElement.checked) {
        pasarADark();
    } else {
        pasarALight();
    }
});

if (localStorage.getItem('mode') === 'dark') {
    switchElement.checked = true;
    pasarADark();
} else {
    switchElement.checked = false;
    pasarALight();
}

function pasarADark() {
    document.body.className = 'dark';
    contenedor.classList.replace('light', 'dark');
    localStorage.setItem('mode', 'dark');
}

function pasarALight() {
    document.body.className = 'light';
    contenedor.classList.replace('dark', 'light');
    localStorage.setItem('mode', 'light');
}


// Filtrar resultados

function filtrarPorTipoYPrecio(tipo, min, max) {
    return platos.filter(plato => {
        const tipos = plato.tipoDeMenu.split(', ');
        return tipos.includes(tipo) && plato.precio >= min && plato.precio <= max;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const filtroTipoMenu = document.getElementById('filtroTipoMenu');
    const filtroPrecioSeleccionado = document.getElementById('filtroPrecio');
    const cartasContenedor = document.getElementById('cartas');

    function actualizarPlatos() {
        const valorTipoMenu = parseInt(filtroTipoMenu.value);
        const valorPrecio = parseInt(filtroPrecioSeleccionado.value);

        let platosFiltrados = [];

        if (valorTipoMenu === 0 && valorPrecio === 0) {
            platosFiltrados = platos;
        } else if (valorTipoMenu !== 0 && valorPrecio !== 0) {
            platosFiltrados = filtrarPorTipoYPrecio(
                filtroTipoMenu.options[valorTipoMenu].textContent,
                (valorPrecio === 1) ? 1000 : 3000,
                (valorPrecio === 1) ? 2999 : Infinity
            );
        } else if (valorTipoMenu !== 0) {
            platosFiltrados = platos.filter(plato => {
                const tipos = plato.tipoDeMenu.split(', ');
                return tipos.includes(filtroTipoMenu.options[valorTipoMenu].textContent);
            });
        } else if (valorPrecio !== 0) {
            platosFiltrados = (valorPrecio === 1) ?
                filtrarPorPrecio(1000, 2999) :
                filtrarPorPrecio(3000, Infinity);
        }


        cartasContenedor.innerHTML = '';

        // Mostrar los platos filtrados al contenedor de cartas

        platosFiltrados.forEach(plato => {
            const platoFiltrado = document.createElement('div');
            platoFiltrado.classList.add('plato', 'col-md-5', 'mb-3');
            platoFiltrado.innerHTML = renderizarPlato(plato);
            cartasContenedor.appendChild(platoFiltrado);
        });

        // Agregar acción de clic al botón
        agregarEventoClic();
    }

    filtroTipoMenu.addEventListener('change', actualizarPlatos);
    filtroPrecioSeleccionado.addEventListener('change', actualizarPlatos);
});

//Total del carrito

function calcularTotal() {
    let total = 0;
    for (const plato of carrito) {
        total += plato.precio;
    }
    return total;
}

function actualizarTotalEnDOM() {
    const totalElement = document.getElementById('total');
    const total = calcularTotal();
    totalElement.innerText = `Total a pagar $${total}`;
}


function agregarAlCarrito(plato) {
    carrito.push(plato);
    console.table(carrito);
    tablaBody.innerHTML += `
        <tr>
            <td style="font-size: 16px; color: #D6FFE7;  ; font-family: Montserrat;">${plato.id}</td>
            <td style="font-size: 16px; color: #D6FFE7;  ; font-family: Montserrat;">${plato.nombre}</td>
            <td style="font-size: 16px; color: #D6FFE7;  ; font-family: Montserrat;">$${plato.precio}</td>
            <td><button class="btn-eliminar btnEliminarCarrito" onclick="eliminarDelCarrito(${plato.id})"> ❌ No lo quiero</button></td>
        </tr>
    `;
    actualizarTotalEnDOM();
    guardarCarritoEnLocalStorage();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(plato => plato.id !== id);
    actualizarTabla();
    actualizarTotalEnDOM();
    guardarCarritoEnLocalStorage();
}

//Guardar carrito de compras en Local Storage

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Pop up finalizar compra

document.getElementById('inputEmail4').addEventListener('input', function (event) {
    var email = this.value;
    var emailError = document.getElementById('emailError');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.match(emailPattern)) {
        emailError.textContent = 'Por favor, ingresa un correo electrónico válido.';
    } else {
        emailError.textContent = '';
    }
});


document.addEventListener('DOMContentLoaded', function () {

    // Función para abrir/cerrar el popup 
    document.getElementById('btnComprar').addEventListener('click', function () {
        var popup = document.getElementById('popup');

        popup.style.display = 'block';

        document.getElementById('btnCerrarPopup').addEventListener('click', function () {
            var popup = document.getElementById('popup');
            popup.style.display = 'none';
        });


        // Mostrar el total del carrito 
        var totalCarrito = document.getElementById('total').textContent;
        document.getElementById('popupTotal').textContent = totalCarrito;
    });

    // Cerrar el popup 
    document.getElementById('btnCancelar').addEventListener('click', function () {
        var popup = document.getElementById('popup');

        // Ocultar el popup
        popup.style.display = 'none';

    });

});

// Métodos de pago //

//Efectivo
document.getElementById('pagarEfectivo').addEventListener('click', function () {
    var totalElement = document.getElementById('total');
    var totalText = totalElement.textContent.trim();
    var total = parseFloat(totalText.slice(15));

    var metodoPago = "efectivo";

    if (metodoPago === "efectivo") {
        var descuento = total * 0.1;
        var totalConDescuento = total - descuento;


        // Mensaje de descuento
        var mensajeDescuento = document.createElement('p');
        mensajeDescuento.textContent = '🚀 ¡Genial, te damos un 10% de descuento! 🚀';
        mensajeDescuento.classList.add('descuentoAplicado');

        var popupTotalElement = document.getElementById('popupTotal');
        popupTotalElement.innerHTML = `Total a pagar $${totalConDescuento.toFixed(2)}`;

        popupTotalElement.appendChild(mensajeDescuento);

        var totalOriginalElement = document.createElement('p');
        totalOriginalElement.innerHTML = `Antes $${total.toFixed(2)}`;
        popupTotalElement.appendChild(totalOriginalElement);
        totalOriginalElement.classList.add('precioSinDescuento')
    }
});


// QR

document.getElementById('pagarQR').addEventListener('click', function () {
    pagarConQR();
});

function pagarConQR() {
    var totalElement = document.getElementById('total');
    var totalText = totalElement.textContent.trim();
    var total = parseFloat(totalText.slice(15));

    var descuento = total * 0.05;
    var totalConDescuento = total - descuento;


    // Mensaje de descuento
    var mensajeDescuento = document.createElement('p');
    mensajeDescuento.textContent = '🚀 ¡Genial, te damos un 5% de descuento! 🚀';
    mensajeDescuento.classList.add('descuentoAplicado');


    var popupTotalElement = document.getElementById('popupTotal');
    popupTotalElement.innerHTML = `Total a pagar $${totalConDescuento.toFixed(2)}`;

    popupTotalElement.appendChild(mensajeDescuento);

    var totalOriginalElement = document.createElement('p');
    totalOriginalElement.innerHTML = `Antes $${total.toFixed(2)}`;
    popupTotalElement.appendChild(totalOriginalElement);
    totalOriginalElement.classList.add('precioSinDescuento');


    // Imagen QR Mercado Pago
    var imagenQR = document.createElement('img');
    imagenQR.src = './images/qrMP.png';
    imagenQR.alt = 'Código QR de Mercado Pago';
    popupTotalElement.appendChild(imagenQR);
}

// Tarjetas

document.getElementById('pagarTarjeta').addEventListener('click', function () {
    pagarConTarjeta();
});

function pagarConTarjeta() {
    var totalElement = document.getElementById('total');
    var totalText = totalElement.textContent.trim();
    var total = parseFloat(totalText.slice(15));

    var recargo = total * 0.05;
    var totalConDescuento = total + recargo;


    // Mensaje de descuento
    var mensajeDescuento = document.createElement('p');
    mensajeDescuento.textContent = 'El pago con tarjeta tiene un 5% de recargo ⬆️ Te rederigimos a Mercado Pago para finalizar la operación';
    mensajeDescuento.classList.add('descuentoAplicado');


    var popupTotalElement = document.getElementById('popupTotal');
    popupTotalElement.innerHTML = `Total a pagar $${totalConDescuento.toFixed(2)}`;

    popupTotalElement.appendChild(mensajeDescuento);

    var totalOriginalElement = document.createElement('p');
    totalOriginalElement.innerHTML = `Antes $${total.toFixed(2)}.`;
    popupTotalElement.appendChild(totalOriginalElement);
    totalOriginalElement.classList.add('precioSinDescuento');
}


//Funcion botón pagar

document.getElementById('btnPagar').addEventListener('click', function () {
    var metodoPago = document.querySelector('input[name="metodoPago"]:checked').value;

    if (metodoPago === 'Efectivo' || metodoPago === 'QR') {
        var popupTotalElement = document.getElementById('popupTotal');
        popupTotalElement.innerHTML = '';

        setTimeout(function () {
            var popup = document.getElementById('popup');
            popup.style.display = 'none';
        }, 2500);

        var mensajeAgradecimiento = document.createElement('p');
        mensajeAgradecimiento.textContent = '😋¡Gracias por tu compra! Te enviaremos tu pedido cuanto antes. Chequeá tu mail con el seguimiento del delivery. 😋';
        mensajeAgradecimiento.classList.add('agradecimiento');
        popupTotalElement.appendChild(mensajeAgradecimiento);

    } else if (metodoPago === 'Tarjeta') {
        window.location.href = 'https://www.mercadopago.com.ar/', '_blank';
    }

    // Validación del formulario

    var email = document.getElementById('inputEmail4').value;
    var direccion = document.getElementById('inputAddress').value;
    var ciudad = document.getElementById('inputCity').value;
    var codigoPostal = document.getElementById('inputZip').value;

    if (email.trim() === '' || direccion.trim() === '' || ciudad.trim() === '' ||
        codigoPostal.trim() === '' || nombre.trim() === '' || telefono.trim() === '') {
        var popupTotalElement = document.getElementById('popupTotal');
        popupTotalElement.innerHTML = '';

        var mensajeError = document.createElement('p');
        mensajeError.textContent = 'Por favor completa todos los campos.';
        mensajeError.classList.add('mensajeError');

        popupTotalElement.appendChild(mensajeError);

        return;
    }

    // Agradecimiento o redirección según medio de pago

    var popupTotalElement = document.getElementById('popupTotal');
    popupTotalElement.innerHTML = '';

    if (metodoPago === 'Efectivo' || metodoPago === 'QR') {
        var mensajeAgradecimiento = document.createElement('p');
        mensajeAgradecimiento.textContent = '¡Gracias por tu compra! Te enviaremos tu pedido cuanto antes. Chequeá tu mail con el seguimiento del delivery. 😋';
        mensajeAgradecimiento.classList.add('agradecimiento');

        popupTotalElement.appendChild(mensajeAgradecimiento);
    } else if (metodoPago === 'Tarjeta') {
        window.open('https://www.mercadopago.com.ar/', '_blank');
    }
});

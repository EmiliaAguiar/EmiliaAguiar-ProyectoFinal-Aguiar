console.dir(document.body);
console.table(platos);

// Métodos de acceso y modificación de nodos

// Sección Principal

let sectionPrincipal = document.getElementById('principal');
console.dir(sectionPrincipal);
sectionPrincipal.style.background = '#428C60';
sectionPrincipal.classList.add('container-fluid');
sectionPrincipal.classList.add('mx-auto', 'p-5');
sectionPrincipal.classList.add('text-center');

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


let tituloH1 = document.getElementById('titulo');
console.dir(tituloH1);
let nombreDia = hoy === 0 ? dias[6] : dias[hoy];
tituloH1.innerText = `Sugerencias del ${nombreDia}`;
tituloH1.style.font = 'bold 40px Montserrat';
tituloH1.style.color = '#D6FFE7';


let parrafos = document.getElementsByClassName('parrafo');
console.dir(parrafos);

for (let i = 0; i < parrafos.length; i++) {
    parrafos[i].style.font = 'thin 12px Montserrat';
    parrafos[i].style.color = '#D6FFE7';
}

let cuentaRegresiva = document.getElementById('cuentaRegresiva');
console.dir(cuentaRegresiva);
cuentaRegresiva.classList.add('d-inline-block', 'p-2', 'm-3');
cuentaRegresiva.style.font = '22px Patrick Hand';
cuentaRegresiva.style.color = '#428C60';
cuentaRegresiva.style.background = '#E5E2C8';
cuentaRegresiva.style.borderRadius = '15px';

let sectionCarrito = document.getElementById('carrito');
sectionCarrito.style.background = '#D6FFE7';
sectionCarrito.classList.add('mx-auto', 'p-5');
sectionCarrito.classList.add('text-center');

let sectionPlatos = document.getElementById('menuPlatos');
console.dir(sectionPlatos);
sectionPlatos.style.background = '#E5E2C8';


let articuloCartas = document.getElementById('cartas');
articuloCartas.classList.add('container');
articuloCartas.classList.add('gap-3');
articuloCartas.classList.add('mx-auto');
articuloCartas.classList.add('my-3');

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
                        <h5 class="card-title" style="font-size: 20px; color: #428C60; font-family: Montserrat;">${plato.nombre}</h5>
                        <button class="btn btn-secondary" style="background-color:#E8E8E8; border:0px; color:#428C60; font-weight:500; font-size:12px;"> 🥣 Este menú es: ${plato.tipoDeMenu}</button>
                        <p style="font-size: 25px; color: green; font-weight: bold; font-family: Patrick Hand;">$${plato.precio}</p>
                        <button id="${plato.id}" class="btn btn-success comprar" style="background-color:#428C60; color:#D6FFE7; border:0px; font-family: Montserrat; text-transform: uppercase;"> Comprar </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

let carrito = []; 

// Evento clic a los botones de compra

function agregarEventoClic() {
    let botones = document.getElementsByClassName('comprar');

    for (const boton of botones) {
        boton.addEventListener('click', () => {
            const prodACarro = platos.find((plato) => plato.id == boton.id);
            agregarAlCarrito(prodACarro);
        });
    }
}

// Agregar platos al carrito

const contenedorPlatos = document.getElementById('menuPlatos');
const tablaBody = document.getElementById('tablabody');


function agregarAlCarrito(plato) {
    carrito.push(plato);
    console.table(carrito);
    tablaBody.innerHTML += `
        <tr>
            <td style="font-size: 16px; color: grey; font-family: Montserrat;">${plato.id}</td>
            <td style="font-size: 16px; color: grey; font-family: Montserrat;">${plato.nombre}</td>
            <td style="font-size: 16px; color: grey; font-family: Montserrat;">$${plato.precio}</td>
        </tr>
    `;
}

for (const plato of platos) {
    articuloCartas.innerHTML += renderizarPlato(plato);
}
agregarEventoClic();


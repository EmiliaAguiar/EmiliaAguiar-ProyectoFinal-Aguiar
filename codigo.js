console.dir(document.body);

// Aplicando métodos de acceso y modificación de nodos

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
tituloH1.innerText = `Menú del ${nombreDia}`;
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

let sectionPlatos = document.getElementById('menuPlatos')
console.dir(sectionPlatos);
sectionPlatos.style.background = '#E5E2C8';

// Cuenta regresiva del menú del día
function calcularTiempoRestante() {
    const ahora = new Date();
    const horaActual = ahora.getHours();
    const minutosActual = ahora.getMinutes();
    const segundosActual = ahora.getSeconds();

    const horaInicio = 11;
    const horaFin = 14;

    // Fuera del horario del menú
    if (horaActual >= horaInicio && horaActual < horaFin) {
        const tiempoRestanteHoras = horaFin - horaActual - 1;
        const tiempoRestanteMinutos = 59 - minutosActual;
        const tiempoRestanteSegundos = 59 - segundosActual;

        return {
            dentroHorario: true,
            tiempoRestante: {
                horas: tiempoRestanteHoras,
                minutos: tiempoRestanteMinutos,
                segundos: tiempoRestanteSegundos
            }
        };
        // Fuera del horario del menú
    } else {
        const manana = new Date(ahora);
        manana.setDate(manana.getDate() + 1);
        manana.setHours(horaInicio, 0, 0);
        const tiempoRestante = Math.floor((manana - ahora) / 1000);

        const horasRestantes = Math.floor(tiempoRestante / 3600);
        const minutosRestantes = Math.floor((tiempoRestante % 3600) / 60);
        const segundosRestantes = tiempoRestante % 60;

        return {
            dentroHorario: false,
            tiempoRestante: {
                horas: horasRestantes,
                minutos: minutosRestantes,
                segundos: segundosRestantes
            }
        };
    }
}

function mostrarMensaje() {
    const resultado = calcularTiempoRestante();

    if (resultado.dentroHorario) {
        const tiempoRestante = resultado.tiempoRestante;
        document.getElementById('cuentaRegresiva').innerText = 'Estás a tiempo de hacer tu pedido';
    } else {
        document.getElementById('cuentaRegresiva').innerText = `Faltan ${tiempoRestante.horas} horas, ${tiempoRestante.minutos} minutos y ${tiempoRestante.segundos} segundos para el próximo menú del día`;
    }
}

mostrarMensaje();
setInterval(mostrarMensaje, 1000);



// Array de objetos - Platos

const platos = [
    { id: 1, nombre: "Arroz al azafrán con pollo", precio: 2350, tipoDeMenu: "Omnívoro", imagen: "./images/arrozConPollo.png" },
    { id: 2, nombre: "Milanesas de berenjena con puré mixto", precio: 1730, tipoDeMenu: "Vegetariano", imagen: "./images/milaBerenjena.png" },
    { id: 3, nombre: "Guiso de lentejas", precio: 1770, tipoDeMenu: "Sin Tacc, Omnivoro", imagen: "./images/guiso.png" },
    { id: 4, nombre: "Tallarines de espinaca con salsa blanca", precio: 2860, tipoDeMenu: "Vegetariano", imagen: "./images/tallarines.png" },
    { id: 6, nombre: "Pollo al verdeo con papas noissete", precio: 3780, tipoDeMenu: "Omnívoro", imagen: "./images/polloAlVerdeo.png" },
    { id: 7, nombre: "Sopa crema de calabaza", precio: 1620, tipoDeMenu: "Omnívoro, Sin Tacc, Vegetariano", imagen: "./images/sopa.png" },
    { id: 8, nombre: "Sorrentinos de calabaza al pesto sin Tacc", precio: 3350, tipoDeMenu: "Sin Tacc, Vegetariano, Omnivoro", imagen: "./images/sorrentinos.png" },
    { id: 9, nombre: "Sándwich de lomito, queso, lechuga y tomate", precio: 2160, tipoDeMenu: "omnívoro", imagen: "./images/sandwich.png" },
    { id: 10, nombre: "Tarta individual cremosa de choclo", precio: 2120, tipoDeMenu: "Vegetariano", imagen: "./images/tartita.png" },
    { id: 11, nombre: "Wrap integral de atun, queso y tomate", precio: 2970, tipoDeMenu: "Omnivoro", imagen: "./images/wrap.png" },
    { id: 12, nombre: "Bife a la criolla con verduras asadas", precio: 4410, tipoDeMenu: "Omnívoro, Sin Tacc", imagen: "./images/bifes.png" },
    { id: 13, nombre: "Calabaza rellena de verduras y gratinada", precio: 3850, tipoDeMenu: "Vegetariano, Sin Tacc", imagen: "./images/calabaza.png" },
    { id: 14, nombre: "Pollo al horno con batatas y ensalada", precio: 4180, tipoDeMenu: "Omnívoro, Sin Tacc", imagen: "./images/polloAlHorno.png" },
    { id: 15, nombre: "Falafel en pan pita con salsa tahini", precio: 2990, tipoDeMenu: "Vegetariano, Sin Tacc", imagen: "./images/falafel.png" }

]

// Cartas 

let articuloCartas = document.getElementById('cartas');
articuloCartas.classList.add('container');
articuloCartas.classList.add('gap-3');
articuloCartas.classList.add('mx-auto');
articuloCartas.classList.add('my-3');

for (const plato of platos) {
    articuloCartas.innerHTML +=
        `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center">
                <img src="${plato.imagen}" alt="${plato.nombre} width="150px" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8 d-flex align-items-center">
                    <div class="card-body">
                        <h5 class="card-title" style="font-size: 20px; color: #428C60; font-family: Montserrat;">${plato.nombre}</h5>
                        <button class="btn btn-secondary" style="background-color:#E8E8E8; border:0px; color:#428C60; font-weight:500; font-size:12px;"> 🥣 Este menú es: ${plato.tipoDeMenu}</button>
                        <p style="font-size: 25px; color: green; font-weight: bold; font-family: Patrick Hand;">$${plato.precio}</p>
                        <button class="btn btn-success" style="background-color:#428C60; color:#D6FFE7; border:0px; font-family: Montserrat; text-transform: uppercase;"> Comprar </button>
                    </div>
                </div>
            </div>
        </div>
        `;
}

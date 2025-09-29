// CREAMOS LAS CONSTANTES GLOBALES
const iFoto = document.getElementById('foto');
const iNombres = document.getElementById('nombres');
const iMarca = document.getElementById('marca');
const iModelo = document.getElementById('modelo');
const iKilometraje = document.getElementById('kilometraje');
const iPrecio = document.getElementById('precio');
const form = document.getElementById('vehiculo-form');
const card = document.getElementById('cont-cardss');
const iPanel = document.getElementById('panel');
let totalPrecio = 0;

// FUNCIÓN PARA CREAR VEHÍCULO
function crearVehiculo(imagenV, titulo1, sMarca, modeloV, kVehiculo, pVehiculo) {
    const pPrincipal = document.createElement('div');
    pPrincipal.classList.add('item-vehiculo', 'col-md-6');

    const pCard = document.createElement('div');
    pCard.classList.add('card', 'h-100');

    const imagen = document.createElement('img');
    imagen.classList.add('card-img-top', 'w-100');
    imagen.setAttribute('src', imagenV);
    imagen.setAttribute('alt', 'Foto vehiculo');

    const pTercero = document.createElement('div');
    pTercero.classList.add('card-body');

    const titulo = document.createElement('h3');
    titulo.classList.add('card-title');
    titulo.textContent = titulo1;

    const marca = document.createElement('h4');
    marca.classList.add('card-text');
    marca.textContent = sMarca;

    const modelo = document.createElement('h4');
    modelo.classList.add('card-text');
    modelo.textContent = 'Modelo: ' + modeloV;

    const kilometraje = document.createElement('h4');
    kilometraje.classList.add('card-text');
    kilometraje.textContent = 'Kilometraje: ' + kVehiculo;

    const precio = document.createElement('h2');
    precio.classList.add('text-success');
    precio.textContent = '$' + pVehiculo;

    const pCuarto = document.createElement('div');
    pCuarto.classList.add('d-flex', 'justify-content-between', 'mt-3');

    const comprar = document.createElement('button');
    comprar.classList.add('btn', 'btn-success');
    comprar.textContent = 'Agregar';

    const eliminar = document.createElement('button');
    eliminar.classList.add('btn', 'btn-danger');
    eliminar.textContent = 'Eliminar';

    // ENSAMBLAR
    pPrincipal.appendChild(pCard);
    pCard.appendChild(imagen);
    pCard.appendChild(pTercero);
    pTercero.appendChild(titulo);
    pTercero.appendChild(marca);
    pTercero.appendChild(modelo);
    pTercero.appendChild(kilometraje);
    pTercero.appendChild(precio);
    pTercero.appendChild(pCuarto);
    pCuarto.appendChild(comprar);
    pCuarto.appendChild(eliminar);

    return pPrincipal;
}

// EVENTO DEL FORMULARIO
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let imagenV = iFoto.value.trim();
    const titulo1 = iNombres.value.trim();
    const sMarca = iMarca.value.trim();
    const modeloV = iModelo.value.trim();
    const kVehiculo = iKilometraje.value.trim();
    const pVehiculo = iPrecio.value.trim();

    if (imagenV == '') {
        imagenV = 'https://img.freepik.com/vector-gratis/pagina-error-404-distorsion_23-2148105404.jpg';
    }

    if (titulo1 == '' || sMarca == '' || modeloV == '' || kVehiculo == '' || pVehiculo == '') {
        alert('Registre todos los campos');
    } else {
        const newVehiculo = crearVehiculo(imagenV, titulo1, sMarca, modeloV, kVehiculo, pVehiculo);
        eventsVehicles(newVehiculo);
        card.appendChild(newVehiculo);
        form.reset();
    }
});

function eventsVehicles(pPrincipal) {
    const btnEliminar = pPrincipal.querySelector('.btn-danger');
    const btnAgregar = pPrincipal.querySelector('.btn-success');
    const contenedorCarrito = document.getElementById('contenedor-carrito');

    // ELIMINAR LA TARJETA
    btnEliminar.addEventListener('click', () => {
        pPrincipal.remove();
    });

    // AGREGAR AL CARRITO
    btnAgregar.addEventListener('click', () => {
        const imagenPanel = pPrincipal.querySelector('img').getAttribute('src');
        const marcaPanel = pPrincipal.querySelector('.card-title').textContent;
        const modeloPanel = pPrincipal.querySelectorAll('.card-text')[1].textContent;
        const precioPanel = pPrincipal.querySelector('.text-success').textContent;

        const precio = parseFloat(precioPanel.replace(/[$,]/g, ''));

        // en el ejercicio anterior era solo un valor. ahora estamos creando un objeto con varias caracteristicas con sus diferentes claves y valores
        const nuevoCarrito = {
            id: Date.now(),
            imagen: imagenPanel,
            marca: marcaPanel,
            modelo: modeloPanel,
            precio: precioPanel
        };

        // Obtener el array de carritos guardados
        const carritosGuardados = JSON.parse(localStorage.getItem('carrito')) || [];
        carritosGuardados.push(nuevoCarrito);
        localStorage.setItem('carrito', JSON.stringify(carritosGuardados));

        const newPanel = agregarPanel(imagenPanel, marcaPanel, modeloPanel, precioPanel, nuevoCarrito.id);
        contenedorCarrito.appendChild(newPanel);

        totalPrecio += precio;
        mostrarTotal();

        alert(marcaPanel + ' agregado al carrito exitosamente');
    });
}

const carrito = document.getElementById('carrito');
const ocultar = document.getElementById('ocultar');
const panel = document.querySelector('.panel');

carrito.addEventListener('click', () => {
    panel.classList.toggle('activo');
});

ocultar.addEventListener('click', () => {
    panel.classList.toggle('activo');
});

// AGREGAR VEHICULOS AL PANEL
function agregarPanel(imagenV, sMarca, modeloV, pVehiculo, id) {
    const pTarjeta = document.createElement('div');
    pTarjeta.classList.add('row', 'tarjeta-panel');
    pTarjeta.setAttribute('data-id', id);

    const pImagen = document.createElement('div');
    pImagen.classList.add('col-md-4');

    const imagenP = document.createElement('img');
    imagenP.setAttribute('src', imagenV);

    const pInfo = document.createElement('div');
    pInfo.classList.add('col-md-5', 'info');

    const mCarro = document.createElement('h2');
    mCarro.textContent = sMarca;

    const modeloCarro = document.createElement('h2');
    modeloCarro.textContent = modeloV;

    const pCuarto = document.createElement('div');
    pCuarto.classList.add('row');

    const pQuinto = document.createElement('div');
    pQuinto.classList.add('col-md-6');

    const cPrecio = document.createElement('h2');
    cPrecio.textContent = pVehiculo;

    const pSexto = document.createElement('div');
    pSexto.classList.add('col-md-6');

    const bEliminar = document.createElement('button');
    bEliminar.classList.add('btn', 'btn-danger', 'dangers');
    bEliminar.textContent = 'X';

    bEliminar.addEventListener('click', () => {
        const precioTexto = cPrecio.textContent;
        const precioNumero = parseFloat(precioTexto.replace(/[$,]/g, ''));

        // Eliminar del localStorage
        const carritosGuardados = JSON.parse(localStorage.getItem('carrito')) || [];
        const carritoActualizado = carritosGuardados.filter(v => v.id !== id);
        localStorage.setItem('carrito', JSON.stringify(carritoActualizado));

        pTarjeta.remove();
        totalPrecio -= precioNumero;
        mostrarTotal();
    });

    // ENSAMBLAR
    pTarjeta.appendChild(pImagen);
    pImagen.appendChild(imagenP);
    pTarjeta.appendChild(pInfo);
    pInfo.appendChild(mCarro);
    pInfo.appendChild(modeloCarro);
    pInfo.appendChild(pCuarto);
    pCuarto.appendChild(pQuinto);
    pQuinto.appendChild(cPrecio);
    pCuarto.appendChild(pSexto);
    pSexto.appendChild(bEliminar);

    return pTarjeta;
}

function mostrarTotal() {
    const totalC = document.getElementById('total');
    totalC.textContent = 'Precio total: $' + totalPrecio;
}

// Cargar al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
    const carritosGuardados = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenedorCarrito = document.getElementById('contenedor-carrito');

    if (carritosGuardados) {
        totalPrecio = 0;

        carritosGuardados.forEach((vehiculo) => {
            const newPanel = agregarPanel(vehiculo.imagen, vehiculo.marca, vehiculo.modelo, vehiculo.precio, vehiculo.id);
            contenedorCarrito.appendChild(newPanel);

            const precio = parseFloat(vehiculo.precio.replace(/[$,]/g, ''));
            totalPrecio += precio;
        });

        mostrarTotal();
    }
});
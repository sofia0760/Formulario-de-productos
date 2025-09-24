// CREAMOS LAS CONSTATNTES GLOBALES
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

//CREAMOS LA FUNCION QUE NOS PERMITE CREAR UNA NUEVA TAREA A PARTIR DEL FORMULARIO
//TODA ETIQUETA QUE VAMOS A CREAR ES APARTIR DE LA MAQUETA HTML PRE-EXISTENTE

// ESTA FUNCION SOLO CREA LA ESTRUCTURA DEL HTML Y AUN NO LA INSERTA EN LA PAGINA, LA DEJA EN EL LIMBO
function crearVehiculo(imagenV, titulo1, sMarca, modeloV, kVehiculo, pVehiculo) {
    //CREAMOS EL NODO, ELEMENTO PADRE O CONTENEDOR
    const pPrincipal = document.createElement('div');
    pPrincipal.classList.add('item-vehiculo', 'col-md-6');

    //CREAMOS EL NODO SERIA UN PADRE SECUNDARIO
    const pCard = document.createElement('div');
    pCard.classList.add('card', 'h-100');

    // CREAMOS LOS NODOS HIJOS
    const imagen = document.createElement('img');
    imagen.classList.add('card-img-top', 'w-100');
    imagen.setAttribute('src', imagenV);
    imagen.setAttribute('alt', 'Foto vehiculo')

    // CREO UN TERCER CONTENEDOR PADRE
    const pTercero = document.createElement('div');
    pTercero.classList.add('card-body');

    const titulo = document.createElement('h3');
    titulo.classList.add('card-title');
    titulo.textContent = titulo1

    const marca = document.createElement('h4');
    marca.classList.add('card-text')
    marca.textContent = sMarca;

    const modelo = document.createElement('h4');
    modelo.classList.add('card-text');
    modelo.textContent = 'Modelo: ' + modeloV;

    const kilometraje = document.createElement('h4');
    kilometraje.classList.add('card-text');
    kilometraje.textContent = 'Kilometraje: ' + kVehiculo;

    const precio = document.createElement('h2');
    precio.classList.add('text-success')
    precio.textContent = '$' + pVehiculo;

    // CREO EL CUARTO CONTENEDOR PADRE
    const pCuarto = document.createElement('div');
    pCuarto.classList.add('d-flex', 'justify-content-between', 'mt-3');

    // CREO LOS HIJOS DEL CUARTO CONTENEDOR PADRE
    const comprar = document.createElement('button');
    comprar.classList.add('btn', 'btn-success');
    comprar.textContent = 'Agregar';

    const eliminar = document.createElement('button');
    eliminar.classList.add('btn', 'btn-danger');
    eliminar.textContent = 'Eliminar';



    



    //ENSAMBLAMOS DENTRO DE LOS NODOS PADRES SUS NODOS HIJOS
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

    // UTILIZAMOS EL RETURN PARA RETORNAR O DAR RESPUESTA DEL ELEMENTO CREADO YA QUE LO USAREMOS EN OTRA FUNCION MAS ADELANTE
    return pPrincipal;

};

// DETECTAMOS EL EVENTO CLICK SOBRE EL BOTON AGREGAR CON UN EVENTO DE ESCUCHA O LISTENER
// PARA QUE A PARTIR DE ESTE EVENTO SE AGREGUE LA TAREA DENTRO DEL CONTENEDOR
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
        alert('Registre todos los campos')
    } else {

        const newVehiculo = crearVehiculo(imagenV, titulo1, sMarca, modeloV, kVehiculo, pVehiculo);
        eventsVehicles(newVehiculo);
        card.appendChild(newVehiculo);
        iFoto.value = '';
        iNombres.value = '';
        iMarca.value = '';
        iModelo.value = '';
        iKilometraje.value = '';
        iPrecio.value = '';
    }

});

function eventsVehicles(pPrincipal) {

    const btnEliminar = pPrincipal.querySelector('.btn-danger');
    const btnAgregar = pPrincipal.querySelector('.btn-success');
    const contenedorCarrito = document.getElementById('contenedor-carrito');


    // ELIMINAOS LA TARJETA
    btnEliminar.addEventListener('click', () => {
        pPrincipal.remove();
    });

    btnAgregar.addEventListener('click', () => {


        const imagenPanel = pPrincipal.querySelector('img').getAttribute('src');
        const marcaPanel = pPrincipal.querySelector('.card-title').textContent;
        const modeloPanel = pPrincipal.querySelector('.card-text').textContent;
        const precioPanel = pPrincipal.querySelector('.text-success').textContent;

        const precio = parseFloat(precioPanel.replace(/[$,]/g, ''));

        const newPanel = agregarPanel(imagenPanel, marcaPanel, modeloPanel, precioPanel);
        contenedorCarrito.appendChild(newPanel);


        totalPrecio += precio;
        mostrarTotal();

         alert(marcaPanel + ' agregado al carrito exitosamente');

    });









}

const carrito = document.getElementById('carrito');
const ocultar = document.getElementById('ocultar')
const panel = document.querySelector('.panel');

carrito.addEventListener('click', () => {
    panel.classList.toggle('activo')
});

ocultar.addEventListener('click', () => {
    panel.classList.toggle('activo')
});




// AGREGAR VEHICULOS AL PANEL
function agregarPanel(imagenV, sMarca, modeloV, pVehiculo) {
    // CREO EL NODO PRINCIPAL
    const pTarjeta = document.createElement('div');
    pTarjeta.classList.add('row', 'tarjeta-panel')

    // CREO LOS HIJOS
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

    const bElimnar = document.createElement('button');
    bElimnar.classList.add('btn', 'btn-danger', 'dangers');
    bElimnar.textContent = 'X';

    bElimnar.addEventListener('click', () => {
        const precioTexto = cPrecio.textContent;
        const precioNumero = parseFloat(precioTexto.replace(/[$,]/g, ''));

        pTarjeta.remove();
        totalPrecio -= precioNumero;
        mostrarTotal();
    })

    // ENMSAMBLAMOS DENTRO DE LOS NODOS PADRES SUS NODOJS HIJOS
    pTarjeta.appendChild(pImagen);
    pImagen.appendChild(imagenP);
    pTarjeta.appendChild(pInfo);
    pInfo.appendChild(mCarro);
    pInfo.appendChild(modeloCarro);
    pInfo.appendChild(pCuarto);
    pCuarto.appendChild(pQuinto);
    pQuinto.appendChild(cPrecio);
    pCuarto.appendChild(pSexto);
    pSexto.appendChild(bElimnar);

    return pTarjeta;


};

function mostrarTotal() {
    const totalC = document.getElementById('total');
    totalC.textContent = 'Precio total: $' + totalPrecio;

   

}
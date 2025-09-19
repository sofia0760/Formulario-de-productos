// creamos las contanres globales
const iFoto = document.getElementById('foto');
const iNombre = document.getElementById('nombre');
const iMarca = document.getElementById('marca');
const iModelo = document.getElementById('modelo');
const iKilometraje = document.getElementById('kilometraje');
const iprecio = document.getElementById('precio');
const form = document.getElementById('vehiculo-form');
const card = document.getElementById('cont-cardss');

// Creamos la función que nos permite crear una nueva tarea 
// Todas las etiquetas que vamos a crear parten de la maqueta HTML preexistente


// Esta funcion solo crea la estructura del html , la deja en el limbo, aun no la inserta en la pagina 
function crearVehiculos(imagenV, titulo1, sMarca, modeloV, kilometrajeV, precioV) {
    const pPrincipal = document.createElement('div');
    pPrincipal.classList.add('item-vehiculo', 'col-md-6');

    // Creamos el nodo seria un padre secundario
    const pCard = document.createElement('div');
    pCard.classList.add('card', 'h-100');

    const imagen = document.createElement('img');
    imagen.classList.add('card-img-top', 'w-100');
    imagen.setAttribute('src', imagenV);
    imagen.setAttribute('alt', 'foto vehiculo')

    // Creo un tercer padre contedor
    const pTercero = document.createElement('div');
    pTercero.classList.add('card-body');

    // Creo los hijos del tercer padre contenedor

    const titulo = document.createElement('h3');
    titulo.classList.add('card-title');
    titulo.textContent ='titulo' +  titulo1

    const marca = document.createElement('h4');
    marca.classList.add('card-subtitle', 'text-muted');
    marca.textContent ='marca'+ sMarca;

    const modelo = document.createElement('h4');
    modelo.classList.add('card-text');
    modelo.textContent = 'modelo' + modeloV;

    const kilometraje = document.createElement('h4');
    kilometraje.classList.add('card-text');
    kilometraje.textContent = 'kilometraje' + kilometrajeV;

    const precio = document.createElement('h2');
    precio.classList.add('text-success');
    precio.textContent ='precio' +  precioV;

    // Creo el cuarto padre contenedor

    const pCuarto = document.createElement('div');
    pCuarto.classList.add('d-flex', 'justify-content-between', 'mt-3');

    // creo los hijos del cuarto contenedor padre

    const comprar = document.createElement('button');
    comprar.classList.add('btn', 'btn-success');
    comprar.textContent = 'comprar';

    const eliminar = document.createElement('button');
    eliminar.classList.add('btn', 'btn-danger');
    eliminar.textContent = 'eliminar';

    // eliminar la tarjeta

    eliminar.addEventListener('click',()=>{
        pPrincipal.remove();
    });

    // muestra un mensaje al dar click en el boton comprar
    comprar.addEventListener('click',()=>{
        alert('Te contactaremos muy pronto')
    })
    

     // Ensamblamos dentro del nodo padre sus nodos hijos, es decir, la estructura de la tarea
    
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
}
    form.addEventListener('submit', (e)=> {
        e.preventDefault();
        let imagenV = iFoto.value.trim();
        const titulo1 = iNombre.value.trim();
        const sMarca = iMarca.value.trim();
        const modeloV = iModelo.value.trim();
        const kilometrajeV = iKilometraje.value.trim();
        const precioV = iprecio.value.trim();

        if (imagenV==''){
            imagenV ='https://i.pinimg.com/736x/09/3d/77/093d7746336423dd53966d192316d8fa.jpg';
        }

        if(titulo1==''|| sMarca==''|| modeloV==''|| kilometrajeV==''|| precioV==''){
            alert('Registre todos los campos')
        }else{
            const nuevoVehiculo = crearVehiculos(imagenV,titulo1,sMarca,modeloV,kilometrajeV,precioV);
            card.appendChild(nuevoVehiculo);
            iFoto.value='';
            iNombre.value='';
            iMarca.value='';
            iModelo.value='';
            iKilometraje.value='';
            iprecio.value='';
            
        }


        
    });












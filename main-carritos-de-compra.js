const table_Tbody = document.querySelector('#tabla_vehiculos_Tbody');

document.addEventListener('DOMContentLoaded',()=>{
    const carritosGuardados = JSON.parse(localStorage.getItem('carrito')) ||  [];
    carritosGuardados.forEach((vehiculo)=>{
        const fila = document.createElement('tr');
        const tdImagen = document.createElement('td');
        const img = document.createElement('img');
        img.width=80;
        img.setAttribute('src', vehiculo.imagen);
        

        const tdMarca = document.createElement('td');
        tdMarca.textContent = vehiculo.marca; 

        const tdModelo = document.createElement('td');
        tdModelo.textContent = vehiculo.modelo;

        const tdPrecio = document.createElement('td');
        tdPrecio.textContent = vehiculo.precio;

       

        // ENSAMBLAMOS 
        fila.appendChild(tdImagen);
        tdImagen.appendChild(img);
        fila.appendChild(tdMarca);
        fila.appendChild(tdModelo);
        fila.appendChild(tdPrecio);

        table_Tbody.appendChild(fila);

    })
});
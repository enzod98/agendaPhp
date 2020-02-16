const formularioContactos = document.querySelector('#contacto'),
    listadoContactos = document.querySelector('#listado-contactos tbody');

eventListeners();

function eventListeners() {
    //Cuando el formulario de crear o editar se ejecute
    formularioContactos.addEventListener('submit', leerFormulario)

    //Listener del btn eliminar
    listadoContactos.addEventListener('click', eliminarContacto)
}

function leerFormulario(e) {
    e.preventDefault();

    const nombre = document.querySelector('#nombre').value;
    const empresa = document.querySelector('#empresa').value;
    const telefono = document.querySelector('#telefono').value;
    accion = document.querySelector('#accion').value;

    if (nombre === '' || empresa === '' || telefono === '') {
        //Dos parámetros: texto y clase
        mostrarNotificacion('Todos los campos son obligatorios', 'error');
    } else {
        //Pasa la validación y hace un llamado a Ajax
        const infoContacto = new FormData();
        infoContacto.append('nombre', nombre);
        infoContacto.append('empresa', empresa);
        infoContacto.append('telefono', telefono);
        infoContacto.append('accion', accion);

        if (accion === 'crear') {
            //Crearemos un nuevo contacto
            insertarBD(infoContacto);
        } else {
            //editar el contacto
        }
    }

}

/* Inserta en la base de datos vía Ajax */
function insertarBD(datos) {
    //  Llamado a Ajax

    //crear el objeto
    const xhr = new XMLHttpRequest();

    //abrir la conexión
    xhr.open('POST', 'inc/modelos/modelos-contactos.php', true);

    //pasar los datos
    xhr.onload = function() {
        if (this.status === 200) {
            console.log(JSON.parse(xhr.responseText));
            //leemos la respuesta de php
            const respuesta = JSON.parse(xhr.responseText);
            //Inserta un nuevo elemento a la tabla
            const nuevoContacto = document.createElement('tr');

            nuevoContacto.innerHTML = `
                <td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.empresa}</td>
                <td>${respuesta.datos.telefono}</td>
            `;

            //crear contenedor para los botones
            const contenedorAcciones = document.createElement('td');

            //crear icono de editar
            const iconoEditar = document.createElement('i');
            iconoEditar.classList.add('fas', 'fa-pen-square');

            //crea el enlace para editar
            const btnEditar = document.createElement('a');
            btnEditar.appendChild(iconoEditar);
            btnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
            btnEditar.classList.add('btn', 'btn-editar');

            //agregarlo al padre
            contenedorAcciones.appendChild(btnEditar);

            //crear el icono de eliminar
            const iconoEliminar = document.createElement('i');
            iconoEliminar.classList.add('fas', 'fa-trash');

            //crea el enlace para eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.appendChild(iconoEliminar);
            btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
            btnEliminar.classList.add('btn', 'btn-borrar');

            //agregarlo al padre
            contenedorAcciones.appendChild(btnEliminar);

            //agregarlo al tr
            nuevoContacto.append(contenedorAcciones);

            //agregarlo a los contactos
            listadoContactos.appendChild(nuevoContacto);

            //resetear el form
            document.querySelector('form').reset();

            //mostrar la notificación
            mostrarNotificacion('Contacto creado correctamente', 'correcto');

        }
    }

    //enviar los datos
    xhr.send(datos);
}

//Eliminar el contacto
function eliminarContacto(e) {
    if (e.target.parentElement.classList.contains('btn-borrar')) {
        //Se toma el id
        const id = e.target.parentElement.getAttribute('data-id');
        console.log(id);

        //Se requiere confirmación del usuario
        const respuesta = confirm('¿Estás seguro?');

        if (respuesta) {
            //llamado a ajax
            //crear el objeto
            const xhr = new XMLHttpRequest();

            //abrir la conexion
            xhr.open('GET', `inc/modelos/modelos-contactos.php?id=${id}&accion=borrar`, true);

            //leer la respuesta
            xhr.onload = function() {
                if (this.status === 200) {
                    const resultado = JSON.parse(xhr.responseText);
                    console.log(resultado);
                }
            }

            //enviar la peticion
            xhr.send();
        }
    }
}

//Notificación en pantalla
function mostrarNotificacion(mensaje, clase) {
    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    //Formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));

    //Ocultar y mostrar la notificación

    setTimeout(() => {
        notificacion.classList.add('visible');

        setTimeout(() => {
            notificacion.classList.remove('visible');
            setTimeout(() => {
                notificacion.remove();
            }, 500);

        }, 3000);
    }, 100);
}
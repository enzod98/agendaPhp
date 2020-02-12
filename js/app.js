const formularioContactos = document.querySelector('#contacto');

eventListeners();

function eventListeners() {
    //Cuando el formulario de crear o editar se ejecute
    formularioContactos.addEventListener('submit', leerFormulario)
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
            console.log(respuesta.empresa);
        }
    }

    //enviar los datos
    xhr.send(datos);
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
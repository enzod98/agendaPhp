<?php

    //credenciales de la bd
    define('DB_USUARIO', 'root');
    define('DB_PASSWORD', '123456');
    define('DB_HOST', 'localhost');
    define('DB_NOMBRE', 'agendaphp');

    $conn = new mysqli(DB_HOST, DB_USUARIO, DB_PASSWORD, DB_NOMBRE);

    echo $conn->ping();
?>
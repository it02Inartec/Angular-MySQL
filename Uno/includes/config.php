<?php
$conexion = mysqli_connect('localhost', 'root', '123', 'usuario') or die('Error al intentar conectarse a la base de datos.');
echo 'Conectado correctemente';
mysqli_close($conexion);
?>
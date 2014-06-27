<?php 
require_once '../php/conexion.php'; // The mysql database connection script
if(isset($_GET['nombre'])){
	$nombre = $_GET['nombre'];
	$apellido = $_GET['apellido'];
	$usuario = $_GET['usuario'];
	$contrasena = $_GET['contrasena'];

	$query="INSERT INTO tbl_datos(nombre,apellido,usuario,contrasena)  VALUES ('$nombre', '$apellido', '$usuario', '$contrasena')";
	$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

	$result = $mysqli->affected_rows;

	echo $json_response = json_encode($result);
}
?>
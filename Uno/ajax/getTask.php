<?php
require_once('../includes/config.php'); // El script de conexión de base de datos mysql
$status = '%';
if(isset($_GET['status'])){
	$status = $_GET['status'];
}
$query="select ID, TASK, STATUS FROM tasks WHERE status like '$status' ORDER BY status,id desc";
$result = $mysqli->query($query) or die($mysqli->error.__LINE__);
 
$arr = array();
if($result->num_rows > 0) {
	while($row = $result->fetch_assoc()) {
		$arr[] = $row;
	}
}
 
# JSON-encode the response
echo $json_response = json_encode($arr);
?>
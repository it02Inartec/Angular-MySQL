// Llamamos al modulo
var myAppModule = angular.module('myApp', []);

// Creamos un controlador llamado loginCtrl
function loginCtrl($scope, $http) {

    //al mo mento que le den click al ng-click doLogin() ejecutamos la funcion
    $scope.doLogin = function() {
        // $http es similar a AJAX de jQuery con una funcionalidad muy similar
        // pero lo que si son iguales es que son llamadas AJAX, elijes metodo,
        // destino, datos a enviar etc.  
        $http({
                //usaremos el metodo POST para enviar los datos
                method: 'POST', 
                //seleccionamos a  que URL llegara la informacion
                url: 'php/formulario.php',
                //codificamos el contenido
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                //esta es la informacion que vamos a mandar
                data: { 
                        'usuario': $scope.usuario, 
                        'contrasena': $scope.contrasena 
                     },
            }).
            // si la peticion ajax se realizo con exito se ejecuta success
            success(function(data, status) {
                $scope.data = data;
                if(data == 'FALSE' || data == ''){
                    $scope.aviso = 'Usuario y contraseña invalidos';
                }
                else {
                    toogleDiv();
                }
 
            }).
            //si la peticion ajax NO fue exitosa se ejecuta error
            error(function(data, status) {
                $scope.data = data || "FALSE";
                $scope.status = status;  
                $scope.aviso = 'Ha pasado algo inesperado';
            });
    };
}

// Con esta funcion escondemos el form de login y mostramos el saludo de bienvenida
function toogleDiv(){
    $(".span5").slideUp('fast');
    $(".span1").slideDown('slow').attr('ng-hide','false');
}

myAppModule.controller('userController', function($scope, $http) {
  // Cargar todas las tareas disponibles en BD
  getTask();

  function getTask(){
    $http.post("ajax/getTask.php").success(function(data){
      debugger;
      $scope.tasks = data;
    });
  };

  $scope.addTask = function (task) {
    $http.post("ajax/addTask.php?usuario="+task).success(function(data){
        getTask();
        $scope.taskInput = "";
      });
  };
  
  $scope.deleteTask = function (task) {
    if(confirm("Esta seguro que desea eliminar esta linea?")){
    $http.post("ajax/deleteTask.php?usuarioID="+task).success(function(data){
        getTask();
      });
    }
  };

  $scope.toggleStatus = function(item, status, task) {
    if(status=='2'){status='0';}else{status='2';}
      $http.post("ajax/updateTask.php?taskID="+item+"&status="+status).success(function(data){
        getTask();
      });
  };
});
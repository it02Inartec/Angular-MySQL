var Directiva = angular.module("Directiva", []);
 
Directiva.controller("directivaController", function($scope){
 
    //esta variable de alcance la usamos con dynamicDir en la variable scope nombre
    $scope.usuario = "Israel";
 
    //esta variable de alcance la usamos con dynamicDir en la variable scope link
    $scope.msgLink = "Pulsa para ver el resultado!!";
 
    $scope.infoUser = function(usuario,edad){
        alert("Hola " + usuario + " tu edad es " + edad);
    }
});
 
/* simple directiva haciendo uso de template y de la función link
 para modificar el dom */
Directiva.directive('dirTemplate', function () {
    return {
        restrict: 'E',//<dir-template></dir-template> hace referencia a un elemento/etiqueta html
        template: '<div class="dirClass"><h1>Directivas con AngularJS</h1>' + 
                  '<ul><li ng-repeat="value in values">{{value}}</li></ul></div>',
        link: function (scope,element) {
            //en la función link añadimos algo de css con jQuery
            $(".dirClass").css({'background' : 'orange', 'color' : 'white'});
            //y creamos una variable de alcance con scope que contiene un array
            scope.values = ["simple","directiva","con","clases","en","angularjs"];
        }
    };
});
 
 
/* simple directiva haciendo uso del objeto $http para obtener datos de un json */
Directiva.directive('templateUrl', function ($http) {
    return {
        restrict: 'E',
        templateUrl: 'template.html',
        link: function (scope)  {
            //obtenemos la información del archivo data.json
            $http.get('js/data.json').success(function (data) {
                //pasamos los datos a la vista con scope
                scope.users = data;
            });
        }
    };
});
 
/* simple directiva haciendo uso más a fondo de scope dentro de las mismas 
esto son direcitivas dinámicas o reutilizables*/
Directiva.directive('dynamicDir', function(){
    return{
        restrict: 'E',
        template: '<div><div>Hola {{ nombre }}</div>' + 
        'Escribe tu edad: <input ng-model="edad" />' +
        '<a href="#" ng-click="show()">{{ link }}</div>',
        scope: {
          nombre: "@", //variables de alcance($scope) o por valor
          edad: "=", //usado para hacer uso de data-binding(datos entre vista controlador) o por referencia
          link: "@", 
          show: "&"  //útiles para llamar a funciones
        },
    }
})
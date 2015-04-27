//Define the app and dependencies
var data = data;
var app = angular.module('app', ['ngRoute', 'door3.css', 'templatescache'])
var log = function(data){console.log(data)};


//Configure routes
app.config(['$routeProvider', '$locationProvider', 
	function($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'home.html',
				controller: 'main-controller'
			})

			.when('/guidelines', {
				templateUrl: 'styleguide-listing.html',
				controller: 'styleguide-controller'
			})

			.when('/creative-brief', {
				templateUrl: 'brief.html',
				controller: 'briefCtrl'
			})

			// // Brand New Media
			// .when('/guidelines/brand-new-media', {
			// 	templateUrl: 'styleguide-template.html',
			// 	controller: 'styleguide-controller',
			// 	css: 'src/css/bnm.css'
			// })
			// all
			.when('/guidelines/:brandId', {
				templateUrl: 'styleguide-template.html',
				controller: 'BrandCtrl'
			})
			// // Surfing Australia
			// .when('/guidelines/surfing-australia', {
			// 	templateUrl: 'styleguide-template.html',
			// 	controller: 'styleguide-controller',
			// 	css: 'src/css/surfing-australia.css'
			// })
			// // ido
			// .when('/guidelines/i-do', {
			// 	templateUrl: 'styleguide-template.html',
			// 	controller: 'styleguide-controller',
			// 	css: 'src/css/i-do.css'
			// })
			// // mySURF
			// .when('/guidelines/mysurf-tv', {
			// 	templateUrl: 'styleguide-template.html',
			// 	controller: 'styleguide-controller',
			// 	css: 'src/css/mysurf.css'
			// })
			// // Wine Vine
			// .when('/guidelines/wine-vine', {
			// 	templateUrl: 'styleguide-template.html',
			// 	controller: 'styleguide-controller',
			// 	css: 'src/css/wine-vine.css'
			// })
			// // Thrive
			// .when('/guidelines/thrive', {
			// 	templateUrl: 'styleguide-template.html',
			// 	controller: 'styleguide-controller',
			// 	css: 'src/css/thrive.css'
			// })
			// // Psychic TV
			// .when('/guidelines/psychic-tv', {
			// 	templateUrl: 'styleguide-template.html',
			// 	controller: 'styleguide-controller',
			// 	css: 'src/css/psychic-tv.css'
			// })

			.when('/briefing', {
				templateUrl: 'creative-briefing.html',
				controller: 'main-controller'
			})

			.otherwise({
				redirectTo: '/'
			});
}]);


//Controllers
app.controller('main-controller', function($scope, $location){
	$scope.brands = data;

	$scope.localOnly = function(){
		if($location.$$host === "localhost"){
			return true;
		}
	};

});

app.controller('briefCtrl', function($scope, $location){


});

// var appControllers = angular.module('appControllers',[]);

app.controller('BrandCtrl', function($rootScope, $scope, $location, $anchorScroll, $css, $routeParams, $http) {

    $http.get( $routeParams.brandId + '.json').success(function(data) {
      $scope.brand = data;
    });

    $css.bind({ 
    	href: 'src/css/' + $routeParams.brandId + '.css'
  	}, $scope);


 // $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
 //    $location.hash($routeParams.scrollTo);
 //    $anchorScroll();  
 //  });
$scope.scrollTo = function(div) {
    $location.hash('section-'+div);
    $anchorScroll();
}

  });

app.controller('styleguide-controller', function($scope, $http, $location, $routeParams){

  // var self = this;
  // self.brand = $routeParams.brand;


// $http.get('src/js/tester.json').success(function(data){
//   angular.forEach(data, function(item) {
//     if (item.id == $routeParams.postId) 
//       $scope.brand = item;

//   });
// });



	$scope.brands = data;
	$scope.localOnly = function(){
		if($location.$$host === "localhost"){
			return true;
		}
	};

  // $scope.scrollTo = function(id) {
  //    $location.hash(id);
  //    $anchorScroll();
  // }

	for(x in $scope.brands){
		if($scope.brands[x].link === $routeParams.link){
			$scope.brand = $scope.brands[x];
		}
	}


})




// app.controller('brand-controller', function($scope, $routeParams, $location){
// 	//import data into the scope
// 	$scope.data = data; 
// 	//find the brand we've linked to, or back to the homepage
// 	for(x in $scope.data){
// 		if($scope.data[x].link === $routeParams.id){
// 			$scope.brand = $scope.data[x];
// 		}
// 		else{
// 			// $location.path('/');
// 		}
// 	}
// 
// });
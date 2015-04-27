var app = angular.module('bnm-styleguide', ['ngAnimate']);

app.controller('main-controller', function($scope, $window){
	$scope.primaryColors = [
		{name: "Red", rgb: "203, 44, 48", hex: "#cb2c30", pms:"PMS 711 C", cmyk:"0, 78, 76, 20"},
		{name: "Green", rgb: "67, 176, 42", hex: "#43b02a", pms:"PMS 361 C", cmyk:"77, 0, 100, 0"},
		{name: "Yellow", rgb: "255, 205, 0", hex: "#ffcd00", pms:"PMS 116c", cmyk:"0, 20, 100, 0"},
		{name: "Orange", rgb: "244, 122, 40", hex: "#f47a28", pms:"PMS 158 C", cmyk:"0, 50, 84, 4"}
	];

	$scope.secondaryColors = [
		{name: "Blue", rgb: "0, 136, 185", hex: "#0088b9", pms:"PMS 7689 C", cmyk:"100, 26, 0, 27"},
		{name: "Lime", rgb: "202, 221, 97", hex: "#cadd61", pms:"PMS 374 C", cmyk:"24, 0, 78. 0"},
		{name: "Slate", rgb: "124, 134, 142", hex: "#d5cfc5", pms:"PMS 7527 C", cmyk:"13, 6, 0, 44"},
		{name: "Grey", rgb: "124, 134, 142", hex: "#7c868e", pms:"PMS 430 C", cmyk:"13, 6, 0, 44"}
	];


	//setup the tabs for the typography section
	// $scope.typographyTabs = ['Heading Style', 'Body Style', 'Usage', 'Download'];
	$scope.selectedTypeTab = 'Typography';

	//change the selected state here
	$scope.selected = function(v){
		$scope.selectedTypeTab = v
	}

	$scope.isSelectedTypeTab = function(tab){
		if(tab === $scope.selectedTypeTab){
			return {'color': '#f47a28'};
		}
	}

});


	// {name: "Blue", rgb: "0, 136, 185", hex: "#0088b9", pms:"PMS 7689 C", cmyk:"100, 26, 0, 27"},
'use strict';

var phpRecipe = angular.module('phpRecipe', [
        'ngRoute',
        'restangular',
        'phpRecipe.controllers',
        'ui.bootstrap'
    ])
    .config(['$routeProvider', 'RestangularProvider', function($routeProvider, RestangularProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'Public/partials/home.tpl.html',
                controller: 'HomeController',
                title: 'Home Page'
            })
            .when('/add-recipe', {
                templateUrl: 'Public/partials/add-recipe.tpl.html',
                controller: 'AddRecipeController',
                title: 'Add Recipe'
            })
            .otherwise({
                redirectTo: '/home'
            });

            RestangularProvider.setBaseUrl('http://localhost/~christie/php_recipe/backend');
    }]);
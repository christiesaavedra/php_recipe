'use strict';

/* Controllers */

angular.module('phpRecipe.controllers', [])
    .controller('BaseController', ['$scope', function($scope) {

    }])
    .controller('HomeController', ['$scope', function($scope) {
        console.log("hitting here.")
    }])
    .controller('AddRecipeController', ['$scope', 'Restangular', function($scope, Restangular) {
        $scope.recipe = { ingredients: [], tags: [] };
        $scope.status = null;

        Restangular.all('ingredients').getList()
        	.then(function (ingredients) {
        		console.log('ingredients: ' + JSON.stringify(ingredients));
	            $scope.ingredients = ingredients;

	            for (var i = 0; i < $scope.ingredients.length; i++) {
	                $scope.ingredients[i].active = true;
	            }
	        });

        Restangular.all('tags').getList()
        	.then(function (tags) {
        		console.log('tags: ' + JSON.stringify(tags));
             $scope.tags = tags;

             for (var i = 0; i < $scope.tags.length; i++) {
	                $scope.tags[i].active = true;
	            }
         	});

        $scope.saveNewRecipe = function () {

            $scope.tagObjectsToIds();
            $scope.ingredientObjectsToIds();

            Restangular.all('create_recipe').customPOST($scope.recipe)
	            .then(function (data) {
	            	console.log(JSON.stringify(data));
	                $scope.status = "The recipe was successfully created!";
	                $scope.recipe = { ingredients: [], tags: [] };
	            }, function () {
	                $scope.status = "The recipe couldn't be saved";
	            });
        };
        $scope.tagObjectsToIds = function () {
            for (var i = 0; i < $scope.recipe.tags.length; i++) {
                var tag = $scope.recipe.tags[i];
                $scope.recipe.tags[i] = tag.id;
            }
        }
        $scope.ingredientObjectsToIds = function () {
            for (var i = 0; i < $scope.recipe.ingredients.length; i++) {
                var tag = $scope.recipe.ingredients[i];
                $scope.recipe.ingredients[i] = ingredient.id;
            }
        }
        // $scope.addIngredient = function (ingredientId) {
        //     if ($scope.recipe.ingredients.indexOf(ingredientId) == -1) {
        //         $scope.recipe.ingredients.push(ingredientId);

        //         for (var ingredientIndex in $scope.ingredients) {
        //             var ingredient = $scope.ingredients[ingredientIndex];
        //             if (ingredient.id == ingredientId) {
        //                 $scope.ingredients[ingredientIndex].active = false;
        //             }
        //         }

        //     }
        // };

        // $scope.removeIngredient = function (ingredientId) {
        //     var index = $scope.recipe.ingredients.indexOf(ingredientId);
        //     $scope.recipe.ingredients.splice(index, 1);

        //     for (var ingredientIndex in $scope.ingredients) {
        //         var ingredient = $scope.ingredients[ingredientIndex];
        //         if (ingredient.id == ingredientId) {
        //             $scope.ingredients[ingredientIndex].active = true;
        //         }
        //     }
        // };

        // $scope.getIngredientName = function (ingredientId) {
        //     for (var ingredientIndex in $scope.ingredients) {
        //         var ingredient = $scope.ingredients[ingredientIndex];
        //         if (ingredient.id == ingredientId) {
        //             return ingredient.name;
        //         }
        //     }
        // };

        // $scope.getTagName = function (tagId) {
        //     for (var tagIndex in $scope.tags) {
        //         var tag = $scope.tags[tagIndex];
        //         if (tag.id == tagId) {
        //             return tag.name;
        //         }
        //     }
        // };

        // var getTagFromName = function (tagName) {
        //     for (var i = 0; i < $scope.tags.length; i++) {
        //         var tag = $scope.tags[i];
        //         if (tag.name == tagName) {
        //             return tag;
        //         }
        //     }
        //     return null;
        // };

        // var addTagToRecipe = function (tag) {
        //     if ($scope.recipe.tags.indexOf(tag) == -1) {
        //         $scope.recipe.tags.push(tag);
        //     }
        // };

        // var createTag = function (tagName) {

        //     var tag = {name: tagName};
        //     console.log('Blah' + JSON.stringify(tag))
        //     Restangular.all('tags').customPOST(tag).then(function (tag) {
        //         tag.justAdded = true;
        //         $scope.tags.push(tag);
        //         addTagToRecipe(tag);
        //     })
        // };

        // $scope.saveTag = function (tagName) {
        //     var tag = getTagFromName(tagName);
        //     console.log(tag)
        //     if (tag == null) {
        //         createTag(tagName);
        //     }
        //     else {
        //         addTagToRecipe(tag);
        //     }
        //     $scope.tagName = "";
        // };
        // //End functions to save tags.

        // //Removes the tag from the recipe when the tag's button is clicked //
        // $scope.removeTag = function (tag) {
        //     if (tag.justAdded) {
        //         //DELETE from server
        //         Restangular.one('tags', tag.id).customDELETE();
        //         //DELETE from $scope.tags
        //         var tagIndex = $scope.tags.indexOf(tag);
        //         $scope.tags.splice(tagIndex, 1);
        //     }
        //     //DELETE from $scope.recipe.tags
        //     tagIndex = $scope.recipe.tags.indexOf(tag);
        //     $scope.recipe.tags.splice(tagIndex, 1);

        //     $scope.tagName = tag.name;
        //     document.getElementById('tag-input').focus();
        // };
        // //End functions to delete tags.

        // //Functions to save ingredients.
        // $scope.saveIngredient = function (ingredientName) {
        //     console.log('Add ingredient button clicked.' +
        //         'User typed' + ingredientName);


        //     //Get ingredient if it already exists.
        //     var ingredient = getIngredientFromName(ingredientName);
        //     //Create the ingredient if it doesn't exist.
        //     if (ingredient == null) {
        //         createIngredient(ingredientName);
        //         console.log("You typed a new ingredient!");
        //     }
        //     //Add the newly found ingredient to the recipe.
        //     else {
        //         addIngredientToRecipe(ingredient);
        //         console.log("That ingredient already exists!");
        //     }
        //     //clear the input box.
        //     $scope.getIngredientName = '';
        // }

        // var addIngredientToRecipe = function (ingredient) {
        //     if ($scope.recipe.ingredients.indexOf(ingredient) == -1) {
        //         $scope.recipe.ingredients.push(ingredient);
        //     }
        // }
        // //new ingredient object that calls the name and glycemic index.
        // var createIngredient = function (name) {
        //     var ingredient = { name: name, glycemic_index: $scope.glycemicIndex};

        //     Restangular.all('ingredients').customPOST(ingredient).then(function (data) {
        //         addIngredientToRecipe(data);
        //     })
        // }

        // var getIngredientFromName = function (name) {
        //     for (var i = 0; i < $scope.ingredients.length; i++) {
        //         var ingredient = $scope.ingredients[i];
        //         if (ingredient.name == name) {
        //             return ingredient;
        //         }
        //     }

        //     return null;
        // }
    }]);
"use strict";

function HomeCtrl($http, $scope, $window) {
	$http.get('resource/homepage.txt').success(function (data) {
		$scope.content = data;
	});
}

function ContactCtrl($http, $scope, $window) {
	$http.get('resource/contact-details.json').success(function (data) {
		$scope.contactList = data;
	});
	
}

function AboutCtrl($http, $scope, $window) {
	/*$http.get('resource/about.json').success(function (data) {
		$scope.pageData = data;
	});*/
}

function BlogCtrl($http, $scope, $window) {
	$http.get('/posts.json').success(function (data) {
		$scope.posts = data;
	});
}

function PostCtrl($http, $routeParams, $scope) {
	$http.post("/blogposts.json", {title: $routeParams.postId}).success(function (data) {
		$scope.blogPost = data;
	});
}

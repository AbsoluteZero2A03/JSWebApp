angular.module('sitesite', ['ngSanitize']).
	config(["$routeProvider", function($routeProvider) {
		$routeProvider.
			when('/home', {templateUrl: 'html/home.html', controller: HomeCtrl}).
			when('/contact', {templateUrl: 'html/contact.html', controller: ContactCtrl}).
			when('/about', {templateUrl: 'html/about.html', controller: AboutCtrl}).
			when('/blog', {templateUrl: 'html/blog.html', controller: BlogCtrl}).
			when('/blog/:postId', {templateUrl: 'html/post.html', controller: PostCtrl}).
			otherwise({redirectTo: '/home'});
	}]);

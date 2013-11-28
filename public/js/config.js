//Setting up route
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/contests', {
            templateUrl: 'views/contests/index.html'
        }).
        when('/contests/leaderboard', {
            templateUrl: 'views/contests/leaderboard.html'
        }).
        when('/contests/register', {
            templateUrl: 'views/contests/register.html'
        }).
        when('/problems', {
            templateUrl: 'views/problems.html'
        }).
        when('/faq', {
            templateUrl: 'views/faq.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);
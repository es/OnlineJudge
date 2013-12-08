//Setting up route
app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.
        /*when('/articles', {
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
        }).*/
        
        // Not ready to implement contests, first comes problems
        /*when('/contests/leaderboard', {
            templateUrl: '/views/contests/leaderboard.html'
        }).
        when('/contests/register', {
            templateUrl: '/views/contests/register.html'
        }).
        when('/contests', {
            templateUrl: '/views/contests/index.html'
        }).*/
        when('/problems/leaderboard', {
            templateUrl: '/views/problems/leaderboard.html'
        }).
        when('/problems/create', {
            templateUrl: '/views/problems/create.html'
        }).
        when('/problems', {
            templateUrl: '/views/problems/problems.html'
        }).
        when('/help', {
            templateUrl: '/views/help.html'
        }).
        when('/signup', {
            templateUrl: '/views/sign-up.html'
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
        $locationProvider.html5Mode(true);
        //$locationProvider.hashPrefix("!");
    }
]);
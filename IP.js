angular.module('app').factory('client', function($http, $q) {	
	var deffered = $q.defer();
	var data = [];  
	var client = {};

	// pega o ip
	client.async = function() {
		$http({
			method: 'POST', 
			url: 'modules/ip.php'
		})

		.then(function callbackSuccess(res) { 
			data = res.data;
			deffered.resolve();
		});
		
		return deffered.promise;
	};

	client.data = function() { return data };
	return client;
});
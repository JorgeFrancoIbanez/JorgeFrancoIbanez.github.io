'use strict';
yapp.factory('loginService', function($http, $location,  sessionService){
	var sesionName; //save key value for sessions
	var sesionToken; //save key value for sessions
	var sesionType; //save key value for sessions
	return{
		login:function(data,scope){
			scope.data = {};
			var $promise=$http.post('http://172.16.8.31:8082/token',data).then(function(msg){
				console.log(msg);
				console.log(msg.data.type);
				var uid=msg.data.token;
				var uty=msg.data.type;
				if(uid){
					sessionService.set('user',data.username);
					sessionService.set('token',uid);
					sessionService.set('type',uty);
					sesionName = data.username;
					sesionToken  = uid;
					sesionType  = uty;
					scope.msgtxt='Datos del profesor correctos';
					Materialize.toast(scope.msgtxt, 5000,'rounded');
					$location.path('/home');
				}	       			   
			}).catch(function(){scope.msgtxt='Datos del profesor incorrectos';
					Materialize.toast(scope.msgtxt, 5000,'rounded');});
		},
		logout:function(){
			sessionService.destroy('user');
			sessionService.destroy('token');
			sessionService.destroy('type');
			$location.path('/login');
		},
		islogged:function(){
			var $checkSessionServer=$http.post('http://172.16.8.31:8082/token');
//			var $checkSessionServer=$http.post('https://utbweb.co/token');
			return $checkSessionServer;
		
		/*	if(sessionService.get('user')) return true;
			else return false;
		*/	
		}
	}

});




const { Router } = require('express');

const StatService = require('@app/services/stats');

const route = Router();

function errMessage(err){
	return	{
		    	errors: {
		    		message: err.message || 'unknown'
		    	}
		 	}
}

module.exports = async function(routes) {
	routes.use('/users/:id/stats', route);


	
	// ritorna la lista di tutti gli utanti
	// esempio: [{"user_id":1,"name":"luca","password":"123123"}]
	route.get('/', async (req, res) => {
		StatService.getStats()
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(err.status||500)
				   .json(errMessage(err));
			});
	});







};

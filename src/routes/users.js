const { Router } = require('express');

const UserService = require('@app/services/users');

const route = Router();

module.exports = async function(routes) {
	routes.use('/users', route);


	
	// ritorna la lista di tutti gli utanti
	// esempio: [{"user_id":1,"name":"luca","password":"123123"}]
	route.get('/', async (req, res) => {
		const users = await UserService.getAll();
		res.status(200).json(users);
	});


/*
il codice viene un po' brutto con i try catch....
forse è meglio usare .then .catch

*/

	// aggiunge un utente
	route.post('/', async (req, res) => {
		try{
			await UserService.create(req.body)
			res.status(200).json({
				message:'ok'
			});
		}catch (err){
			res.status(err.status || 500);
		    res.json({
		      errors: {
		        message: err.message
		      }
		    });
		}
	});
};

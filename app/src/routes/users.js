const { Router } = require('express');
const auth = require('./middlewares/auth');
const service = require('@app/services/users');
const route = Router();
const user = require('../models/user');

module.exports = async function(routes) {
	routes.use('/users', route);

	/**
		* Route to retrieve data of all users
		* Request format:
		* /PUT : users/
	*/
	route.get('/', async (req, res) => {
		await user.getAll()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((error) => {
			res.status(400).json(error);
		})
	});

		/**
		* Route to retrieve data of a specific user
		* Request format:
		* /PUT : users/:id
		* @param {User ID} id
	*/
	route.get('/:id', async (req,res) => {
		await user.getUser(req.params.id)
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((error) => {
			res.status(400).json(error);
		})
	});

	/**
		* Route to update a specific user data
		* Request format:
		* /POST : users/
    * JSON = {
		*		"userID" 		: <id>,
		*		"name" 			: <text>,
		*		"surname" 	: <text>,
		*		"gender" 		: <char>,
		*		"activity"  : <char>,
		*		"weight"   	: <number>,
		*		"height"		: <number>
		* }
	*/
	route.post('/',auth.userAuth, async (req,res) => {
		await service.modifyUser(req.body.userId,req.body.name,req.body.surname,req.body.gender,req.body.activty,req.body.weight,req.body.height)
		.then((result) => {
			res.status(200).send(result);
			res.end();
			})
		.catch((error) => {
			res.status(400).send(error);
			res.end();
			});
	});

	/**
		* Route to create a new user in the system.
		* Request format:
		* /PUT : users/
		* JSON = {
		*		"name" : <name>,
		*		"birth_date" : <date yyyy-MM-dd>
		* }
  */
	route.put('/', async (req, res) => {
		await service.createUser(req.body)
		.then((result) => {
			res.status(200).json({
				message:'User Created succesfully.'
			});
		})
		.catch((error) => {
			res.status(200).json({
				errors: {
					message : error.message
				}
			});
		})
	});
};

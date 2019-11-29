const { Router } = require('express');

const UserService = require('@app/services/users');

const route = Router();

const user = require('../models/user');

module.exports = async function(routes) {
	routes.use('/users', route);

	// GET Route that returns all Users
	route.get('/', async (req, res) => {
		await user.getAll()
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((error) => {
			res.status(400).json(error);
		})
	});

	// GET Route that returns one specific User
	route.get('/:id',async (req,res) => {
		await user.getUser(req.params.id)
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((error) => {
			res.status(400).json(error);
		})
	});

	// POST Route that inserts a new User
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

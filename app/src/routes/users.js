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
	route.get('/:id', async (req,res) => {
		await user.getUser(req.params.id)
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((error) => {
			res.status(400).json(error);
		})
	});

	// POST Route to modify weight of specific User
	route.post('/:id/weight/:weight', async (req,res) => {
		await UserService.changeUserWeight(req.params.id,req.params.weight)
		.then((result) => {
			res.status(200).json({
				message:'ok'
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

	// POST Route to modify height of specific User
	route.post('/:id/height/:height', async (req,res) => {
		await UserService.changeUserHeight(req.params.id,req.params.height)
		.then((result) => {
			res.status(200).json({
				message:'ok'
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

	// POST Route to modify gender of specific User
	route.post('/:id/gender/:gender',async (req,res) =>{
		await UserService.changeUserGender(req.params.id,req.params.gender)
		.then((result) => {
			res.status(200).json({
				message:'ok'
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

	// POST Route to modify exercise activity level of specific User
	route.post('/:id/activity/:activity',async (req,res) =>{
		await UserService.changeUserActivityLevel(req.params.id,req.params.activity)
		.then((result) => {
			res.status(200).json({
				message:'ok'
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

	// POST Route that inserts a new User
	route.post('/', async (req, res) => {
		console.log(req.body);
		console.log(req.params);
		try{
			await UserService.createUser(req.body)
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

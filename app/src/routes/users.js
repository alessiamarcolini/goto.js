const { Router } = require('express');

const UserService = require('@app/services/users');

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
		* Route to update weight data of a specific user
		* Request format:
		* /POST : users/:id/weight/:weight
		* @param {User ID} id
		* @param {Weight} weight
	*/
	route.post('/:id/weight/:weight', async (req,res) => {
		await UserService.changeUserWeight(req.params.id,req.params.weight)
		.then((result) => {
			res.status(200).json({
				message:'Weight modified succesfully.'
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

	/**
		* Route to update height data of a specific user
		* Request format:
		* /POST : users/:id/height/:height
		* @param {User ID} id
		* @param {Height} height
	*/
	route.post('/:id/height/:height', async (req,res) => {
		await UserService.changeUserHeight(req.params.id,req.params.height)
		.then((result) => {
			res.status(200).json({
				message:'Height modified succesfully.'
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

	/**
		* Route to update gender data of a specific user
		* Request format:
		* /POST : users/:id/gender/:gender
		* @param {User ID} id
		* @param {Gender} gender
	*/
	route.post('/:id/gender/:gender',async (req,res) =>{
		await UserService.changeUserGender(req.params.id,req.params.gender)
		.then((result) => {
			res.status(200).json({
				message:'Gender modified succesfully.'
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

	/**
		* Route to update activity level data of a specific user
		* Request format:
		* /POST : users/:id/activity/:activity
		* @param {User ID} id
		* @param {Activity Level} activity
	*/
	route.post('/:id/activity/:activity',async (req,res) =>{
		await UserService.changeUserActivityLevel(req.params.id,req.params.activity)
		.then((result) => {
			res.status(200).json({
				message:'Activity Level modified succesfully.'
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

	/**
		* Route to update name data of a specific user
		* Request format:
		* /POST : users/:id/name/:name
		* @param {User ID} id
		* @param {Name} name
	*/
	route.post('/:id/name/:name',async (req,res) =>{
		await user.changeUsername(req.params.id,req.params.name)
		.then((result) => {
			res.status(200).json({
				message:'Name modified succesfully.'
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

	/**
		* Route to update surname data of a specific user
		* Request format:
		* /POST : users/:id/surname/:surname
		* @param {User ID} id
		* @param {Surname} surname
	*/
	route.post('/:id/surname/:surname',async (req,res) =>{
		await user.changeUsersurname(req.params.id,req.params.surname)
		.then((result) => {
			res.status(200).json({
				message:'Surname modified succesfully.'
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
		await UserService.createUser(req.body)
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

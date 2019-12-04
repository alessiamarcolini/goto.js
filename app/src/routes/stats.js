const { Router } = require('express');
const StatService = require('@app/services/stats');
//const auth = require('middleware/auth');

const route = Router();

function errMessage(err){
	return	{
		    	errors: {
		    		message: err.message || 'unknown'
		    	}
		 	}
}

module.exports = async function(routes) {
	routes.use('/users', route);


	//middleware to check if a user exists (implementato da moreno)
	//routes.use('/:id', auth.userAuth);

	/* returns every stats
	* 	{
    *    	caloriesToEat: calories['caloriesToEat'],
    *    	caloriesEaten: calories['caloriesEaten'],
    *    	lastWeights:weight['lastWeights'],
    *    	idealWeight:weight['idealWeight'],
    *    	waterToDrink:water['waterToDrink'],
    *  	  	waterDrunk:water['waterDrunk']
    * 	 }
	*/
	route.get('/:id/stats/', async (req, res) => {
		StatService.getStats(req.params.id)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});

	/* returns stats on daily intake of calories
	* 	{
	*		caloriesToEat:needed,
	*		caloriesEaten:tot
	* 	}
	*/
	route.get('/:id/stats/calories', async (req, res) => {
		StatService.todayCalories(req.params.id)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});


	/* returns how much you have drunk today
	*	{
	*		waterToDrink:toDrink,
	*		waterDrunk:tot
	*	}
	*/
	route.get('/:id/stats/water', async (req, res) => {
		StatService.todayWater(req.params.id)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});


	/*returns stats on your weight
	*	{
	*		lastWeights:weigths, 
	*		idealWeight:iWeight
	*	}
	*/
	route.get('/:id/stats/weight', async (req, res) => {
		StatService.weightStats(req.params.id)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});

};

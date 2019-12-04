const { Router } = require('express');
const StatService = require('@app/services/stats');
//const auth = require('middleware/auth');

const route = Router();

function errMessage(err){
	return	{
		    	errors: {
		    		message: err.message || 'unknown error'
		    	}
		 	}
}

module.exports = async function(routes) {
	routes.use('/users', route);


	//middleware to check if a user exists (implementato da moreno)
	//routes.use('/:userId', auth.userAuth);

	/* returns every stats
	* 	{
    *    	caloriesToEat: <int>,
    *    	caloriesEaten: <int>,
    *    	lastWeights:   <real>,
    *    	idealWeight:   <real>,
    *    	waterToDrink:  <int>,
    *  	  	waterDrunk:    <int>
    * 	 }
	*/
	route.get('/:id/stats/', async (req, res) => {
		await StatService.getStats(req.params.id)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});

	/* returns stats on daily intake of calories
	* 	{
	*		caloriesToEat: <int>,
	*		caloriesEaten: <int>
	* 	}
	*/
	route.get('/:id/stats/calories', async (req, res) => {
		await StatService.todayCalories(req.params.id)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});


	/* returns how much you have drunk today
	*	{
	*		waterToDrink: <int>,
	*		waterDrunk:   <int>
	*	}
	*/
	route.get('/:id/stats/water', async (req, res) => {
		await StatService.todayWater(req.params.id)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});


	/*returns stats on your weight
	*	{
	*		lastWeights:  <real>, 
	*		idealWeight:  <real>
	*	}
	*/
	route.get('/:id/stats/weight', async (req, res) => {
		await StatService.weightStats(req.params.id)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});

};

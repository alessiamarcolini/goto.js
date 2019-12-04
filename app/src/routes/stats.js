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
    *    	...
    * 	}
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

	/* returns your ideal weight IBM
	* 	{
	*		idealWeight: <real>
	* 	}
	*/
	route.get('/:id/stats/idealWeight', async (req, res) => {
		await StatService.idealWeight(req.params.id)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});





	/*returns a linear prediction of your weight in a month time
	*	{
	*		MonthlyWeightPrediction:  <real>, 
	*	}
	*/
	route.get('/:id/stats/weightPrediction', async (req, res) => {
		await StatService.weightPrediction(req.params.id)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});

	/*returns how much calories you_have_taken less you_had_to_take in the last week
	*	{
	*		caloriesTrending:  [couples(day)], 
	*	}
	*/
	route.get('/:id/stats/caloriesTrending', async (req, res) => {
		await StatService.caloriesTrending(req.params.id)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});

	/*returns your weights in the last week
	*	{
	*		weightTrending:  [couples(weight,day)  of the last 7 days], 
	*	}
	*/
	route.get('/:id/stats/weightTrending', async (req, res) => {
		await StatService.weightTrending(req.params.id)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});


	/*returns how much calories you_have_taken less you_had_to_take in the last DAYS
	*	{
	*		caloriesTrending:  [couples(day, if you have eaten more or less) of the last DAYS days], 
	*	}
	*/
	route.get('/:id/stats/caloriesTrending/:days', async (req, res) => {
		await StatService.caloriesTrending(req.params.id, req.params.days)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});

	/*returns your weights in the last DAYS
	*	{
	*		weightTrending:  [couples(weight,day)  of the last DAYS days], 
	*	}
	*/
	route.get('/:id/stats/weightTrending/:days', async (req, res) => {
		await StatService.weightTrending(req.params.id, req.params.days)
			.then((stats) => {res.status(200).json(stats);})
			.catch((err)=> {
				res.status(400)
				   .json(errMessage(err))
				   .end();
			});
	});

};

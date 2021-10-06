import { Context, Callback, Handler } from 'aws-lambda';

export const run: Handler = async (event: any, context: Context, callback: Callback) => {

	console.log('Function name: ', context.functionName)
	console.log('Remaining time: ', context.getRemainingTimeInMillis())
	
	context.callbackWaitsForEmptyEventLoop = false;

	// -------------------------------------------------------------------
};



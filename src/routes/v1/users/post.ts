import { Handler, Context, Callback } from "aws-lambda";
import { createUser } from "../../../model/user"

export const run: Handler = async (event, context: Context, callback: Callback) => {
	console.log('Function name: ', context.functionName)
	console.log('Remaining time: ', context.getRemainingTimeInMillis())
	
	context.callbackWaitsForEmptyEventLoop = false;

	// -------------------------------------------------------------------
    return await createUser(event);
    
};



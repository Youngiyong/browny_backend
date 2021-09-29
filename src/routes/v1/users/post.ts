import { Handler, Context, Callback } from "aws-lambda";
import { createUser } from "../../../model/user"
import 'aws-sdk';
import 'typeorm';
import 'pg';
export const run: Handler = async (event, context: Context, callback: Callback) => {
    console.log("?")

	console.log('Function name: ', context.functionName)
	console.log('Remaining time: ', context.getRemainingTimeInMillis())
	
	context.callbackWaitsForEmptyEventLoop = false;

	// -------------------------------------------------------------------
    return await createUser(event);
    
};



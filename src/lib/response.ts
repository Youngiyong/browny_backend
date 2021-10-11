
export const BrownyMsgResponse = (statusCode: number, msg: string) =>{
    return {
        statusCode: statusCode,
        body: JSON.stringify({ msg : msg }),
    }
}


export const BrownyCreateResponse = (statusCode: number, data: {}) =>{
    return {
        statusCode: statusCode,
        body: JSON.stringify({ data : data }),
    }
}

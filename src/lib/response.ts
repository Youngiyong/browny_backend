
export const DeplMsgResponse = (statusCode: number, msg: string) =>{
    return {
        statusCode: statusCode,
        body: JSON.stringify({ msg : msg }),
    }
}


export const DeplResponse = (statusCode: number, data: {}) =>{
    return {
        statusCode: statusCode,
        body: JSON.stringify({ data : data }),
    }
}

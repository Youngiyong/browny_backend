import AWS from 'aws-sdk';
import {v4 as uuidv4} from 'uuid';
import { updateProfileThumnail } from '../model/user';

const s3 = new AWS.S3({
    region: 'ap-northeast-2',
    accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY
});

const s3_bucket = process.env.S3_BUCKET

export const generateUploadPath = ({
    user_id,
    folder
  }: {
    user_id: string;
    folder: string;
  }) => {
    return `${folder}/images/${user_id}`;
};

export const generateCommonUploadPath = (folder: string) => {
    return `${folder}/images/${uuidv4()}`;
};


export const uploadProfileImage = async (folder: string, user_id: string, event: any) => {

    // generate s3 path
    const uploadPath = generateUploadPath({user_id, folder})+"/"+"thumnail.png"
    await s3.upload({
        Bucket: s3_bucket,
        ACL: 'public-read',
        Key: uploadPath,
        Body: event.image.content,
        ContentType: event.image.contentType
    })
    .promise();

    await updateProfileThumnail(user_id, uploadPath);

    return {
        statusCode: 200,
        body: JSON.stringify({ data : { image : `https://s3.ap-northeast-2.amazonaws.com/cdn.browny.io/${uploadPath}` } })
    };
}


export const uploadQnaImage = async (folder: string, event: any) => {
    // generate s3 path
    const uploadPath = generateCommonUploadPath(folder)+"/" + event.image.filename
    console.log("???",uploadPath)
    await s3.upload({
        Bucket: s3_bucket,
        ACL: 'public-read',
        Key: uploadPath,
        Body: event.image.content,
        ContentType: event.image.contentType
    })
    .promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ data : { image : `https://s3.ap-northeast-2.amazonaws.com/cdn.browny.io/${uploadPath}` } })
    };
}


export const uploadImage = async (folder: string, user_id: string, event: any) => {
    switch(folder){
        case 'profile':
            return await uploadProfileImage(folder, user_id, event)
        case 'post':
            return 'post';
        case 'blog':
            return 'blog';
        case 'qna':
            return await uploadQnaImage(folder, event)
        default : 
            throw new Error("Invalid folder name")
    }
}
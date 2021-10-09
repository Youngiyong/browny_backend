import AWS from 'aws-sdk';
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

export const uploadImage = (folder: string, user_id: string, event: any) => {
    const params = {
        Bucket:  s3_bucket,
        Key: generateUploadPath({user_id, folder}),
        Body: event.body
    }
    console.log(params)
    return new Promise((resolve, reject) => {
        s3.upload(params, function(err, data) {
          
          if (err) {
            console.log("err",err)
            return reject(err);
          }
          
          return resolve(data);
        });
      });
}
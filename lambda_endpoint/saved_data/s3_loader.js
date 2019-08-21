
var AWSS3 = require('aws-sdk/clients/s3');
const CONTENT_INDEX_FILENAME = 'data_user.json';
var aws_s3 = new AWSS3();

//-------------------------------------------------------------------------
// s3 loader template builder
// TODO: currently not used 
// uses user_data.json file in bucket list 
// Info: store is working, load is untested
//-------------------------------------------------------------------------
module.exports = {
    
    S3_load_data: function(event) { 

        // Get existing data
        let existing = aws_s3.getObject({
          Bucket: 'robogenchatbots',
          Key: CONTENT_INDEX_FILENAME
        }).promise();
        
        return JSON.parse(existing.Body);
    },
    
    S3_store_data: function(dataUserInfos) { 
    	
    	// store object
        aws_s3.putObject({
            Bucket: 'robogenchatbots',
            Key: CONTENT_INDEX_FILENAME,
            Body: JSON.stringify(dataUserInfos)})
            .promise()
            .then( () => console.log("succesfully saved to S3 bucket"))
            .catch( e => {
               console.log("exception when trying to write to S3 bucket: " + e.toString())
            } );
        }
};
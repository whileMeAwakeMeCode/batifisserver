const utils = require('./utils')

let s3 = {}

const setS3 = (_s3) => {
    s3 = _s3
}


/**
 * @dev Call any S3 method using process.env.S3_APP_BUCKET
 * @param action (string): the name of the s3 method to call (ex.: getObject, putObject, ...)
 * @param subBucket (string): the name of the sub bucket to use (MUST BE LOWERCASE)
 * @param Body {object} *optional*: a body for POST types requests
 * @param returnKey *optional*: if true, returns an object { key, data }
 * @param returnParsedBody *optional* if true, returns a parsed object from data.Body.toString() where 'data' is the s3 response
 * @param emptyBucketFailsafe *optional* (USE ONLY WITH on GET requests) : failsafe object to return if operation is a success but the subBucket is empty
 */
const bucketActions = ({action, subBucket, Body, returnKey, returnParsedBody, emptyBucketFailsafe}) => {
    return new Promise(async(resolve, reject) => {
        
        const Body_ = await Promise.resolve(Body ? {Body : (utils.isJSON(Body) ? Body : JSON.stringify(Body))} : {})

        // S3 params
        let params = await Promise.resolve({
            Bucket : process.env.S3_APP_BUCKET,
            Key : subBucket, // 'CHANGEDEMAILS/'+process.env.CHANGEDMAILS_SECRET
            ...Body_
        })

        try {
            s3[action](params, async(err, data) => { // s3.getObject(...)
                
                if (err) {
                    
                    if (err.code === "NoSuchKey") {
                        console.warn(` ---> bucketActions -> s3[${action}] ERROR code "noSuchKey". resolving`, emptyBucketFailsafe)
                        resolve(emptyBucketFailsafe || {})
                    } else {
                        console.error('db getChangedEmails S3.getObject ERROR', err)
                        reject(err)
                    }
                } else {
                    const result = await Promise.resolve((data && data.Body && data.Body.toString()) || emptyBucketFailsafe || '{}')
                    const parsedBody = await Promise.resolve(utils.isJSON(result) ? JSON.parse(result) : result)
                    const data_ = await Promise.resolve(returnParsedBody ? parsedBody : data)

                    resolve(
                        
                        returnKey
                        ? {data: data_, key: params.Key}
                        : data_
                        
                    );
                }
                
            });
        } catch(err) {
            console.error(` ---> bucketActions ${action} ERROR`, err);
            resolve({})
        }
        //res(list);
    })
}

const getPhotos = async() => {

    const photos = await bucketActions({
        action: 'getObject',
        subBucket: 'batifis_categorized_photos',
        emptyBucketFailsafe: [],
        returnParsedBody: true
    })

    //console.log(' ---> getPhotos photos', photos)

    return utils.ofType(photos) === 'array' ? photos : [photos]
}

module.exports = {
    bucketActions,
    getPhotos,
    setS3
}

/**
 * @dev Batifis Server
 * @dev logs color code :
 *  # green : compiler messages
 *  # blue : server computation message
 *  # magenta : requests information
 *  # yellow : warning message
 *  # red : error message
 */

/* ========================================================[ I M P O R T S ]======================================================== */
// packages modules
const Env = require('dotenv').config() 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const addRequestId = require('express-request-id')();
const cors = require('cors')

// internal modules
const { requestInfo, noFavicon, setDefaultHeaders } = require('./middlewares')
const {fileUploadHandler, fileRemovalHandler, login} = require('./handlers')
const {getPhotos, setS3, bucketActions} = require('./api')
const log = require('./utils').log


/* ========================================================[ C O N F I G S ]======================================================== */
const port = process.env.PORT || 3001

aws.config.update({
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,  
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID, 
    region:process.env.S3_REGION        
})

const s3 = new aws.S3();

setS3(s3)

const upload = multer({
    storage:multerS3({
        s3,
        bucket:process.env.S3_IMAGES_BUCKET,    
        contentType:multerS3.AUTO_CONTENT_TYPE,
        acl:'public-read',
        metadata:function(req,file,callback){callback(null,{fieldName:file.fieldname})},
        key:function(req,file,callback){callback(null,'batifis_img_'+Date.now())},
    }),
    limits: { fieldSize: 25 * 1024 * 1024 }
});


/* ========================================================[ M I D D L E W A R E S ]======================================================== */
/// reject favicon bots requests ///
app.use(noFavicon)

/// enable CORS ///
app.use(cors());

/// set default headers ///
app.use(setDefaultHeaders)

/// Body Parser ///
app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({
    parameterlimit:100000,
    limit:'50Mb',
    extended:true
}))

/// request id ///
app.use(addRequestId)

/// request info ///
app.use(requestInfo)


/* ========================================================[ ROUTES ]======================================================== */
app.post('/upload', upload.array('fileData'), fileUploadHandler)

app.post('/remove', fileRemovalHandler)

app.post('/login', login)

app.get('/photos', async(req, res) => {
    const photos = await getPhotos()
    res.status(200).send(photos)
})

app.get('/test', async(req, res) => {
    try {
        const resp = await bucketActions({
            action: 'deleteObject',
            subBucket: 'batifis_categorized_photos',
        })
    
        res.status(200).send(resp)
    }catch(e) {
        log(`\n*** TEST ERROR ***\n${e}`, 'red')
        res.status(500).send(e)
    }
})

app.all('*', (req, res) => {
    log(`ERROR 404 : page not found`, "yellow")
    res.status(404).send("Oups! Il n'y a rien ici")
})


/* ========================================================[ START UP ]======================================================== */
app.listen(port,function(){
    log(`*\n=== Batifis Server running on port ${port} ===\n*`, "blue")
}) 
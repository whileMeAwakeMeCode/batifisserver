const {bucketActions, getPhotos} = require('./api')
const utils = require('./utils')
const subBucket = 'batifis_categorized_photos';
const codes = require('./status_codes')



module.exports.fileUploadHandler = async(req, res) => {
    //console.log('fileUploadHandler files', req.files)
    if (req.files.length) {
        try {
            let imageDatas = JSON.parse(req.body.imageDatas)
            console.log('fileUploadHandler req.body.imageDatas', imageDatas)

            // build an array of {source, categories, name}
            const _newCategorizedPhotos = await Promise.resolve(
                req.files.map(async(file) => {
                    //console.log('file', file)
                   
                    const _imgDta = await Promise.resolve(
                        imageDatas.filter((idta) => idta.name === file.originalname)
                    )

                    const imgDta = await Promise.resolve(_imgDta[0])
                    const dta = await Promise.resolve({
                        ...imgDta,
                        source: file.location
                    })

                    console.log('dta', dta)

                    return dta
                })
            )

            const newCategorizedPhotos = await Promise.all(_newCategorizedPhotos)

            console.log(` === NEW CATEGORIZED PHOTOS === `, newCategorizedPhotos)
            
            // get current list
            let _categorizedPhotos = await getPhotos()
            //console.log(' ---> getPhotos response (_categorizedPhotos)', _categorizedPhotos)
            // update list
            const categorizedPhotos = await Promise.resolve([..._categorizedPhotos, ...newCategorizedPhotos])
            console.log('*STORING*', categorizedPhotos)
            // store updated list
            const awsResponse = await bucketActions({
                action: 'putObject',
                subBucket,
                Body: categorizedPhotos,
                returnKey: true
            })

            const {key, data} = awsResponse
            console.log(' ---> bucketActions response', awsResponse)

            // return operation success
            const success = await Promise.resolve(data && (key===subBucket))
            res.status(success ? codes.success.ok : codes.clientError.conflict).send(success ? categorizedPhotos : 'conflict') // 409: conflict

        }catch(e) {
            console.log('fileUploadHandler internal server error :', e)
            res.status(codes.serverError.internalServerError).send({error:"Le serveur a rencontré une erreur, veuillez réessayer"}) // bad request
        }
    } else res.status(codes.clientError.badRequest).send({error:"Le serveur n'a pas reçu de fichier à enregistrer"}) // bad request
}


module.exports.fileRemovalHandler = async(req, res) => {
    utils.log(JSON.stringify({body: req.body}, null, 3), 'magenta')
    const {source} = req.body;

    if (source) {

        // remove from list
        const photos = await getPhotos()
        const updatedList = await Promise.resolve(
            photos.filter((p) => p.source !== source)
        )
        const awsResponse = await bucketActions({
            action: 'putObject',
            subBucket,
            Body: updatedList,
            returnKey: true
        })

        const {key, data} = awsResponse

        // return operation success
        const response = await Promise.resolve(data && (key===subBucket) && updatedList);
        response && utils.log(`fileRemovalHandler -> successfully removed source ${source}`, 'green');

        
        res.status(codes.success.ok).send(response);

    } else {
        utils.log('Error : fileRemovalHandler -> missing source', 'red')
        res
        .status(codes.clientError.expectationFailed)            // Expectation failed
        .send()          
    }
}

/**
 * @dev log user
 * @param {object} req.body { hash }
 * @return {object} { connected }
 */
module.exports.login = async(req, res) => {
    const {hash} = req.body

    const connected = await Promise.resolve(
        hash && hash === process.env.ADMIN_HASH_KEY
    )
    
    const status = await Promise.resolve(connected ? codes.success.ok : codes.clientError.unauthorized)

    utils.log(`[POST][LOGIN]:${JSON.stringify({status, connected})}`, connected ? "blue": "yellow")

    res
    .status(status)            // unauth user
    .send({connected})      
    
}
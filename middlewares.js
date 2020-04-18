const log = require('./utils').log
const moment = require('moment')

module.exports = {
    requestInfo : (req, res, next) => {
        log(`[${moment(Date.now()).format('LLLL')}] [${req.method}] [${req.path}] [${req.hostname}] [${req.id}]`, "magenta")
        next()
    },

    noFavicon : (req,res,next)=>{
        if(req.originalUrl === '/favicon.ico'){
            res.status(204).json({nope:true});
        }else{
            next();
        }
    },

    setDefaultHeaders : (req, res, next) => {
        res.header('Access-Control-Allow-Origin', "*"); 
        res.header('Access-Control-Allow-Headers', "Content-Type, X-Requested-With, Origin, Accept");
        next()
    },

}
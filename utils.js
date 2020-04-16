const logColors = {
    green : "32",
    red: "31",
    yellow: "33",
    blue: "36",
    magenta: "35"
}
// module used to log a msg in color /!\ only one param : just a string msg is passed to console.log /!\
module.exports.log = (msg, color) => console.log(`\x1b[${logColors[color||"red"]}m%s\x1b[0m`, msg)  //cyan
module.exports.isJSON = (supJSON) => {
    try {
        let json = JSON.parse(supJSON) 
        return json

    } catch(err) {
        return(false)
    }
}
module.exports.ofType = (elem) => {
    return(
        ((_e) => {

            let t = typeof _e 
            //console.log('\n- ofType receives -\n_e: %s\ntypeof _e: %s\n', _e, t)
            if (!_e) 
                return 'undefined' 

            else if (t === 'object') 
                return typeof _e.length !== 'undefined' ? 'array' : 'object'

            else return t

        })(elem)
    )
}
 
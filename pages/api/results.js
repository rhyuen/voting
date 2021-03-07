const Poll = require("./models/poll.js");
const handleDB = require("./mw/db.js");
const handleObs = require("./mw/obs.js");

async function handler(req, res){
    try{       
        const result = await Poll.find({});
        console.log(result);
        return res.status(200).json({
            path: "[GET] Results Endpoint",
            payload: result
        });
    }catch(e){
        return res.status(400).json({
            details: e
        });
    }
}


module.exports = handleObs(handleDB(handler));
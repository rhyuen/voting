const Poll = require("./models/poll.js");
const handleDB = require("./mw/db.js");
const handleObs = require("./mw/obs.js");
const {getSession} = require("@auth0/nextjs-auth0");

async function handler(req, res){
    try{       
        const result = await Poll.find({});
        const {user} = getSession(req, res);
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


module.exports = withApiAuthRequired(handleObs(handleDB(handler)));
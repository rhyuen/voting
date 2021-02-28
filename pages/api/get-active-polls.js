const Vote = require("./models/vote.js");
const handleObs = require("./mw/obs.js");
const handleDB = require("./mw/db.js");

async function handler(req, res){
    try{
        const activeVotes = await Vote.find({});
        return res.status(200).json({
            path: "results end point",
            payload: activeVotes
        });
    }catch(e){
        return res.status(400).json({
            details: e
        });
    }
}


module.exports = handleObs(handleDB(handler));
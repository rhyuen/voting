const {withApiAuthRequired, getSession} = require("@auth0/nextjs-auth0");
const Poll = require("./models/poll.js");
const handleObs = require("./mw/obs.js");
const handleDB = require("./mw/db.js");

async function handler(req, res){
    try{
        const {user} = getSession(req, res);

        const activePolls = await Poll.find({});
        return res.status(200).json({
            path: "results end point",
            payload: activePolls,
            authed: user
        });
    }catch(e){
        return res.status(400).json({
            details: e
        });
    }
}


module.exports = withApiAuthRequired(handleObs(handleDB(handler)));
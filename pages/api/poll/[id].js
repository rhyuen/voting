const Poll = require("../models/poll.js");
const handleDB = require("../mw/db.js");
const handleObs = require("../mw/obs.js");
const validator = require("validator");
const {withApiAuthRequired, getSession} = require("@auth0/nextjs-auth0");

async function handler(req, res){
    
    try{
        const {id} = req.query;
        const escID = validator.escape(id);
        const result = await Poll.find({_id: escID});

        const {user} = getSession(req, res);
               
        return res.status(200).json({
            path: "results end point",            
            data: result,
            authed: user
        });
    }catch(e){
        return res.status(400).json({
            details: e
        });
    }
}


module.exports = withApiAuthRequired(handleObs(handleDB(handler)));
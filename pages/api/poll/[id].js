const Vote = require("../models/vote.js");
const handleDB = require("../mw/db.js");
const handleObs = require("../mw/obs.js");
const validator = require("validator");

async function handler(req, res){
    
    try{
        const {id} = req.query;
        const escID = validator.escape(id);
        const result = await Vote.find({_id: escID});
        
        return res.status(200).json({
            path: "results end point",
            data: result
        });
    }catch(e){
        return res.status(400).json({
            details: e
        });
    }
}


module.exports = handleObs(handleDB(handler));
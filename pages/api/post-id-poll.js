const Vote = require("./models/vote.js");
const handleDB = require("./mw/db.js");
const handleObs = require("./mw/obs.js");
const validator = require("validator");

async function handler(req, res){
    
    try{
        if(req.method !== "POST"){
            return res.status(400).json({
                details: "only POSTS are allowed at this endpoint."
            });     
        }
                
        const {poll, value} = req.body;        
        const escPollID = validator.escape(poll);
        const escChoiceName = validator.escape(value);
        
        const filter = {
            _id: escPollID,
            "choices.name": escChoiceName
        };
        const update = {            
            $inc: {
                "choices.$.count": 1
            }
        };
        const options = {
            new: true
        };        
        const result = await Vote.findOneAndUpdate(filter, update, options).exec();        
        
                
        return res.status(200).json({
            path: "POST /api/post-id-poll",  
            data: result          
        });
    }catch(e){
        return res.status(400).json({
            details: e
        });
    }
}


module.exports = handleObs(handleDB(handler));
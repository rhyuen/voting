const Poll = require("./models/poll.js");
const handleDB = require("./mw/db.js");
const handleObs = require("./mw/obs.js");
const validator = require("validator");
const {withApiAuthRequired, getSession} = require("@auth0/nextjs-auth0");

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

        const {user} = getSession(req, res);
        
        const filter = {
            _id: escPollID,
            "choices.name": escChoiceName
        };
        const update = {                      
            $addToSet: {
                "choices.$.voters": user.email
            }
        };
        const options = {
            new: true
        };        
        const result = await Poll.findOneAndUpdate(filter, update, options).exec();
        
        const {choices} = result;
        
        let summary = {
            results: {},
            votedFor: escChoiceName
        }

        for(let c = 0; c < choices.length; c++){
            summary.results[choices[c].name]=choices[c].voters.length;
        }
        
        const toJSObject = JSON.parse(JSON.stringify(result));
        const payload = Object.assign(toJSObject, summary);
        
                
        return res.status(200).json({
            path: "POST /api/post-id-poll",              
            data: payload,            
        });
    }catch(e){
        console.log(e);
        return res.status(400).json({
            details: e
        });
    }
}


module.exports = withApiAuthRequired(handleObs(handleDB(handler)));
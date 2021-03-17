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

        //Check to see if this user has voted in this poll before.
        const votedResult = await Poll.find({
            _id: escID,
            "choices.voters": { 
                $in: [user.email]
            }
        }).exec();
        
        const {choices} = result[0];        
        let summary = {
            results: {},
            votedFor: ""
        };

        //Assemble summary of results of poll based on number of entities in an array.
        for(let c = 0; c < choices.length; c++){
            summary.results[choices[c].name]=choices[c].voters.length;            
            if(choices[c].voters.includes(user.email)){                
                summary.votedFor=choices[c].name;
            }
        }
                               
        const votingEligibility = votedResult.length === 0 ;
                                           
        const update = {canVote: votingEligibility};        

        //Turn Mongoose Object to Javascript Object so can call Object.assign();
        const toJSObject = JSON.parse(JSON.stringify(result[0]));
        const withVotingEligibility = Object.assign(toJSObject, update, summary);        
               
        return res.status(200).json({
            path: "[GET] /api/poll/:id End Point",            
            data: withVotingEligibility            
        });
    }catch(e){
        console.log(e);
        return res.status(400).json({
            details: e
        });
    }
}


module.exports = withApiAuthRequired(handleObs(handleDB(handler)));
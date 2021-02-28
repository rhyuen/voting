const Vote = require("./models/vote.js");
const handleObs = require("./mw/obs.js");
const handleDB = require("./mw/db.js");
const validator = require("validator");

async function handler(req, res){
    try{
        if(req.method !== "POST"){
            return res.status(400).json({
                details: "only POSTS are allowed at this endpoint."
            });            
        }


        const {title, choices, question} = req.body;

        const escTitle = validator.escape(title);
        const escQuestion = validator.escape(question);
        const allTheChoices = Object.values(choices);
        const formattedAllTheChoices = allTheChoices.map(currChoice => {
            return {
                name: validator.escape(currChoice)
            };
        });

        const latest = new Vote({
            title: escTitle,
            startDate: Date.now(),
            question: escQuestion,
            choices: formattedAllTheChoices,
            endDate: Date.now() + 3600000
        })

        const result = await latest.save();
        console.log(result);

        return res.status(200).json({
            path: "[POST] /api/create-poll",        
            details: result
        });
    }catch(e){
        return res.status(400).json({
            details: e
        });
    }
}


module.exports = handleObs(handleDB(handler));
import { NextApiRequest, NextApiResponse } from "next";

import Poll from "./models/poll";
import handleObs from "./mw/obs";
import handleDB from "./mw/db";
import validator from "validator";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== "POST") {
            return res.status(400).json({
                details: "only POSTS are allowed at this endpoint."
            });
        }


        const { title, choices, question } = req.body;

        const escTitle = validator.escape(title);
        const escQuestion = validator.escape(question);
        const allTheChoices = Object.values(choices);
        const formattedAllTheChoices = allTheChoices.map(currChoice => {
            return {
                name: validator.escape(currChoice)
            };
        });

        const { user } = getSession(req, res);

        console.log(formattedAllTheChoices);

        const latest = new Poll({
            title: escTitle,
            startDate: Date.now(),
            creator: user.sub,
            question: escQuestion,
            choices: formattedAllTheChoices,
            endDate: Date.now() + 3600000
        })

        const result = await latest.save();
        console.log(result);

        return res.status(200).json({
            path: "[POST] /api/create-poll",
            payload: result
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            details: e
        });
    }
}


module.exports = withApiAuthRequired(handleObs(handleDB(handler)));
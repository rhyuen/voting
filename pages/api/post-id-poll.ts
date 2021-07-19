// @ts-ignore

import { NextApiRequest, NextApiResponse } from "next";

import Poll from "./models/poll";
import handleDB from "./mw/db";
import handleObs from "./mw/obs";
import validator from "validator";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";


async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        if (req.method !== "POST") {
            return res.status(400).json({
                details: "only POSTS are allowed at this endpoint."
            });
        }

        const { poll, value } = req.body;

        //update sanitzation values with whitelist/blacklist

        const escPollID = validator.escape(poll);
        const escChoiceName = validator.escape(value);

        console.log(escChoiceName);

        const { user } = getSession(req, res);

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
        console.log(result);
        const { choices } = result;

        let summary = {
            results: {},
            votedFor: escChoiceName
        }

        for (let c = 0; c < choices.length; c++) {
            summary.results[choices[c].name] = choices[c].voters.length;
        }

        const toJSObject = JSON.parse(JSON.stringify(result));
        const payload = Object.assign(toJSObject, summary);


        return res.status(200).json({
            path: "POST /api/post-id-poll",
            payload: [payload],
        });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            details: e
        });
    }
}


module.exports = withApiAuthRequired(handleObs(handleDB(handler)));
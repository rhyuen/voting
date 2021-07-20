import { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Poll from "./models/poll";
import handleObs from "./mw/obs";
import handleDB from "./mw/db";
import validator from "validator";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { user } = getSession(req, res);

        if (req.method !== "DELETE") {
            return res.status(400).json({
                path: "DELETE /delete-poll",
                details: "only DELETE is allowed at this endpoint."
            });
        }

        const { pollID } = req.body;

        const escPollID = validator.escape(pollID);
        const options = {
            _id: escPollID,
            creator: user.sub
        }

        const deletionResult = await Poll.deleteOne(options).exec();
        console.log(deletionResult);
        if (!deletionResult) {
            return res.status(403).json({
                path: "DELETE /delete-poll",
                details: "only the creator may delete a poll."
            });
        } else {
            return res.status(200).json({
                path: "DELETE /delete-poll",
                result: deletionResult.deletedCount
            });
        }
    } catch (e) {
        return res.status(400).json({
            details: e
        });
    }
}


export default withApiAuthRequired(handleObs(handleDB(handler)));
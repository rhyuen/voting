const Poll = require("./models/poll");
const handleDB = require("./mw/db.js");
const handleObs = require("./mw/obs.js");
const { withApiAuthRequired } = require("@auth0/nextjs-auth0");
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = await Poll.find({}).exec();
        return res.status(200).json({
            path: "[GET] Results Endpoint",
            payload: result
        });
    } catch (e) {
        return res.status(400).json({
            details: e
        });
    }
}


module.exports = withApiAuthRequired(handleObs(handleDB(handler)));
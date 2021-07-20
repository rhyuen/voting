import { NextApiRequest, NextApiResponse } from "next";

import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";
import Poll from "./models/poll";
import handleObs from "./mw/obs";
import handleDB from "./mw/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { user } = getSession(req, res);


        const activePolls = await Poll.find({}).exec();
        return res.status(200).json({
            path: "results end point",
            payload: activePolls
        });
    } catch (e) {
        return res.status(400).json({
            details: e
        });
    }
}


export default withApiAuthRequired(handleObs(handleDB(handler)));
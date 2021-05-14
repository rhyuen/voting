import "newrelic";
import { NextApiRequest, NextApiResponse } from "next"

export default (fn) => async function handler(req: NextApiRequest, res: NextApiResponse) {
    await fn(req, res);
};
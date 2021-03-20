import "newrelic";

export default (fn) => async function handler(req, res) {
    await fn(req, res);
};
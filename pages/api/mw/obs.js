require("newrelic");

module.exports = fn => async function handler(req, res) {                
    await fn(req, res);     
};
const fetch = require("node-fetch");

describe("results endpoint",  () => {
    test("it should return 200", async() => {
        const BASEURL= "http://localhost:3000/";
        const PATH = "api/results";
        const res =  await fetch(`${BASEURL}${PATH}`).then(res => res.json());     
        console.log(res);
        console.log("done");
        expect(res.path).toBe("[GET] Results Endpoint");        
    });    
});
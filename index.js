const Express = require("express");
const app = Express();
const { createUrl, getData, handleFakeUrl } = require("./lib/services");

app.use(Express.json());

app.post("/generate", (req, res) => createUrl(req, res));
app.get("/data", (req, res) => getData(req, res));
app.get("/link", (req, res) => handleFakeUrl(req, res));
app.get("/ping", (req, res) => res.send("pong"));

app.listen(process.env.PORT, () => console.log("app is running"));

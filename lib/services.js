const BitlyClient = require("bitly").BitlyClient;
const bitly = new BitlyClient(process.env.BITLY_TOKEN);

let links = {};

const createUrl = async (req, res) => {
  const { redirectUrl, key } = req.body;
  if (!redirectUrl || !key)
    return res.status(400).send({ error: "No key or url has been provided" });
  if (links[key])
    return res.status(400).send({ error: "Same key has been already created" });
  if (
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi.test(
      redirectUrl
    ) === false
  )
    return res.status(400).send({ error: "Wrong URL is provided" });

  try {
    const { link } = await bitly.shorten(
      `${req.protocol}://${req.get("host")}/link?key=${key}`
    );

    links[key] = {
      redirectUrl,
      link,
      visits: []
    };
    res.send({ link, key });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send({ error: "Something went wrong while generating an url" });
  }
};

const getData = (req, res) => {
  const { key } = req.query;
  return key ? res.status(200).send(links[key]) : res.status(200).send(links);
};

const handleFakeUrl = (req, res) => {
  const { key } = req.query;
  if (!links[key]) return res.status(400).send("No such key has been found");

  links[key].visits.push({
    time: new Date().toLocaleString(),
    ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress
  });

  res.redirect(links[key].redirectUrl);
};

module.exports = {
  createUrl,
  getData,
  handleFakeUrl
};

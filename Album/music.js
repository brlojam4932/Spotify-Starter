let fs = require("fs");
let axios = require("axios");

let media = ["hard_acid.mp3", "JTwinkle.mp3", "NonFungible.png"]; //"JTiger.mg3", "JTwinkle.mp3", "NonFungible.png"
let ipfsArray = [];
let promises = [];

for (let i = 0; i < media.length; i++) {
  promises.push(
    new Promise((res, rej) => {
      fs.readFile(`${__dirname}/export/${media[i]}`, (err, data) => {
        if (err) rej();
        ipfsArray.push({
          path: `media/${i}`,
          content: data.toString("base64"),
        });
        res();
      });
    })
  );
}
Promise.all(promises).then(() => {
  axios
    .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
      headers: {
        "X-API-KEY":
          "uP0jPymgiPHjQ7XNlOHubTutbhtAR7Ln1Ai4HzmyTcE9iWTHjsL0FIRajSbrPTNm",
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// npm init
// npm install fs
// npm install axios

// node music.js
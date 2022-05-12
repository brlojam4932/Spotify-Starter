let fs = require("fs");
let axios = require("axios");

let songs = ["hard_acid.mp3", "JTwinkle.mp3"];
let durations = ["07:31", "00:05"];
let ipfsArray = [];

for (let i = 0; i < songs.length; i++) {
  ipfsArray.push({
    path: `metadata/${i}.json`,
    content: {
      image: `ipfs://QmPQea1kVLyRJVFrUqPWX33ypAg3H2H2uBw4c7xA25x9ZB/media/2`, //xxx = hash
      name: songs[i],
      animation_url: `ipfs://QmPQea1kVLyRJVFrUqPWX33ypAg3H2H2uBw4c7xA25x9ZB/media/${i}`, //xxx = hash
      duration: durations[i],
      artist: "Dead Mauses",
      year: "2001"
    },
  });
}

axios.post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
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


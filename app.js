const express = require("express");
const request = require("request");
const axios = require("axios").default;
const app = express();
const port = 3000;
const cors = require("cors");

// const make_API_call = function (url) {
//   return new Promise((resolve, reject) => {
//     request(url, { json: true }, (err, res, body) => {
//       if (err) reject(err);
//       resolve(body);
//     });
//   });
// };

// const getDataFromServer = async () => {
//   try {
//     const res = await make_API_call(
//       "https://jsonplaceholder.typicode.com/todos"
//     );
//     return res;
//   } catch (err) {
//     console.log(err);
//     return "ERROR OCCURED";
//   }
// };

const getDataFromServerAxios = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos",
      {
        headers: {
          "Accept-Encoding": "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return "ERROR";
  }
};

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  try {
    const data = await getDataFromServerAxios();
    const dataToSend = {
      dataFromExpress: data,
    };
    axios.post(
      "https://webhook.site/592359ce-ca0a-405f-ba6f-291eb79317b2",
      dataToSend
    );

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

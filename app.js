const express = require("express");
const axios = require("axios").default;
const app = express();
const port = 3000;
const cors = require("cors");

//Add Google Classroom CLient ID and Secret

// Google Classroom API, Getting Submissions
// const getDataFromServerAxios = async () => {
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/todos",
//       {
//         headers: {
//           "Accept-Encoding": "application/json",
//         },
//       }
//     );
//     return response.data;
//   } catch (err) {
//     console.log(err);
//     return "ERROR";
//   }
// };

const getDataFromServerAxios = async () => {
  try {
    const response = await axios.get("http://localhost:1337/api/submissions", {
      headers: {
        "Accept-Encoding": "application/json",
        Authorization:
          "Bearer " +
          "3c948a3de09a11170afd6b068cbf4580ec53b35b5776a5d51d17129bd19656ac3f7871b54b37eb524f90f8c2f954f85d99bf779fd82267e41a4069847efc2b0a67a48ed4bc5562e12b0687e0231f54c81b6ccb0d1a150996a3ad4a287827169dd89bad5a22ead77e0cf5b47cf0e8550d1c6aa92f764f52e6b6a4180827400028",
      },
    });
    return response.data;
  } catch (err) {
    return "ERROR";
  }
};

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.get("/", async (req, res) => {
  try {
    let data = await getDataFromServerAxios();
    console.log("THIS IS DATA", data);
    const dataToSend = {
      data: data.data[0].attributes,
    };
    data = dataToSend;
    console.log(dataToSend);
    axios.post("http://localhost:1337/api/submissions", data, {
      headers: {
        Authorization:
          "Bearer " +
          "3c948a3de09a11170afd6b068cbf4580ec53b35b5776a5d51d17129bd19656ac3f7871b54b37eb524f90f8c2f954f85d99bf779fd82267e41a4069847efc2b0a67a48ed4bc5562e12b0687e0231f54c81b6ccb0d1a150996a3ad4a287827169dd89bad5a22ead77e0cf5b47cf0e8550d1c6aa92f764f52e6b6a4180827400028",
      },
    });

    res.status(200).json("NULL");
  } catch (err) {
    console.log(err);
    console.log("HELLLLLOOOOOOOO");
    res.status(500).json({ message: err });
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

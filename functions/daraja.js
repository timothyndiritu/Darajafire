import express from "express";
import request from "request";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());

import admin from "firebase-admin";

//routes
app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/access_token", access, (req, res) => {
  res.status(200).json({ access_token: req.access_token });
});

let path = "https://famous-aliens-fix.loca.lt";
//https://us-central1-darajafire.cloudfunctions.net/helloWorld

app.get("/register", access, (req, res) => {
  let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
  let auth = "Bearer " + req.access_token;

  request(
    {
      url,
      method: "POST",
      headers: {
        Authorization: auth,
      },
      json: {
        ShortCode: 600981,
        ResponseType: "Completed",
        ConfirmationURL: path + "/confirmation",
        ValidationURL: path + "/validation",
      },
    },
    function (error, response, body) {
      if (error) {
        console.log(error);
      }

      res.status(200).json(body);
    }
  );
});

app.post("/confirmation", (req, res) => {
  console.log(
    "..............................confirmation............................."
  );
  console.log(req.body);



  res.send(200);
});

app.post("/validation", (req, res) => {
  console.log(
    "..............................validation............................."
  );
  console.log(req.body);
  res.send(200);

});

app.get("/simulate", access, (req, res) => {
  let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate";
  let auth = "Bearer " + req.access_token;

  request(
    {
      url,
      method: "POST",
      headers: {
        Authorization: auth,
      },
      json: {
        ShortCode: "600991",
        CommandID: "CustomerBuyGoodsOnline",
        Amount: "1",
        Msisdn: "254708374149",
        BillRefNumber: "null",
      },
    },
    function (error, response, body) {
      if (error) {
        console.log(error);
      } else {
        res.status(200).json(body);
      }
    }
  );
});

//balance

// app.get('/balance', access, (req, res) => {
//   let url = "https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query";
//   let auth = 'Bearer ' + req.access_token

//   request({
//     url,
//     method: "POST",
//     headers: {
//       "Authorization":auth
//     },
//     json: {

//     }
//   })
// })

function access(req, res, next) {
  //access token
  let url =
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  let auth = new Buffer.from(
    "gMvrpCzJh1QjjWZy7ZFjZIzZHlZkcfrA:FRlRVg08QWTsVO3N"
  ).toString("base64");

  request(
    {
      url,
      headers: {
        Authorization: "Basic " + auth,
      },
    },
    (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        req.access_token = JSON.parse(body).access_token;
        next();
      }
    }
  );
}

//listen to requests

export default app;

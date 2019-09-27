'use strict';

const yelp = require('yelp-fusion'); //used Yelp Fusion API client for Node.js with Promises
const express = require('express'); //used express to create a node server and to create REST API.
//const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

//bodyParser is not needed as we are not doing any POST call.
//app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

app.listen(port, () =>
  console.log(`Express server is running on localhost:${port}`)
);

// Got this after creating a new app in yelp fusion, this api key token is used for authorization.
const apiKey = 'Ubup8E7BuzVHBGAmhAHSS17fVR_DpoVr4FMDTcwJeh6iqVzAkLYqSTBXWpN_jg2yB0r400fdQmKkkX8P5mfcK8VsgE5ykIMye9Us_79YC7gMLLkotEvKf0o0dGGMXXYx';

const searchRequest = {
  term:'icecream',
  location: 'Alpharetta',
  sort_by: 'rating',
  limit: 5
};

const client = yelp.client(apiKey);
const allCalls = [];
client.search(searchRequest).then(response => {
  const finalData = [];
  const result = response.jsonBody.businesses;
  //const prettyJson = JSON.stringify(result, null, 4);
  result.forEach(element => {
    allCalls.push(
      client.reviews(element.id).then(response => {
        const reviewResult = response.jsonBody.reviews;
        //const reviewPretty = JSON.stringify(reviewResult, null, 4);
        const reviewDetails = [];
        const obj = {
          "id": element.id,
          "name": element.name,
          "city": element.location.city,
          "street": element.location.address1,
          "imageUrl": element.image_url
        }
        reviewResult.forEach(review => {
          var reviewObj = {
            "userName": review.user.name,
            "text": review.text
          }
          reviewDetails.push(reviewObj);
        })
        obj["review"] = reviewDetails;
        finalData.push(obj);
      }).catch(e => {
        console.log(e);
      })
    );
  });
  Promise.all(allCalls).then(() => {
    console.log("finally");
    console.log(JSON.stringify(finalData,null,4));
  })
  app.get('/api/getdata', (req, res) => {
    res.send({ 'result': finalData });
  });
}).catch(e => {
  console.log(e);
});

// Incase I had to do any POST call.
/* app.post('/api/sendata', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
}); */
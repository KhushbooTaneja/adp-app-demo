'use strict';

const yelp = require('yelp-fusion');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.listen(5000, () =>
  console.log('Express server is running on localhost:5000')
);

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
  const prettyJson = JSON.stringify(result, null, 4);
  result.forEach(element => {
    allCalls.push(
      client.reviews(element.id).then(response => {
        const reviewResult = response.jsonBody.reviews;
        const reviewPretty = JSON.stringify(reviewResult, null, 4);
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
const projectId = '936948942248';
const location = 'us-central1';
const modelId = 'ICN1685802014031740928';
// const filePath = './test.jpg';

// Imports the Google Cloud AutoML library
const {PredictionServiceClient} = require(`@google-cloud/automl`).v1;
const express = require('express');
// const fs = require(`fs`);

// Instantiates a client
const client = new PredictionServiceClient();

// Read the file content for translation.
// const content = fs.readFileSync(filePath);

const bodyParser = require('body-parser');

const app = express()
const port = 3000
app.use(bodyParser.urlencoded({limit:'50mb', extended: true }));

app.use(bodyParser.json({limit: '50mb'}))

app.post('/', async (req, res) => {
	var resp = await predict(req.body.base64);
	console.log(resp);
	res.send(resp);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

async function predict(content) {
  // Construct request
  // params is additional domain-specific parameters.
  // score_threshold is used to filter the result
  const request = {
    name: client.modelPath(projectId, location, modelId),
    payload: {
      image: {
        imageBytes: content,
      },
    },
  };

  const [response] = await client.predict(request);
	return response.payload[0];
//  for (const annotationPayload of response.payload) {
//    console.log(`Predicted class name: ${annotationPayload.displayName}`);
//   console.log(
//      `Predicted class score: ${annotationPayload.classification.score}`
//    );
//  }
}

//predict();

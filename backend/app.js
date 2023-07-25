const express = require('express');
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log("Method : ",req.method);
  console.log("URL : " , req.url);
  console.log("Params : " , req.params);
  console.log("Body : " , req.body);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World');
})


app.post('/data', (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const startDate = data.startDate;
    const endDate = data.endDate;
    const selectedOptions = [...data.selectedOptions];
    console.log("start date: " + startDate);
    console.log("end date: " + endDate);
    console.log("selected rooms: " + selectedOptions);
    console.log("selected rooms array size: " + selectedOptions.length);
    res.status(200).send('Data received');
  } catch (error) {
    console.error(error);
    res.status(400).send('Invalid JSON object');
  }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})
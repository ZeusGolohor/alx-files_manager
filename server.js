const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const routes = require('./routes');

app.use(routes);
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

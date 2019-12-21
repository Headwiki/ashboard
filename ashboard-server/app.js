const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

mongoose.connect(
  "mongodb://test123:test123@ds257648.mlab.com:57648/graphqltest",
  { useNewUrlParser: true },
  () => {
    console.log("Connect with DB successfully.");
  }
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);


app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
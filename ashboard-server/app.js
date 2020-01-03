require('dotenv').config()
const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./schema/schema");

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`,
  { 
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connect with DB successfully.");
  }
);

app.use(cors());

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
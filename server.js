const express = require("express");
var { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
var schema = buildSchema(`type Query {
    hello: String,
    quoteOfTheDay: String
    rollDice(numDice: Int!, numSides: Int!): [Int]
}`);

var root = {
  hello: () => {
    return "hello world!";
  },
  quoteOfTheDay: () => {
    return "take it one step at a time";
  },
  rollDice: ({ numDice, numSides }) => {
    var output = [];
    output.push(numSides * numDice);
    return output;
  },
};

var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);

console.log(`Running the Graphql server at http://localhost:4000/graphql`);

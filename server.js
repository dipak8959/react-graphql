const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors'); // Import the cors package

const schema = buildSchema(`
  type Query {
    users: [User]
  }

  type User {
    name: String
  }
`);

const users = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
];

const rootValue = {
  users: () => users,
};


const app = express();
app.use(cors()); // Add this line to enable CORS
app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }));

app.listen(4000, () => console.log('GraphQL server is running on http://localhost:4000/graphql'));

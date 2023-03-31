const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const sql = require('mssql');

const typeDefs = `
  type Query {
    user(id: Int!): User
  }

  type User {
    id: Int
    name: String
    email: String
  }
`;

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      const pool = await sql.connect('your_connection_string_here');
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM users WHERE id = @id');
      return result.recordset[0];
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();
app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => console.log('GraphQL server is running on http://localhost:4000/graphql'));

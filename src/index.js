const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const resolvers = require('./resolvers.cjs');

// 从 schema.graphql 文件中读取 Schema 定义
const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({port: 5000}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
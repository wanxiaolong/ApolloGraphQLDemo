const db = require('./db.cjs');

const bookTable = 'book';
const authorTable = "author";
const resolvers = {
  Query: {
    findBookById: async (_, { id }) => {
      return db(bookTable).where({ id }).first();
    },
    findBooksByName: async (_, { name }) => {
      return db(bookTable).where('name', 'ILIKE', `%${name}%`).select();
    },
    findBooksByAuthorName: async (_, { name }) => {
      return db(bookTable)
        .join(authorTable, 'book.authorId', '=', 'author.id')
        .where('author.firstName', 'ILIKE', `%${name}%`)
        .orWhere('author.lastName', 'ILIKE', `%${name}%`)
        .select('book.*');
    },
    findAllBooks: async () => {
      return db(bookTable).select();
    },
  },
  Mutation: {
    createBook: async (_, { id, name, pageCount, authorId }) => {
      await db(bookTable).insert({ id, name, pageCount, authorId });
      return db(bookTable).where({ id }).first();
    },
    updateBook: async (_, { id, name, pageCount, authorId }) => {
      await db(bookTable).where({ id }).update({ name, pageCount, authorId });
      return db(bookTable).where({ id }).first();
    },
    deleteBook: async (_, { id }) => {
      const rows = await db(bookTable).where({ id }).del();
      return rows > 0;
    },
  },
  Book: {
    author: async (book) => {
      return db(authorTable).where({ id: book.authorId }).first();
    },
  },
};

module.exports = resolvers;
const db = require('./db.cjs');

const bookTable = 'book';
const authorTable = "author";
const resolvers = {
  Query: {
    // 为什么这些方法的第一个参数是下划线（"_"）？
    // 在apollo的resolver中，参数是按照固定顺序传递的，这些参数不能交换顺序：
    // resolver(parent, args, context, info)
    // parent: 表示父级返回的数据。这里用"_"代替，表示知道有该参数，但是该参数不会被用到
    // args: 包含客户端传递给该字段的参数。这里是id
    // context: 包含与请求上下文相关信息
    // info: 包含GraphQL查询的相关信息
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

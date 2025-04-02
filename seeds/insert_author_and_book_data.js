const bookTable = "book";
const authorTable = "author";

exports.seed = async function(knex) {
  // 1. 删除表中的全部旧记录（为了避免重复插入测试数据）
  await knex(bookTable).del();  // 必须先删除子表（外键依赖）
  await knex(authorTable).del();

  // 2. 插入作者数据
  const authors = [
    { id: 'author-1', firstName: 'Joshua', lastName: 'Bloch' },
    { id: 'author-2', firstName: 'Douglas', lastName: 'Adams' },
    { id: 'author-3', firstName: 'Bill', lastName: 'Bryson' },
  ];
  await knex(authorTable).insert(authors);

  // 3. 插入书籍数据
  const books = [
    { id: 'book-1', name: 'Effective Java', pageCount: 450, authorId: 'author-1' },
    { id: 'book-2', name: 'The Guide to the Galaxy', pageCount: 224, authorId: 'author-2' },
    { id: 'book-3', name: 'A Short History', pageCount: 544, authorId: 'author-3' },
    { id: 'book-4', name: 'Effective Python', pageCount: 666, authorId: 'author-1' },
    { id: 'book-5', name: 'Java Guide', pageCount: 444, authorId: 'author-2' },
  ];
  await knex(bookTable).insert(books);
};

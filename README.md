## 创建schema
```
npx knex migrate:latest
```

## 插入测试数据
```
npx knex seed:run
```

## 测试
启动Postgres
```
docker compose up -d
```

启动app
```
node src/index.js
```

打开浏览器：
```
http://localhost:5000/
```

## Graphql Query操作
### 根据id查找Book
```
query {
  findBookById(id: "book-1") {
    id
    name
    pageCount
    author {
      firstName
      lastName
    }
  }
}
```
### 根据name查找Book
```
query {
  findBooksByName(name: "Java") {
    id
    name
    pageCount
    author {
      firstName
      lastName
    }
  }
}
```
### 根据author名字查找Book
```
query {
  findBooksByAuthorName(name: "Bloch") {
    id
    name
    pageCount
    author {
      firstName
      lastName
    }
  }
}
```
### 查找所有的Book
```
query {
  findAllBooks {
    id
    name
    pageCount
    author {
      firstName
      lastName
    }
  }
}
```
## Graphql Mutation操作
### 创建Book
```
mutation {
  createBook(
    id: "book-6",
    name: "Introduction to GraphQL",
    pageCount: 300,
    authorId: "author-1"
  ) {
    id
    name
    pageCount
    author {
      firstName
      lastName
    }
  }
}
```
### 修改Book
```
mutation {
  updateBook(
    id: "book-6",
    name: "Advanced GraphQL",
    pageCount: 350,
    authorId: "author-2"
  ) {
    id
    name
    pageCount
    author {
      firstName
      lastName
    }
  }
}
```
### 删除Book
```
mutation {
  deleteBook(id: "book-6")
}
```

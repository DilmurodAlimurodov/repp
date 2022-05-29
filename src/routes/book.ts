import * as c from "../controllers/book"

export default {
  path: '/api/books',
  defaultMethod: 'GET',
  
  routes: [
    {
      path: '/categories/all',
      method: 'get',
      controllers: [c.fetchAll]
    },
    {
      path: '/category/:slugUrl',
      method: 'get',
      controllers: [c.fetchCategoryBooks]
    },

    // Books
    {
      path: '/book/:category/:slugUrl',
      method: 'get',
      controllers: [c.getBook]
    },
    {
      path: '/fetch/:category/:start/:end',
      method: 'get',
      controllers: [c.fetchBooks]
    }
  ]
}
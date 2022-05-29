import * as c from "../../controllers/admin/book"

export default {
  path: '/admin',
  defaultMethod: 'post',
  
  routes: [
    {
      path: '/book-category',
      method: 'post',
      controllers: [c.createBookCategory]
    },
    {
      path: '/book-category/:slugUrl',
      method: 'put',
      controllers: [c.updateBookCategory]
    },
    {
      path: '/book-category/:slugUrl',
      method: 'delete',
      controllers: [c.deleteBookCategory]
    },

    // Book
    {
      path: '/book',
      method: 'post',
      controllers: [c.createBook]
    },
    {
      path: '/book/:category/:slugUrl',
      method: 'put',
      controllers: [c.updateBook]
    },
    {
      path: '/book/:category/:slugUrl',
      method: 'delete',
      controllers: [c.deleteBook]
    },
  ]
}
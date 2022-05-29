import { Response, Request } from "express"
import BookCategory from "../models/category.model";
import Book from "../models/book.model";
import { serverError, notFound } from "../utils/errors";

export const fetchAll = 
async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await BookCategory.findAll();
    res.json(categories)
  }
  catch (err) {serverError(err, res)}
}

export const fetchCategoryBooks =
async (req: Request, res: Response) => {
  try {
    const { slugUrl } = req.params;
    const category = await BookCategory.findOne({
      where: { slugUrl }
    })
    if (!category) return notFound(`Book category '${slugUrl}' not found!`, res)

    const categoryBooks = await Book.findAndCountAll({
      where: {
        categoryId: category.id
      }
    })

    res.json({
      category,
      totalBooks: categoryBooks.count,
      books: categoryBooks.rows
    })
  }
  catch (err) {serverError(err, res)}
}

// Books
export const getBook = 
async (req: Request, res: Response) => {
  try {
    const { category, slugUrl } = req.params;
    const bookCategory = await BookCategory.findOne({
      where: {
        slugUrl: category
      }
    })
    if (!bookCategory) return notFound(`Book category '${category}' not found!`, res)
  
    const book = await Book.findOne({
      where: {
        slugUrl: slugUrl,
        categoryId: bookCategory.id
      }
    })
    if (!book) return notFound(`Book '${slugUrl}' not found!`, res)
    res.json(book)
  }
  catch (err) {serverError(err, res)}
}

export const fetchBooks = 
async (req: Request, res: Response) => {
  try {
    const { category, start, end } = req.params;
    const bookCategory = await BookCategory.findOne({
      where: {
        slugUrl: category
      }
    })
    if (!bookCategory) return notFound(`Book category '${category}' not found!`, res)
  
    const books = await Book.findAll({
      where: {
        categoryId: bookCategory.id
      },
      offset: +start,
      limit: +end
    })
    res.json(books)
  }
  catch (err) {serverError(err, res)}
}
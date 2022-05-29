import Book from "../models/book.model";
import BookCategory from "../models/category.model";
import slugify from "../utils/slugify"

export const isExist = 
async (title: string, category: string): Promise<object> => {
  const sluged = slugify(title)

  const bookCategory = await BookCategory.findOne({
    where: {
      slugUrl: category
    }
  })
  if (!bookCategory) return Promise.resolve({
    err: true,
    msg: `Book category '${category}' not found!`
  })

  const book = await Book.findOne({
    where: {
      slugUrl: slugify(title),
      categoryId: bookCategory.id
    }
  })
  if (!book) return Promise.resolve({
    err: false,
    ok: false,
    categoryId: bookCategory.id
  })
  return Promise.resolve({
    err: false,
    ok: true,
    categoryId: bookCategory.id
  })
}
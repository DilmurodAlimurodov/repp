import { Response, Request } from "express"
import { serverError, alreadyExist, notFound } from "../../utils/errors";
import BookCategory from "../../models/category.model";
import Book from "../../models/book.model";
import slugify from "../../utils/slugify";
import { remove } from '../../utils/uploads'
import multer from '../../utils/multer'
import { uploadFile } from '../../s3'

// Book category
export const createBookCategory 
= async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const sluged = slugify(title)

    const isExist = await BookCategory.findOne({
      where: {
        slugUrl: sluged
      }
    })
    if (isExist) return alreadyExist(`Book category '${sluged}' is exist!`, res)

    const newBookCategory = await BookCategory.create(
    <BookCategory>{
      title: title.trim(),
      slugUrl: sluged
    })
    res.status(201).json(newBookCategory)
  }
  catch (err) {serverError(err, res)}
}

export const updateBookCategory
= async (req: Request, res: Response) => {
  try {
    const { slugUrl } = req.params;
    const { title } = req.body;

    const category = await BookCategory.findOne({
      where: {
        slugUrl: slugUrl
      }
    })
    if (!category) return notFound(`Book category '${slugUrl}' not found!`, res)
    
    const sluged = slugify(title)

    const isExist = await BookCategory.findOne({
      where: {
        slugUrl: sluged
      }
    })
    if (isExist && isExist.slugUrl !== sluged) return alreadyExist(`Book category '${sluged}' is exist!`, res)

    category.title = title.trim();
    category.slugUrl = sluged;
    const saved = await category.save()
    res.json(saved)
  } catch (err) {serverError(err, res)}
}

export const deleteBookCategory 
= async (req: Request, res: Response) => {
  try {
    const { slugUrl } = req.params;

    const category = await BookCategory.findOne({
      where: {
        slugUrl: slugUrl
      }
    })
    if (!category) return notFound(`Book category '${slugUrl}' not found!`, res)

    await category.destroy()
    res.json({ ok: true, msg: `Book category '${slugUrl}' deleted!` })
  }
  catch (err) {serverError(err, res)}
}


// Books
export const createBook
= async (req: Request, res: Response) => {
  const upload = multer.single('img');

  upload(req, res, async (err) => {
    if (err) return serverError(err, res)

    try {
      const { title, category, price, author } = req.body;
      const file = req.file
      const sluged = slugify(title)
  
      const bookCategory = await BookCategory.findOne({
        where: {
          slugUrl: category
        }
      })
      if (!bookCategory) {
        remove(file!.filename)
        return notFound(`Book category '${category}' not found!`, res)
      }
    
      const book = await Book.findOne({
        where: {
          slugUrl: slugify(title),
          categoryId: bookCategory.id
        }
      })
      if (book) {
        remove(file!.filename)
        return alreadyExist(`Book '${sluged}' is already exist!`, res)
      }

      await uploadFile(file)
  
      const newBook = await Book.create(<Book>{
        title: title.trim(),
        slugUrl: slugify(title),
        author: author,
        price: price,
        categoryId: bookCategory.id,
        img: req.file!.filename
      })
  
      res.status(201).json(newBook)
    }
    catch (err) {serverError(err, res)}
  })
}

export const updateBook
= async (req: Request, res: Response) => {
  const upload = multer.single('img');

  upload(req, res, async (err) => {
    if (err) {
      return serverError(err, res)
    }

    try {
      const { title, price, author, discount, discountPrice, categorySlug } = req.body;
      const { category, slugUrl } = req.params;

      const file = req.file
  
      const bookCategory = await BookCategory.findOne({
        where: {
          slugUrl: category
        }
      })
      if (!bookCategory) {
        if (req.file) remove(file!.filename)
        return notFound(`Book category '${category}' not found!`, res)
      }
    
      const book = await Book.findOne({
        where: {
          slugUrl: slugUrl,
          categoryId: bookCategory.id
        }
      })
      if (!book) {
        if (req.file) remove(file!.filename)
        return notFound(`Book '${slugUrl}' not found!`, res)
      }

      let newCategoryId;
      if (categorySlug) {
        const isCategory = await BookCategory.findOne({
          where: {
            slugUrl: categorySlug
          }
        })
        if (!isCategory) {
          if (req.file) remove(file!.filename)
          return notFound(`Book category '${categorySlug}' is not exist!`, res)
        }
        book.categoryId = isCategory.id;
        newCategoryId = isCategory.id
      }

      if (title) {
        const sluged = slugify(title)
        const isBook = await Book.findOne({
          where: {
            slugUrl: sluged,
            categoryId: newCategoryId || bookCategory.id
          }
        })
        if (isBook && isBook.slugUrl !== sluged) {
          if (req.file) remove(file!.filename)
          return alreadyExist(`Book category '${sluged}' is exist! Please choose another title.`, res)
        }
        book.title = title.trim();
        book.slugUrl = sluged;
      }

      if (file) {
        remove(book.img)
        await uploadFile(file)
        book.img = file.filename
      }

      if (author) book.author = author;
      if (price) book.price = price;
      if (discount) book.discount = discount;
      if (discountPrice) book.discountPrice = discountPrice;

      const saved = await book.save()
      res.json(saved)
    }
    catch (err) {serverError(err, res)}
  })
}

export const deleteBook
= async (req: Request, res: Response) => {
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
    remove(book.img)
    await book.destroy();
    res.json({ ok: true, msg: `Book '${slugUrl}' deleted!` })
  }
  catch (err) {serverError(err, res)}
}
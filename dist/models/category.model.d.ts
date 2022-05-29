import { Model } from 'sequelize-typescript';
import Book from './book.model';
export default class BookCategory extends Model<BookCategory> {
    id: number;
    title: string;
    slugUrl: string;
    books: Book[];
}

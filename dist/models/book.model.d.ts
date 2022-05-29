import { Model } from 'sequelize-typescript';
import BookCategory from './category.model';
export default class Book extends Model<Book> {
    id: number;
    title: string;
    slugUrl: string;
    price: number;
    author: string;
    discount: boolean;
    discountPrice: number;
    img: string;
    category: BookCategory;
    categoryId: number;
}

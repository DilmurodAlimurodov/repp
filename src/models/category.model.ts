import { 
  Table, Column, PrimaryKey, Model, AutoIncrement, Unique, HasMany, Max
} from 'sequelize-typescript';
import Book from './book.model'

@Table
export default class BookCategory extends Model<BookCategory> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number;

  @Max(25)
  @Column
  title: string;

  @Max(50)
  @Column
  slugUrl: string;

  @HasMany(() => Book)
  books: Book[]
}
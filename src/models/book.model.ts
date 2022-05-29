import { 
  Table, Column, PrimaryKey, Model, AutoIncrement, Unique, BelongsTo, ForeignKey, Max
} from 'sequelize-typescript';

import BookCategory from './category.model';

@Table
export default class Book extends Model<Book> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  id: number

  @Max(20)
  @Column
  title: string

  @Max(40)
  @Column
  slugUrl: string

  @Column
  price: number

  @Max(30)
  @Column
  author: string

  @Column({
    defaultValue: false
  })
  discount: boolean

  @Column
  discountPrice: number

  @Column
  img: string

  @BelongsTo(() => BookCategory)
  category: BookCategory

  @ForeignKey(() => BookCategory)
  @PrimaryKey
  @Column
  categoryId: number;
}
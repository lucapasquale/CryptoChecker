import {
  Model,
  Column,
  Table,
  DataType,
} from 'sequelize-typescript';


@Table
export class CurrencyQuote extends Model<CurrencyQuote> {
  @Column
  from: string;

  @Column
  to: string;

  @Column (DataType.FLOAT)
  value: number;
}

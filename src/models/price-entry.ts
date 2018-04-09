import {
  Model,
  Column,
  Table,
  DataType,
} from 'sequelize-typescript';


@Table
export class PriceEntry extends Model<PriceEntry> {
  @Column
  exchange: string;

  @Column
  currency: string;

  @Column(DataType.DECIMAL(20, 2))
  last: number;

  @Column(DataType.DECIMAL(20, 2))
  low: number;

  @Column(DataType.DECIMAL(20, 2))
  high: number;
}

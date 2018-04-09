import { Sequelize } from 'sequelize-typescript';
import config from './config';

import { PriceEntry } from './models/price-entry';
import { CurrencyQuote } from './models/currency-quote';


export type Database = {
  sequelize: Sequelize;
  PriceEntry: typeof PriceEntry;
  CurrencyQuote: typeof CurrencyQuote;
};

export async function startDB(): Promise<Database> {
  const sequelize = new Sequelize({
    url: config.PG_URI,
    logging: false,
    define: {
      timestamps: true,
      paranoid: true,
    },
  });

  sequelize.addModels([PriceEntry, CurrencyQuote]);
  await sequelize.sync();

  return {
    sequelize,
    PriceEntry,
    CurrencyQuote,
  };
}

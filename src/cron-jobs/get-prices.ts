import axios from 'axios';
import { Database } from '../db';



export default async function(db: Database) {
  const now = new Date();

  getPoloniex(db, now);
  getFoxbit(db, now);
}


const poloniex = axios.create({ baseURL: 'https://poloniex.com/public' });

async function getPoloniex(db: Database, currentDate: Date) {
  const { data } = await poloniex.get('?command=returnTicker');
  const currentPrice = data.USDT_BTC;

  await db.PriceEntry.create({
    exchange: 'poloniex',
    currency: 'BTC_USD',

    last: currentPrice.last,
    low: currentPrice.lowestAsk,
    high: currentPrice.highestBid,
    createdAt: currentDate,
  });
}


const foxbit = axios.create({ baseURL: 'https://api.blinktrade.com/api/v1/BRL' });

async function getFoxbit(db: Database, currentDate: Date) {
  const [{ data }, quote] = await Promise.all([
    foxbit.get('ticker?crypto_currency=BTC'),

    db.CurrencyQuote.findOne({
      where: { from: 'USD', to: 'BRL' },
      order: [['id', 'DESC']],
    }),
  ]);

  await db.PriceEntry.create({
    exchange: 'foxbit',
    currency: 'BTC_USD',

    last: data.last / quote.value,
    low: data.low / quote.value,
    high: data.high / quote.value,
    createdAt: currentDate,
  });
}

import axios from 'axios';
import { Database } from '../db';


const currencyConverter = axios.create({
  baseURL: `https://free.currencyconverterapi.com/api/v5/`,
});

export default async function (db: Database) {
  const { data } = await currencyConverter.get('convert?q=USD_BRL');
  const quote = data.results.USD_BRL;

  await db.CurrencyQuote.create({
    from: quote.fr,
    to: quote.to,
    value: quote.val,
  });
}


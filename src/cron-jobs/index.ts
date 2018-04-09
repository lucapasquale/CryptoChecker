import updateQuotes from './update-quotes';
import getPrices from './get-prices';


export type Cron = {
  handler: Function;
  interval: string;
};

export default [
  { handler: updateQuotes, interval: 'at 00:00' },
  { handler: getPrices, interval: 'every 10 minutes' },
] as Cron[];

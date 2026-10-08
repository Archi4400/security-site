/** Coins the feed can price: each has a <SYMBOL>USDT pair on the exchange. */
export const COINS: Readonly<Record<string, string>> = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
  bnb: 'BNB',
  sol: 'Solana',
  xrp: 'XRP',
  ada: 'Cardano',
  doge: 'Dogecoin',
  trx: 'TRON',
  dot: 'Polkadot',
  link: 'Chainlink',
  ltc: 'Litecoin',
  avax: 'Avalanche',
};

export function coinName(id: string): string {
  return Object.hasOwn(COINS, id) ? COINS[id] : id.toUpperCase();
}

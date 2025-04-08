const pactum = require('pactum');
const { spec, matcher } = pactum;

const base = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest';

describe('Currency API', () => {
  it('should return list of currencies', async () => {
    await spec()
      .get(`${base}/currencies.json`)
      .expectStatus(200)
      .expectJsonLike({ usd: 'United States Dollar' });
  });

  it('should return exchange rates for EUR', async () => {
    await spec()
      .get(`${base}/currencies/eur.json`)
      .expectStatus(200)
      .expectJsonLike({ date: /\d{4}-\d{2}-\d{2}/ });
  });

  it('should return exchange rate from EUR to USD', async () => {
    await spec()
      .get(`${base}/currencies/eur/usd.json`)
      .expectStatus(200)
      .expectJsonLike({ usd: matcher.like(1.0) });
  });

  it('should return 404 for unknown currency', async () => {
    await spec()
      .get(`${base}/currencies/xyz.json`)
      .expectStatus(404);
  });
});
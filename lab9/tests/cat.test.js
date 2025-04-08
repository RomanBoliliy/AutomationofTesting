const { spec, matcher } = require('pactum');

describe('Cat Facts API', () => {
  it('should return valid breed structure', async () => {
    await spec()
      .get('https://catfact.ninja/breeds')
      .expectStatus(200)
      .expectJsonMatch('data[0]', {
        breed: matcher.string(),
        country: matcher.string()
      });
  });

  it('should return fact object', async () => {
    await spec()
      .get('https://catfact.ninja/fact')
      .expectStatus(200)
      .expectJsonMatch({
        fact: matcher.string(),
        length: matcher.number()
      });
  });

  it('should respect limit in facts', async () => {
    const res = await spec()
      .get('https://catfact.ninja/facts?limit=3')
      .expectStatus(200);
    expect(res.body.data.length).toBe(3);
  });

  it('should respect max_length', async () => {
    const res = await spec()
      .get('https://catfact.ninja/facts?max_length=100')
      .expectStatus(200);
    for (const f of res.body.data) {
      expect(f.length).toBeLessThanOrEqual(100);
    }
  });

  it('should return correct headers', async () => {
    const res = await spec().get('https://catfact.ninja/fact').expectStatus(200);
    expect(res.headers['server']).toBeDefined();
    expect(res.headers['cache-control']).toBeDefined();
    expect(res.headers['date']).toBeDefined();
  });
});
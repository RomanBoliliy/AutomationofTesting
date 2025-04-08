const { spec } = require('pactum');

describe('UK Bank Holidays API', () => {
  it('should return number of bank holidays', async () => {
    const res = await spec().get('https://www.gov.uk/bank-holidays.json').expectStatus(200);
    const events = res.body['england-and-wales'].events;
    expect(events.length).toBeGreaterThan(5);
  });

  it('should include Easter date', async () => {
    const res = await spec().get('https://www.gov.uk/bank-holidays.json').expectStatus(200);
    const events = res.body['england-and-wales'].events;
    const easter = events.find(e => e.title.toLowerCase().includes('easter'));
    expect(easter).toBeDefined();
  });
});
const { spec } = require('pactum');

const words = ['love', 'book', 'time', 'world', 'light'];

describe('Dictionary API', () => {
  for (const word of words) {
    it(`should have example usage for '${word}'`, async () => {
      const res = await spec()
        .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .expectStatus(200);
      const hasExample = res.body.some(entry =>
        entry.meanings.some(m =>
          m.definitions.some(d => d.example)
        )
      );
      expect(hasExample).toBe(true);
    });
  }
});
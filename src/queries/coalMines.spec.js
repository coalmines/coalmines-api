import { filterByCity } from './coalMines';

const coalMinesFixture = [
  {
    name: 'Zeche Carl',
    location: {
      city: 'Essen',
    },
  },
  {
    name: 'Zeche Holland',
    location: {
      city: 'Bochum',
    },
  },
];

describe('filterByCity', () => {
  it('should filter out coal mines by city', () => {
    const result = filterByCity(coalMinesFixture, 'Essen');
    expect(result).toEqual([coalMinesFixture[0]]);
  });
});

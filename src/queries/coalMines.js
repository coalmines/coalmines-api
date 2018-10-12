import coalMinesFixture from '../fixtures/coalMines.json';

export const filterByCity = (mines, city) => (
  mines.filter(({ location }) => location.city === city)
);

export const coalMines = (_, { city }) => (
  city ? filterByCity(coalMinesFixture, city) : coalMinesFixture
);

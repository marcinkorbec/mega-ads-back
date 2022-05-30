import {AdRecord} from "../records/ad.record";

const defaultObj = {
  id: '0',
  name: 'Test Name',
  description: 'blacharze ram pam pam',
  lat: 9,
  lon: 9,
  url: 'https://wp.pl',
  price: 9,
};

test('Can build AdRecord', () => {
  const ad = new AdRecord(defaultObj);

  expect(ad.name).toBe('Test Name')
  expect(ad.description).toBe('blacharze ram pam pam')
  expect(ad.lat).toBe(9)
  expect(ad.lon).toBe(9)
  expect(ad.url).toBe('https://wp.pl')
  expect(ad.price).toBe(9)
})


test('Validates invalid price', () => {
  expect(()=> new AdRecord({
      ...defaultObj,
    price: -3,
    })).toThrow('Cena ogłoszenia nie może być mniejsza niż 0, lub większa niż 99 999 999')
});

test('Validates invalid name', () => {
  expect(()=> new AdRecord({
      ...defaultObj,
    name: '',
    })).toThrow('Nazwa ogłoszenia nie może być krósza niż 1 znak i dłuższa niż 100 znaków')
});

test('Validates invalid description', () => {
  expect(()=> new AdRecord({
      ...defaultObj,
    description: '..................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................',
    })).toThrow('Treść ogłoszenia nie może przekraczać 1000 znaków')
});
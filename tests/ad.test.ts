import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";

const defaultObject = {
  id: 'null',
  name: '[TDD test] Test Name',
  description: 'blacharze ram pam pam',
  price: 9,
  url: 'https://wp.pl',
  lat: 9,
  lon: 9,
}

afterAll(async ()=> {
  await pool.end();
})

test('AdRecord returns data from database for one entry.', async ()=> {
  const ad = await AdRecord.getOne('abc');

  expect(ad).toBeDefined();
  expect(ad.id).toBe('abc');
  expect(ad.name).toBe('Testowa')
});

test('AdRecord returns null from database for unexisting entry.', async ()=> {
  const ad = await AdRecord.getOne('---');
  expect(ad).toBeNull();
});

test('AdRecord.findAll returns array of found entries.', async ()=> {
  const ads = await AdRecord.findAll('');
  expect(ads).not.toEqual([]);
  expect(ads[0].id).toBeDefined()
});

test('AdRecord.findAll returns array of found entries when searching for "a".', async ()=> {
  const ads = await AdRecord.findAll('a');
  expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns empty array when searching for something that does not exist.', async ()=> {
  const ads = await AdRecord.findAll('-----------------------------------------------------');
  expect(ads).toEqual([]);
})

test('AdRecord.insert returns UUID.', async ()=> {
  const ad = new AdRecord(defaultObject);

  await ad.insert();
  expect(ad.id).toBeDefined();
  expect(typeof ad.id).toBe('string')
})

test('AdRecord.insert inserts data to database.', async () => {
  const ad = new AdRecord(defaultObject);
  await ad.insert();
  const foundAd = await AdRecord.getOne(ad.id);
  console.log(foundAd);
  expect(foundAd).toBeDefined();
  expect(foundAd).not.toBeNull();
  expect(foundAd.id).toBe(ad.id);
})
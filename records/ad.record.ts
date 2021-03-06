import {AdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";


type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {

  public id: string;
  public description: string;
  public lat: number;
  public lon: number;
  public name: string;
  public price: number;
  public url: string;

  constructor(obj: AdEntity) {
    if(!obj.name || obj.name.length > 100) {
      throw new ValidationError('Nazwa ogłoszenia nie może być krósza niż 1 znak i dłuższa niż 100 znaków');
    }

    if(obj.description.length > 1000) {
      throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków');
    }

    if (obj.price < 0 || obj.price > 999999999) {
      throw new ValidationError('Cena ogłoszenia nie może być mniejsza niż 0, lub większa niż 99 999 999');
    }

    //@TODO: Check if URL is valid!
    if(!obj.url || obj.url.length > 300) {
      throw new ValidationError('Link ogłoszenia nie może być pusty, ani przekraczać 300 znaków');
    }

    if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
      throw new ValidationError('Nie można zlokalizować ogłoszenia.')
    }

    this.id = obj.id;
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.lat = obj.lat;
    this.lon = obj.lon;
    this.url = obj.url;
  }

  static async getOne(id: string): Promise<AdRecord | null> {
    const [results] = await pool.execute("SELECT * FROM `ads` where id = :id", {
      id,
    }) as AdRecordResults;
    // console.log(results)
    return results.length === 0 ? null : new AdRecord(results[0]);
  }

  static async findAll(name: string): Promise<SimpleAdEntity[]> {
    const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
      search: `%${name}%`,
    }) as AdRecordResults;

    return results.map(result => {
      const {id, lat, lon} = result;
      return {id, lat, lon}
    });
  }

  async insert(): Promise<void> {
    if (!this.id) {
      this.id = uuid();
    } else {
      throw new Error('Cannot insert something that is already inserted.')
    }

    const [added] = await pool.execute("INSERT INTO `ads`(`id`, `name`, `description`, `price`,  `url`, `lat`, `lon`) VALUES(:id, :name, :description, :price, :url, :lat, :lon)", this)
  }
}
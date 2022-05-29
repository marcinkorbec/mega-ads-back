import {AdEntity} from "../types";
import {ValidationError} from "../utils/error";

interface NewAdEntity extends Omit<AdEntity, 'id'> {
  id?: string;
}

export class AdRecord implements AdEntity {
  public description: string;
  public id: string;
  public lat: number;
  public lon: number;
  public name: string;
  public price: number;
  public url: string;

  constructor(obj: AdEntity) {
    if(!obj.name || obj.name.length >100) {
      throw new ValidationError('Nazwa ogłoszenia nie może być krósza niż 1 znak i dłuższa niż 100 znaków');
    }

    if(obj.description.length > 1024) {
      throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków');
    }

    if (obj.price < 0 || obj.price > 999999999) {
      throw new ValidationError('Cena ogłoszenia nie może być mniejsza niż 0, lub większa niż 99 999 999');
    }

    //@TODO: Check if URL is valid!
    if(!obj.url || obj.url.length >100) {
      throw new ValidationError('Link ogłoszenia nie może być pusty, ani przekraczać 100 znaków');
    }

    if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
      throw new ValidationError('Nie można zlokalizować ogłoszenia.')
    }
  }

}
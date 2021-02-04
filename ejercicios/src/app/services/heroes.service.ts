import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class HeroesService {


  private  url= "https://crud-rest-angular-default-rtdb.firebaseio.com";

  constructor( private http: HttpClient) { }


  // Método para crear Objeto Héroe
  createHeroe(heroe: HeroeModel) {
    return this.http.post(`${ this.url }/heroes.json`,heroe)
    .pipe(
      map( (resp: any) => {
        heroe.id = resp.name;
        return heroe;
      })
    ); 
  }

  // Actualizar objeto Héroe    
  updateHeroe(heroe: HeroeModel) {

    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;    
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroe);     
  }

  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
    .pipe(
      map( this.crearArreglo),
      delay(1500)
    );
  }

  private crearArreglo (heroesObj: object) {
   const heroes: HeroeModel[] = [];

   console.warn(heroesObj);
   if(heroesObj === null) { return []; }

   Object.keys( heroesObj ).forEach( key => {

    const heroe: HeroeModel = heroesObj[key];
    heroe.id = key;

    heroes.push( heroe );
  });

  return heroes; 

  }

  deleteHeroe(id: string) {
    return this.http.delete(`${this.url}/heroes/${ id }.json` );
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  heroe: HeroeModel = new HeroeModel();

  constructor(private heroesService: HeroesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo') {
      this.heroesService.getHeroe( id )
      .subscribe ( (resp: HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = id;
      });

    }
    console.log(id);

  }

  guardar( form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no valido');
      return;

    }

   Swal.fire({
      title: 'Espere',
      text: 'Guardando Información',
      icon: 'info',
      allowOutsideClick: false 
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if(this.heroe.id) {
     peticion = this.heroesService.updateHeroe(this.heroe);     
    } else {
     peticion = this.heroesService.createHeroe(this.heroe);     
    }

    peticion.subscribe ( resp => {


      
      Swal.fire({
        title: this.heroe.nombre,
        text: 'Se actualizó correctamente',
        icon: 'success'
      });
      
    });
 
  }

}

import { Component, OnInit } from '@angular/core';
import { IMovie } from '../share/interfaces';
import { MoviedbService } from '../core/moviedbservice.service';
import { Router } from '@angular/router';
import { DetailsPage } from '../details/details.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage implements OnInit {
  public movies: IMovie[];
  moviesinit: IMovie[] = [
    {
      id: '1',
      name: 'EL padrino',
      genre: 'Grangsteres, Drama',
      date: '1972',
      cover: 'https://pics.filmaffinity.com/El_padrino-993414333-large.jpg / 250px- The_Godfather_movie_logo.png',
      description: "El Padrino (título original en inglés: The Godfather) es una película estadounidense de 1972 dirigida por Francis Ford Coppola.El filme fue producido por Albert S.Ruddy, de la compañía Paramount Pictures.Está basada en la novela homónima(que a su vez está basada en la familia real de los Mortillaro de Sicilia), de Mario Puzo, quien adaptó el guion junto a Coppola y Robert Towne, este último sin ser acreditado"
    },
    {
      id: '2',
      name: 'Kill Bill',
      genre: 'acción, película de violación y venganza y artes marciales',
      date: '2003',
      cover:'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSLEDQc8prIXhkGkrGxOpa2WlM77G-1NblEPOyl7Jy0vTBYXxB7 / 800px - Kill_Bill_svg_logo.svg.png',
      description: "Kill Bill es una película de acción y suspenso estadounidense de dos partes estrenada en 2003 y 2004 respectivamente, que fue escrita y dirigida por Quentin Tarantino.Kill Bill originalmente fue propuesta para tener un lanzamiento único en los cines, pero con una duración de más de cuatro horas, fue separada en dos volúmenes: Kill Bill: Volumen 1, lanzada a finales de 2003, y Kill Bill: Volumen 2, lanzada a inicios de 2004. Las dos películas fueron bien recibidas por la crítica, muchos notando su estilo de dirección y su homenaje a géneros cinematográficos como las películas de artes marciales hongkonesa, las películas de samuráis, spaghetti western, chicas con armas y venganza."
}
 ]
constructor(private moviedbService: MoviedbService, private route:
  Router) { }
ngOnInit(): void {
  // If the database is empty set initial values
  this.inicialization();
}
ionViewDidEnter(){
  // Remove elements if it already has values
  if (this.movies !== undefined) {
    this.movies.splice(0);
  }
  this.retrieveValues();
}
inicialization() {
  if (this.moviedbService.empty()) {
    this.moviesinit.forEach(movie => {
      this.moviedbService.setItem(movie.id, movie);
    });
  }
}
retrieveValues(){
  // Retrieve values
  this.moviedbService.getAll().then(
    (data) => this.movies = data
  );
}
movieTapped(movie) {
  this.route.navigate(['details', movie.id]);
}
}
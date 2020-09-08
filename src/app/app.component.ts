import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiModel, HeroModel} from './models/heroes-model';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mscc-pwa-demo';
  herosList: Array<HeroModel> = [];
  constructor(private http$: HttpClient) {
  }

  ngOnInit(): void {
    this.http$.get('https://www.superheroapi.com/api.php/10223154308827957/search/a').subscribe((response: ApiModel) => {
      console.log(response.results);
      this.herosList = response.results;
    });
  }
}

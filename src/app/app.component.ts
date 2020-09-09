import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiModel, HeroModel} from './models/heroes-model';
import {SwUpdate} from '@angular/service-worker';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmComponent} from './dialogs/confirm/confirm.component';
import {Subscription} from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'mscc-pwa-demo';
  herosList: Array<HeroModel> = [];
  swSubscription: Subscription;
  heroesSubscription: Subscription;

  constructor(private http$: HttpClient, private swUpdate: SwUpdate, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log('Init app');
    if(this.swUpdate.isEnabled) {
      this.swSubscription = this.swUpdate.available.subscribe((swResponse) => {
        this.openModal();
        /*if(confirm('New Version is available, Load it?')) {
          window.location.reload();
        }*/
      });
    }


    //https://www.superheroapi.com/api.php/10223154308827957/search/a
    this.heroesSubscription = this.http$.get('assets/data.json').subscribe((response: ApiModel) => {

      this.herosList = response.results;
      this.herosList.forEach((hero) => {
        hero.image.url = 'assets/' +  hero.image.url.split('/')[hero.image.url.split('/').length -1];
       // console.log('curl ' + hero.image.url + ' --output ' + hero.image.url.split('/')[hero.image.url.split('/').length -1]);
      });
      console.log(response.results);
    });
  }

  ngOnDestroy(): void {
    this.swSubscription.unsubscribe();
    this.heroesSubscription.unsubscribe();
  }

  private openModal(): void {
    const dialogRef = this.dialog.open(ConfirmComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        window.location.reload();
      }
    });
  }
}


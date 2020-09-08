import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiModel, HeroModel} from './models/heroes-model';
import {SwUpdate} from '@angular/service-worker';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmComponent} from './dialogs/confirm/confirm.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mscc-pwa-demo';
  herosList: Array<HeroModel> = [];
  constructor(private http$: HttpClient, private swUpdate: SwUpdate, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log('Init app');
    if(this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((swResponse) => {
        this.openModal();
        if(confirm('New Version is available, Load it?')) {
          window.location.reload();
        }
      });
    }

    this.http$.get('https://www.superheroapi.com/api.php/10223154308827957/search/a').subscribe((response: ApiModel) => {
      console.log(response.results);
      this.herosList = response.results;
    });
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


import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TopMenuComponent } from './menu/top-menu/top-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopMenuComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Shoppers Mart';
}

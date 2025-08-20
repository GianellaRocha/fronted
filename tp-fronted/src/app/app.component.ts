import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenTimeoutService } from './services/tokenTimeout.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private tokenTimeoutService: TokenTimeoutService) {}
  title = 'pedidos-ya';
}

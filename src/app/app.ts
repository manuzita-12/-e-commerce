import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { usuarioLogado, login, logout } from './core/auth';
import { MatButtonModule } from '@angular/material/button';
import { Header } from './shared/layout/header/header';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, UpperCasePipe, MatButtonModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 protected readonly title = signal('e-commerce');
 nomeLoja = 'loja Da Manuzita';
 usuarioLogado = usuarioLogado;
 login = login;
 logout = logout; 
}

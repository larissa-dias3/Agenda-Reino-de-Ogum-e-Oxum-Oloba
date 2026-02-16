import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecalho } from './nucleo/layout/cabecalho/cabecalho';
import { Agenda } from './recursos/agenda/agenda';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Cabecalho, Agenda],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}

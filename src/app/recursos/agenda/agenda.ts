import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AgendaModel } from './modelos/agenda.interface';

@Component({
  selector: 'app-agenda',
  imports: [],
  templateUrl: './agenda.html',
  styleUrl: './agenda.css',
})
export class Agenda implements OnInit {
  readonly #http = inject(HttpClient);

  agenda = signal<AgendaModel[]>([]);

  hoje = signal<number>(new Date().getDate());
  mesNumero = signal<number | undefined>(undefined);
  proximoEvento = signal<number | undefined>(undefined);

  ngOnInit(): void {
    this.#http.get<AgendaModel[]>('/app.json').subscribe((data) => {
      this.agenda.set(data);

      encotrarProximoEvento: for (let item of this.agenda()) {
        for (let mes of item.meses) {
          for (let dia of mes.dias) {
            if (dia.numero >= this.hoje()) {
              this.mesNumero.set(mes.numero);
              this.proximoEvento.set(dia.numero);
              break encotrarProximoEvento;
            }
          }
        }
      }
    });
  }
}

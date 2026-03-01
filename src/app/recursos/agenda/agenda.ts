import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AgendaModel } from './modelos/agenda.interface';
import { StringToNumberPipe } from '../../pipes/string-to-number-pipe';

@Component({
  selector: 'app-agenda',
  imports: [StringToNumberPipe],
  templateUrl: './agenda.html',
  styleUrl: './agenda.css',
})
export class Agenda implements OnInit {
  readonly #http = inject(HttpClient);

  agenda = signal<AgendaModel[]>([]);

  hoje = signal<Date>(new Date(new Date().setHours(0, 0, 0, 0)));
  mesAtual = signal<number>(new Date().getMonth() + 1);
  mesNumero = signal<number | undefined>(undefined);
  proximoEvento = signal<number | undefined>(undefined);

  ngOnInit(): void {
    this.#http.get<AgendaModel[]>('/reino-de-ogum-e-oxum/app.json').subscribe((data) => {
      this.agenda.set(data);

      encotrarProximoEvento: for (let item of this.agenda()) {
        for (let mes of item.meses) {
          for (let dia of mes.dias) {
            const eventoData = new Date(item.ano, Number(mes.numero) - 1, Number(dia.numero));
            // Verifica se o mês é posterior ao atual, ou se é o mesmo mês e o dia é maior ou igual
            if (eventoData.getTime() >= this.hoje().getTime()) {
              this.mesNumero.set(Number(mes.numero));
              this.proximoEvento.set(Number(dia.numero));
              break encotrarProximoEvento;
            }
          }
        }
      }
    });
  }
}

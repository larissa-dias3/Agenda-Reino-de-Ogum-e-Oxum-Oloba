export interface AgendaModel {
    ano: number;
    meses: Mes[];
}

export interface Mes {
    nome: string;
    numero: number;
    dias: Dia[];
}

export interface Dia {
    numero: number;
    nome: string;
    tarefa: string;
}
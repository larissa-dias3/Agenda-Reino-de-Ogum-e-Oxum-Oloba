export interface AgendaModel {
    ano: number;
    meses: Mes[];
}

export interface Mes {
    nome: string;
    numero: string;
    dias: Dia[];
}

export interface Dia {
    numero: string;
    nome: string;
    tarefa: string;
}
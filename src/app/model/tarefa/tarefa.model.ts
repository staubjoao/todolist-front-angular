import { Categoria } from "../categoria/categoria.model";

export interface Tarefa {
  id?: number,
  titulo: string,
  descricao: string,
  concluido: boolean,
  ativa: boolean,
  dataCriacao: string,
  dataAlteracao: string,
  categoria: Categoria,
  status: string,
}

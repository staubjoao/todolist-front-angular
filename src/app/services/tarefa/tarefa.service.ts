import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TarefaDTO } from '../../model/tarefa/tarrefa-dto.model';
import { Tarefa } from '../../model/tarefa/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private apiUrl: string = environment.apiUrl + '/tarefa';

  constructor(private http: HttpClient) { }

  obterTarefaPorId(id: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
  }

  alterarTarefa(tarefaDTO: TarefaDTO, id: number): Observable<Tarefa> {
    return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, tarefaDTO);
  }

  deletarTarefa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  obterTodasTarefas(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.apiUrl}`);
  }

  salvarNovaTarefa(tarefaDTO: TarefaDTO): Observable<Tarefa> {
    return this.http.post<Tarefa>(`${this.apiUrl}`, tarefaDTO);
  }

  manipularTarefa(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/manipular-atividade`, id);
  }

  concluirTarefa(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/concluir`, id);
  }

  obterTodasTarefasPorCategoria(idCategoria: number): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${this.apiUrl}/categoria/${idCategoria}`);
  }

}

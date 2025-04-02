import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../../model/categoria/categoria.model';
import { CategoriaDTO } from '../../model/categoria/categoria-dto.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl: string = environment.apiUrl + '/categoria';

  constructor(private http: HttpClient) { }

  obterCategoriaPorId(id: number): Observable<Categoria> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  alterarCategoria(categoriaDTO: CategoriaDTO, id: number): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoriaDTO);
  }

  deletarCategoria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  obeterTodasCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}`);
  }

  salvarNovaCategoria(categoriaDTO: CategoriaDTO): Observable<Categoria> {
    return this.http.post<Categoria>(`${this.apiUrl}`, categoriaDTO);
  }

}

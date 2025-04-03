import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CategoriaDTO } from '../../../model/categoria/categoria-dto.model';
import { MessageService } from 'primeng/api';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Categoria } from '../../../model/categoria/categoria.model';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    TextareaModule,
    ButtonModule,
  ],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.css'
})
export class CategoriaFormComponent {
  @Output() categoriaAdicionada = new EventEmitter<Categoria>();

  nome: string = '';
  descricao: string = '';

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService
  ) {}

  salvar() {
    const categoriaDTO: CategoriaDTO = {
      nome: this.nome,
      descricao: this.descricao
    };

    this.categoriaService.salvarNovaCategoria(categoriaDTO).subscribe({
      next: (categoriaCriada) => {
        this.categoriaAdicionada.emit(categoriaCriada);

        this.nome = '';
        this.descricao = '';

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Categoria adicionada com sucesso!'
        });
      },
      error: (erro) => {
        console.error('Erro ao salvar categoria:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao adicionar categoria'
        });
      }
    });
  }
}

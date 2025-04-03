import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class CategoriaFormComponent implements OnInit {
  @Input() categoriaParaEdicao: Categoria | null = null;
  @Output() categoriaAdicionada = new EventEmitter<Categoria>();
  @Output() categoriaAtualizada = new EventEmitter<Categoria>();

  modoEdicao: boolean = false;
  nome: string = '';
  descricao: string = '';

  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.carregarDadosParaEdicao();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoriaParaEdicao']) {
      this.carregarDadosParaEdicao();
    }
  }

  carregarDadosParaEdicao(): void {
    if (this.categoriaParaEdicao) {
      this.modoEdicao = true;
      this.nome = this.categoriaParaEdicao.nome;
      this.descricao = this.categoriaParaEdicao.descricao || '';
    } else {
      this.modoEdicao = false;
      this.nome = '';
      this.descricao = '';
    }
  }

  salvar() {
    const categoriaDTO: CategoriaDTO = {
      nome: this.nome,
      descricao: this.descricao
    };

    if (this.modoEdicao) {
      if (this.categoriaParaEdicao?.id !== undefined) {
        this.atualizarCategoria(categoriaDTO, this.categoriaParaEdicao.id);
      } else {
        console.error('Erro: ID da categoria para edição é inválido.');
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'ID da categoria para edição é inválido.'
        });
      }
    } else {
      this.criarNovaCategoria(categoriaDTO);
    }

  }

  criarNovaCategoria(categoriaDTO: CategoriaDTO) {
    this.categoriaService.salvarNovaCategoria(categoriaDTO).subscribe({
      next: (categoriaCriada) => {
        console.log('Categoria criada:', categoriaCriada);
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

  atualizarCategoria(categoriaDTO: CategoriaDTO, idCategoria: number) {
    this.categoriaService.alterarCategoria(categoriaDTO, idCategoria).subscribe({
      next: (categoriaCriada) => {
        console.log('Categoria atualizada:', categoriaCriada);
        this.categoriaAtualizada.emit(categoriaCriada);
        this.nome = '';
        this.descricao = '';

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Categoria atualizada com sucesso!'
        });
      },
      error: (erro) => {
        console.error('Erro ao salvar categoria:', erro);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao atualizar a categoria'
        });
      }
    });
  }

}

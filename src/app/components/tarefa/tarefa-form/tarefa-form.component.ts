import { TarefaService } from './../../../services/tarefa/tarefa.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';
import { TarefaDTO } from '../../../model/tarefa/tarrefa-dto.model';
import { Categoria } from '../../../model/categoria/categoria.model';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { StatusTarefa } from '../../../enums/tarefa-status.enum';
import { Tarefa } from '../../../model/tarefa/tarefa.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-tarefa-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    DatePickerModule,
    TextareaModule,
    ButtonModule,
    SelectModule,
    DropdownModule
  ],
  templateUrl: './tarefa-form.component.html',
  styleUrl: './tarefa-form.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TarefaFormComponent implements OnInit {
  @Input() tarefaParaEdicao: Tarefa | null = null;
  @Output() tarefaAdicionada = new EventEmitter<Tarefa>();
  @Output() tarefaAtualizada = new EventEmitter<Tarefa>();

  modoEdicao: boolean = false;
  titulo: string = '';
  descricao: string = '';
  categoriaSelecionada: Categoria | undefined;
  status: string = '';
  dataFinal: string = '';
  categoriaLista: Categoria[] = [];
  mostrarAddTarefa: boolean = true;
  statusLista = Object.entries(StatusTarefa).map(([value, label]) => ({ value, label }));

  constructor(private categoriaService: CategoriaService,
    private tarefaService: TarefaService,
    private messageService: MessageService
  ) {
    console.log(this.statusLista);
  }

  ngOnInit(): void {
    this.categoriaService.obeterTodasCategorias().subscribe((categorias: Categoria[]) => {
      this.categoriaLista = categorias;
      console.log(this.categoriaLista);
    });

    this.carregarDadosParaEdicao();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tarefaParaEdicao']) {
      this.carregarDadosParaEdicao();
    }
  }

  carregarDadosParaEdicao(): void {
    if (this.tarefaParaEdicao) {
      this.titulo = this.tarefaParaEdicao.titulo;
      this.descricao = this.tarefaParaEdicao.descricao;
      this.categoriaSelecionada = this.tarefaParaEdicao.categoria;
      this.status = this.tarefaParaEdicao.status;
      const data = new Date(this.tarefaParaEdicao.dataFinal);
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      const horas = String(data.getHours()).padStart(2, '0');
      const minutos = String(data.getMinutes()).padStart(2, '0');
      this.dataFinal = `${dia}/${mes}/${ano} ${horas}:${minutos}`;
      this.modoEdicao = true;
    } else {
      this.limparCampos();
      this.modoEdicao = false;
    }
  }

  alteraVisualizacao(valor: boolean) {
    this.mostrarAddTarefa = valor;
  }

  salvar() {
    const dataFinalFormatada = new Date(this.dataFinal);

    const pad = (num: number) => num.toString().padStart(2, '0');

    const ano = dataFinalFormatada.getFullYear();
    const mes = pad(dataFinalFormatada.getMonth() + 1);
    const dia = pad(dataFinalFormatada.getDate());
    const horas = pad(dataFinalFormatada.getHours());
    const minutos = pad(dataFinalFormatada.getMinutes());
    const segundos = pad(dataFinalFormatada.getSeconds());

    const dataFinalISO = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;

    const tarefaDTO: TarefaDTO = {
      titulo: this.titulo,
      descricao: this.descricao,
      idCategoria: this.categoriaSelecionada?.id || 0,
      status: this.status,
      dataFinal: dataFinalISO
    };

    console.log(tarefaDTO);

    if (this.modoEdicao) {
      if (this.tarefaParaEdicao?.id !== undefined) {
        this.atualizarTarefa(tarefaDTO, this.tarefaParaEdicao.id);
      } else {
        console.error('Erro: ID da tarefa para edição é inválido.');
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'ID da tarefa para edição é inválido.'
        });
      }
    } else {
      this.criarNovaTarefa(tarefaDTO);
    }
  }

  criarNovaTarefa(tarefaDTO: TarefaDTO) {
    this.tarefaService.salvarNovaTarefa(tarefaDTO).subscribe({
      next: (tarefa) => {
        this.tarefaAdicionada.emit(tarefa);

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tarefa adicionada com sucesso!'
        });
        this.limparCampos();
      },
      error: (erro) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao adicionar a tarefa'
        });
      }
    });
  }

  atualizarTarefa(tarefaDTO: TarefaDTO, idTarefa: number) {
    this.tarefaService.alterarTarefa(tarefaDTO, idTarefa).subscribe({
      next: (tarefa) => {
        this.tarefaAtualizada.emit(tarefa);

        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Tarefa atualizada com sucesso!'
        });
        this.limparCampos();
      },
      error: (erro) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Falha ao atualizar a tarefa'
        });
      }
    });
  }

  limparCampos() {
    this.titulo = '';
    this.descricao = '';
    this.categoriaSelecionada = undefined;
    this.status = '';
    this.dataFinal = '';
  }

}

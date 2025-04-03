import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit, Output } from '@angular/core';
import { TarefaDTO } from '../../model/tarefa/tarrefa-dto.model';
import { Categoria } from '../../model/categoria/categoria.model';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { StatusTarefa } from '../../enums/tarefa-status.enum';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DropdownModule } from 'primeng/dropdown';


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
  @Output() onAddTask = new EventEmitter<TarefaDTO>();

  titulo: string = '';
  descricao: string = '';
  categoriaSelecionada: Categoria | undefined;
  status: string = '';
  dataFinal: string = '';
  categoriaLista: Categoria[] = [];
  mostrarAddTarefa: boolean = true;
  statusLista = Object.entries(StatusTarefa).map(([value, label]) => ({ value, label }));

  constructor() {
    console.log(this.statusLista);
  }

  ngOnInit(): void {
    // this.categoriaLista = [
    //   { id: 1, nome: 'Trabalho', descricao: 'Tarefas relacionadas ao trabalho', dataCriacao: '2023-01-01', dataAlteracao: '2023-01-01' },
    //   { id: 2, nome: 'Pessoal', descricao: 'Tarefas pessoais', dataCriacao: '2023-01-01', dataAlteracao: '2023-01-01' },
    //   { id: 3, nome: 'Estudo', descricao: 'Tarefas de estudo', dataCriacao: '2023-01-01', dataAlteracao: '2023-01-01' }
    // ];
  }

  alteraVisualizacao(valor: boolean) {
    this.mostrarAddTarefa = valor;
  }

  adicionarNovaCategoria() {
    console.log('Adicionar nova categoria');
  }

  onSubmit() {
    const tarefaDTO: TarefaDTO = {
      titulo: this.titulo,
      descricao: this.descricao,
      idCategoria: this.categoriaSelecionada?.id || 0,
      status: this.status,
      dataFinal: this.dataFinal
    };

    console.log(tarefaDTO);

    this.onAddTask.emit(tarefaDTO);
    this.titulo = '';
    this.descricao = '';
    this.categoriaSelecionada = undefined;
    this.status = StatusTarefa.PENDENTE;
    this.dataFinal = '';
  }

}

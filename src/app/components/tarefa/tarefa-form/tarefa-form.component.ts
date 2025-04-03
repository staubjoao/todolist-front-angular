import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, OnInit, Output } from '@angular/core';
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

  titulo: string = '';
  descricao: string = '';
  categoriaSelecionada: Categoria | undefined;
  status: string = '';
  dataFinal: string = '';
  categoriaLista: Categoria[] = [];
  mostrarAddTarefa: boolean = true;
  statusLista = Object.entries(StatusTarefa).map(([value, label]) => ({ value, label }));

  constructor(private categoriaService: CategoriaService) {
    console.log(this.statusLista);
  }

  ngOnInit(): void {
    this.categoriaService.obeterTodasCategorias().subscribe((categorias: Categoria[]) => {
      this.categoriaLista = categorias;
      console.log(this.categoriaLista);
    });
  }

  alteraVisualizacao(valor: boolean) {
    this.mostrarAddTarefa = valor;
  }

  adicionarNovaCategoria() {
    console.log('Adicionar nova categoria');
  }

  salvar() {
    const tarefaDTO: TarefaDTO = {
      titulo: this.titulo,
      descricao: this.descricao,
      idCategoria: this.categoriaSelecionada?.id || 0,
      status: this.status,
      dataFinal: this.dataFinal
    };

    console.log(tarefaDTO);

    this.titulo = '';
    this.descricao = '';
    this.categoriaSelecionada = undefined;
    this.status = StatusTarefa.PENDENTE;
    this.dataFinal = '';
  }

}

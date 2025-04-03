import { Component } from '@angular/core';
import { TarefaFormComponent } from "../tarefa-form/tarefa-form.component";
import { HeaderComponent } from '../../header/header.component';
import { Tarefa } from '../../../model/tarefa/tarefa.model';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TarefaService } from '../../../services/tarefa/tarefa.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-tarefa-lista',
  standalone: true,
  imports: [
    HeaderComponent,
    TarefaFormComponent,
    TableModule,
    ButtonModule],
  templateUrl: './tarefa-lista.component.html',
  styleUrl: './tarefa-lista.component.css'
})
export class TarefaListaComponent {

  tarefas: Tarefa[] = [];
  tarefaParaEdicao: Tarefa | null = null;

  loading: boolean = true;

  constructor(private tarefaService: TarefaService,
      private confirmationService: ConfirmationService,
      private messageService: MessageService
    ) {}

    ngOnInit(): void {
      this.carregarTodasTarefas();
    }

    carregarTodasTarefas() {
      this.loading = true;
      this.tarefaService.obterTodasTarefas().subscribe((tarefas: Tarefa[]) => {
        this.tarefas = tarefas;
        this.loading = false;
        console.log(tarefas)
      });
    }

    confirmarExclusao(tarefaId: number) {
      this.confirmationService.confirm({
        message: 'Tem certeza que deseja excluir esta tarefa?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.tarefaService.deletarTarefa(tarefaId).subscribe({
            next: () => {
              this.tarefas = this.tarefas.filter(categoria => categoria.id !== tarefaId);
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Tarefa excluída com sucesso!'
              });
            }
          });
        }
      });
    }

    alterarTarefa(tarefa: Tarefa) {
    this.tarefaParaEdicao = tarefa;
  }

  onCategoriaAdicionada(novaTarefa: Tarefa): void {
    this.tarefas = [novaTarefa, ...this.tarefas];
  }

  onCategoriaAtualizada(tarefaAtualizada: Tarefa): void {
    this.tarefas = this.tarefas.map(c =>
      c.id === tarefaAtualizada.id ? tarefaAtualizada : c
    );
    this.tarefaParaEdicao = null;
  }
}

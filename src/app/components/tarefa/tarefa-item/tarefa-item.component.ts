import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarefa } from '../../model/tarefa/tarefa.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tarefa-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarefa-item.component.html',
  styleUrl: './tarefa-item.component.css'
})
export class TarefaItemComponent {

  @Input() tarefa!:Tarefa;
  @Output() onDeleteTask = new EventEmitter<Tarefa>();
  @Output() onToggleConcluido = new EventEmitter<Tarefa>();

  onDelete(tarefa: Tarefa){
    this.onDeleteTask.emit(tarefa);
  }

  onToggle(tarefa: Tarefa){
    this.onToggleConcluido.emit(tarefa);
  }

}

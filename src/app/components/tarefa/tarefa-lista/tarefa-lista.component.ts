import { Component } from '@angular/core';
import { TarefaFormComponent } from "../tarefa-form/tarefa-form.component";
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-tarefa-lista',
  standalone: true,
  imports: [HeaderComponent, TarefaFormComponent],
  templateUrl: './tarefa-lista.component.html',
  styleUrl: './tarefa-lista.component.css'
})
export class TarefaListaComponent {

}

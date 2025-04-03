import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TarefaFormComponent } from './components/tarefa-form/tarefa-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, TarefaFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}

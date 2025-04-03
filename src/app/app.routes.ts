import { Routes } from '@angular/router';
import { TarefaListaComponent } from './components/tarefa/tarefa-lista/tarefa-lista.component';
import { CategoriaListaComponent } from './components/categoria/categoria-lista/categoria-lista.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tarefas' },
  { path: 'tarefas', component: TarefaListaComponent },
  { path: 'categorias', component: CategoriaListaComponent },
  { path: '**', redirectTo: 'tarefas' }
];

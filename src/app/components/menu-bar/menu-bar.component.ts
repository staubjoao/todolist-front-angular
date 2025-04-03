import { MenubarModule } from 'primeng/menubar';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.css'
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[] | undefined;

  // constructor(private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Tarefa',
        icon: 'pi pi-list',
        routerLink: '/tarefas'
      },
      {
        label: 'Categorias',
        icon: 'pi pi-tags',
        routerLink: '/categorias'
      },
    ]
  }

}

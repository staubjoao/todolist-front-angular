import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { CategoriaFormComponent } from "../categoria-form/categoria-form.component";
import { Categoria } from '../../../model/categoria/categoria.model';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-categoria-lista',
  standalone: true,
  imports: [
    HeaderComponent,
    CategoriaFormComponent,
    TableModule,
    ButtonModule
],
  templateUrl: './categoria-lista.component.html',
  styleUrl: './categoria-lista.component.css'
})
export class CategoriaListaComponent implements OnInit {

  categorias: Categoria[] = [];

  loading: boolean = true;

  constructor(private categoriaService: CategoriaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.carregarTodasCategorias();
  }

  carregarTodasCategorias() {
    this.loading = true;
    this.categoriaService.obeterTodasCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
      this.loading = false;
    });
  }

  confirmarExclusao(categoriaId: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir esta categoria?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.categoriaService.deletarCategoria(categoriaId).subscribe({
          next: () => {
            this.categorias = this.categorias.filter(categoria => categoria.id !== categoriaId);
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Categoria excluída com sucesso!'
            });
          }
        });
      }
    });
  }

  onCategoriaAdicionada(novaCategoria: Categoria): void {
    this.categorias = [novaCategoria, ...this.categorias];
  }
}

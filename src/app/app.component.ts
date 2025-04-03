import { Component } from '@angular/core';
import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MenuBarComponent,
    RouterOutlet,
    ToastModule,
    ConfirmDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}

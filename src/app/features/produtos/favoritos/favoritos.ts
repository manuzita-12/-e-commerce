import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FavoritoService } from '../../../core/services/favoritos.service';
import { MatAnchor } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, RouterLink, MatAnchor],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css',
})
export class Favoritos {
  private favoritoService = inject(FavoritoService);

  favorito = this.favoritoService.favorito;

  removerFavorito(item: string) {
    this.favoritoService.removerItem(item);
  }
}
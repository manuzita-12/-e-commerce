import { Component } from '@angular/core';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule, MatAnchor} from '@angular/material/button';
import { RouterLink, Router } from '@angular/router';
import { inject } from '@angular/core';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { AuthFacade } from '../../../core/facades/auth.facade';


@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatAnchor, MatToolbarModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
   nomeLoja = 'loja Da Manuzita';
   private carrinhoFacade = inject(CarrinhoFacade);
   quantidadeHeader = this.carrinhoFacade.quantidadeCarrinho;

   private authFacade = inject(AuthFacade);
   usuarioLogado = this.authFacade.usuarioLogado;
   usuarioAtual = this.authFacade.usuarioAtual;

   private router = inject(Router);

   sair(){
    this.authFacade.sair();
    this.router.navigateByUrl('/login');
   }
}
   
import { Component, Input, Output, EventEmitter } from '@angular/core';
import {UpperCasePipe,  CurrencyPipe} from '@angular/common';
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ItemCarrinho } from '../../../core/models/item-carrinho';

@Component({
  selector: 'app-produto',
  imports: [UpperCasePipe, PrecoFormatadoPipe, MatButtonModule, MatCardModule],
  templateUrl: './produto.html',
  styleUrl: './produto.css',
})
export class Produto {
//Entrada de dados de lista Produtos em lista-produtos
@Input() nome: string ='';
@Input() preco: number = 0;
@Input() isFavorito: boolean = false;

//saida de dados de Produtos selecionados para lista-produtos
@Output() produtoSelecionado = new EventEmitter<string>();
@Output() produtoAdicionado = new EventEmitter<ItemCarrinho>();
@Output() produtoFavoritado = new EventEmitter<string>();

selecionarProduto(){
  this.produtoSelecionado.emit(this.nome);
 }

 adicionarAoCarrinho(){
  this.produtoAdicionado.emit({
nome:this.nome,
preco:this.preco,
  });
 }
 
 favoritarProduto() {
  this.produtoFavoritado.emit(this.nome);
 }
}

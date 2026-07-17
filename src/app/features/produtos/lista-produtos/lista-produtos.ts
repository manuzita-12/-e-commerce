import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import  {signal} from "@angular/core";
import {computed} from "@angular/core"
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal([
    {nome: 'Teclado ' , preco:229.99},
    {nome: 'Mouse ' , preco:129.99},
    {nome: 'Monitor ' , preco:2000},
    {nome: 'Desktop ' , preco:4999.99},
    {nome: 'Headset ' , preco:500}
  ]);
  //!função para exibir produtos selecionados pelo usuário no console
  exibirProduto(nome: string){
    console.log('Produto Selecionado: ',nome);
  }
  //função que adiciona produto usando metodo update
  adicionarProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual,
      {nome:'Playstation 5', preco:3000},
    ]);
  }
  //!função que contabiliza quantidade de itens de produtos na lista com metodo computed
  totalProdutos = computed(() => this.produtos().length); 
  //função que calcula o valor total dos produtos usando o metodo computed()
  valorTotal = computed(()=>
  {return this.produtos().reduce((total, item) =>
  total + item.preco,0)});
}

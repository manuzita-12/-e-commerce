import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import  {signal} from "@angular/core";
import {computed} from "@angular/core"
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import {effect} from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe, UpperCasePipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
  produtos = signal([
    {nome: 'Teclado ' , preco:100},
    {nome: 'Mouse ' , preco:50},
    {nome: 'Monitor ' , preco:1500},
    {nome: 'Desktop ' , preco:3000},
    {nome: 'Headset ' , preco:150}
  ]);
  //!função para exibir produtos selecionados pelo usuário no console
  exibirProduto(nome: string){
    console.log('Produto Selecionado: ',nome);
    this.produtoSelecionado.set(nome);
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
  {return this.produtos().reduce((total,
     item) =>
  total + item.preco,0)});
     //!função que substitui a lista atual usando metodo set()
     substituirProdutos(){
      this.produtos.set([
        {nome:'teclado Gamer', preco:350 },
        {nome:'Mouse Gamer', preco: 150},
        {nome:'Monitor Gamer',preco: 2000},
        {nome:'Desktop Gamer',preco: 5000},
        {nome:'Headset Gamer',preco: 650},
      ]);
     }
     //! metodo para monitorar alterações em tempo real usando effect()
     constructor(){
      effect(() => {
        console.log('Lista de Produtos Alterados: ', this.produtos());
      });
      effect(() => {
        console.log('Valor Total Atualizado: ', this.valorTotal());
      });
      effect(() => {
        if (typeof document !== 'undefined'){
          document.title = `(${this.totalProdutos()}) - Loja da Emanuelly`;
        }
      });
     }
     //! metodo para criar um estado de seleção com signal string | null
     produtoSelecionado = signal <string | null>(null);
}

import { Component } from '@angular/core';
import { Produto } from '../produto/produto';
import  {signal} from "@angular/core";
import {computed} from "@angular/core"
import { PrecoFormatadoPipe } from '../../../shared/pipes/preco-formatado-pipe';
import {effect} from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { title } from 'process';
import { strict } from 'assert';
import { error } from 'console';
import { produtosService} from '../../../core/services/produtos.service';
import { inject } from '@angular/core';
import { CarrinhoFacade } from '../../../core/facades/carrinho.facade';
import { ItemCarrinho } from '../../../core/models/item-carrinho';

@Component({
  selector: 'app-lista-produtos',
  imports: [Produto, PrecoFormatadoPipe],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {
 
  //!======= MÉTODO SIGNALS======
  produtos = signal<{nome: string; preco: number}[]>([]);
  carregando = signal(true);
  erro = signal < string | null > (null);
  //?função para exibir produtos selecionados pelo usuário no console
  exibirProduto(nome: string){
    console.log('Produto Selecionado: ',nome);
    this.produtoSelecionado.set(nome);
  }
  //!=====MÉTODO UPDATE=====
  //?função que adiciona produto usando metodo update
  adicionarProduto(){
    this.produtos.update(listaAtual => [
      ...listaAtual,
      {nome:'Playstation 5', preco:3000},
    ]);
  }
  //!=====MÉTODO COMPUTED====
  //?função que contabiliza quantidade de itens de produtos na lista com metodo computed
  totalProdutos = computed(() => this.produtos().length); 
  //?função que calcula o valor total dos produtos usando o metodo computed()
  valorTotal = computed(()=>
  {return this.produtos().reduce((total,
     item) =>
  total + item.preco,0)});
     //! ======METODO SET======
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
     //!=====MÉTODO HTTP CLIENT (API)======
     carregarProdutos(){
      this.erro.set(null); //limpar o erro antes de fazer a requisição
      this.carregando.set(true); //ativar o sinal de carregamento
      this.produtosService.buscarProdutos().subscribe({
        next: (dados) => {
          const produtos = this.produtosService.transformarProdutos(dados);
          this.produtos.set(produtos);
          this.carregando.set(false); 
        },
        error: (erro) => {
          console.error('Erro ao carregar produtos: ', erro);
          this.erro.set('Erro ao carregar produtos. Por favor, tente novamente!');
          this.carregando.set(false);
        }
      });
     }
     //!=======CONSTRUCTOR======
     constructor(){
      //!Carrega a API
      this.carregarProdutos();
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
     //!metodo para criar um estado de seleção com signal string | null
     produtoSelecionado = signal <string | null>(null);
     //!metodo para criar um estado para o carrinho com signal
     

     adicionarAoCarrinho(produto: ItemCarrinho){
      this.carrinhoFacade.adicionarProdutoCarrinho(produto);
     }
     //* ======INJECT======

     private produtosService = inject(produtosService);
     public carrinhoFacade = inject(CarrinhoFacade);

     quantidadeCarrinho = this.carrinhoFacade.quantidadeCarrinho;
     totalCarrinho = this.carrinhoFacade.totalCarrinho;
}

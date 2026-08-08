import { Injectable } from "@angular/core";
import { signal } from "@angular/core";
import { computed } from "@angular/core";
@Injectable ({ providedIn: 'root'})

export class CarrinhoService{
//Estado Global
private carrinho = signal<{nome: string; preco: number}[]>([]); 

//? Seleção
itens = computed(() => this.carrinho());
quantidadeItens = computed(() => this.carrinho().length);
totalItens = computed(() => this.carrinho().reduce((total, item) => total + item.preco,0))

// TODO: Ações: Adicionar Produtos
adicionar(produto:{nome: string; preco: number}){
    this.carrinho.update(lista =>[...lista, produto]);
}
// TODO: Limpeza
limpar(){
    this.carrinho.set([]);
}
}

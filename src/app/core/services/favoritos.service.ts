import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class FavoritoService {
    private favoritosSignal = signal<string[]>(this.carregarDoLocalStorage());

    readonly favorito = this.favoritosSignal.asReadonly();

    private carregarDoLocalStorage(): string[] {
        if (typeof window === 'undefined') {
            return [];
        }
        const dados = localStorage.getItem('favoritos');
        return dados ? JSON.parse(dados) : [];
    }
    private salvarNoLocalStorage(lista: string[]): void {
        if (typeof window !== 'undefined') {
            localStorage.setItem('favoritos', JSON.stringify(lista));
        }
    }
    toggleFavorito(nome: string) {
        this.favoritosSignal.update(lista => {
            const existe = lista.includes(nome);
            const novaLista = existe 
            ? lista.filter(item => item !== nome)
            : [...lista, nome];

            this.salvarNoLocalStorage(novaLista);
            return novaLista;
        });
    }

    removerItem(nome: string) {
        this.favoritosSignal.update(lista => {
          const novaLista = lista.filter(item => item !== nome);
          this.salvarNoLocalStorage(novaLista);
          return novaLista;
        });
    }
}
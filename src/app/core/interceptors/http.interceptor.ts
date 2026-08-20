import { HttpInterceptorFn } from "@angular/common/http";
import { tap } from "rxjs";
import { catchError } from "rxjs";
import { throwError } from "rxjs";
import { inject } from "@angular/core";
import { AuthFacade } from "../facades/auth.facade";
import { Router } from '@angular/router';

export const HttpInterceptor: HttpInterceptorFn = (req, next) => {

    console.log('Requisição: ', req.url);

    //!aqui vc pode adicionar lógica para modificar a requisição
    const authFacade = inject(AuthFacade);
    const router = inject(Router);
    const token = authFacade.obterToken();
    

    const novaReq = token ?
    req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    }):req;
    return next(novaReq).pipe(
        tap({
            next: (event) => console.log('Responde: ',event),
            error: (error) => console.error('Erro de Requesição: ', error)
        }),
        catchError((error) =>{
            console.error('Erro de Requisição Global:', error);
            if (error.status === 401){
                console.error('Erro de autenticação do Usuário: ', error);
                authFacade.sair();
                router.navigateByUrl('/login');
            }
            if (error.status === 500){
                console.warn('Erro interno do servidor!', error);
            }

            if(error.status === 403){
                console.warn('Acesso Proibido, Usuário sem permissão!');
                router.navigateByUrl('/produtos');
            }

            return throwError (() => error);
        }),
    );
};
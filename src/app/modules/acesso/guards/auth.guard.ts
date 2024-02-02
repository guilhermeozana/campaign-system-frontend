import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CampanhaService } from 'src/app/shared/services/campanha.service';

export const authGuard: CanActivateFn = () => {
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);

    authService.updateLoggedIn();

    if(authService.loggedIn.value){

      if(localStorage.getItem('hasSurveysActive')){
        router.navigate(['/campanha/formulario']);
      }

      return true;

    } else {
      router.navigate(['/acesso']);
      return false;
    }
}

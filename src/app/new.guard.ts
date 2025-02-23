import { CanActivateFn } from '@angular/router';

export const newGuard: CanActivateFn = (route, state) => {
  return true;
};

import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gestionnaireGuard } from './gestionnaire-guard';

describe('gestionnaireGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => gestionnaireGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

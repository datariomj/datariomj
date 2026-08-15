import { ChangeDetectorRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AppComponent } from './app.component';

@Component({
  template: '',
  standalone: true,
})
class DummyRouteComponent { }

describe('AppComponent', () => {
  let showPreloader$: BehaviorSubject<boolean>;
  let mockStore: Partial<Store>;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let scrollToSpy: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    showPreloader$ = new BehaviorSubject<boolean>(false);
    scrollToSpy = vi.fn();
    (window as unknown as { scrollTo: ReturnType<typeof vi.fn>; }).scrollTo = scrollToSpy;

    mockStore = {
      select: <T>() => showPreloader$.asObservable() as Observable<T>,
    };

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterTestingModule.withRoutes([
          { path: '', component: DummyRouteComponent },
          { path: 'about', component: DummyRouteComponent },
        ]),
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        ChangeDetectorRef,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture?.destroy();
    showPreloader$.complete();
    TestBed.resetTestingModule();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'datariomj'`, () => {
    expect(component.title).toEqual('datariomj');
  });

  it('renders the preloader when showPreloader is true', () => {
    showPreloader$.next(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[data-cy="preloader"]')).toBeTruthy();
  });

  it('scrolls to top on NavigationEnd', async () => {
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/about');
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });
});

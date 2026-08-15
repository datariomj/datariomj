import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { UnfinishedComponent } from './unfinished.component';

describe('UnfinishedComponent', () => {
  let component: UnfinishedComponent;
  let fixture: ComponentFixture<UnfinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnfinishedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnfinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

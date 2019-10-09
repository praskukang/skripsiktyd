import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KasPage } from './kas.page';

describe('KasPage', () => {
  let component: KasPage;
  let fixture: ComponentFixture<KasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddkasPage } from './addkas.page';

describe('AddkasPage', () => {
  let component: AddkasPage;
  let fixture: ComponentFixture<AddkasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddkasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddkasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

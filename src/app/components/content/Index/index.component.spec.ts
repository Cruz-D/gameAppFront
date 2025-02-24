/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContentFatherComponent } from './index.component';

describe('ContentFatherComponent', () => {
  let component: ContentFatherComponent;
  let fixture: ComponentFixture<ContentFatherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentFatherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentFatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

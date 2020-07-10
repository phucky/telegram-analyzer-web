import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostUsedWordsComponent } from './most-used-words.component';

describe('MostUsedWordsComponent', () => {
  let component: MostUsedWordsComponent;
  let fixture: ComponentFixture<MostUsedWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostUsedWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostUsedWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

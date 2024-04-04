import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperHeroesTableComponent } from './super-heroes-table.component';

describe('SuperHeroesTableComponent', () => {
  let component: SuperHeroesTableComponent;
  let fixture: ComponentFixture<SuperHeroesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperHeroesTableComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SuperHeroesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

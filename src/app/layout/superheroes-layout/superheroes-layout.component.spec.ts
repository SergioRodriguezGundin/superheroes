import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperheroesLayoutComponent } from './superheroes-layout.component';

describe('SuperheroesLayoutComponent', () => {
  let component: SuperheroesLayoutComponent;
  let fixture: ComponentFixture<SuperheroesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperheroesLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperheroesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

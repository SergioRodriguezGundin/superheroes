import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnMetricsComponent } from './column-metrics.component';

describe('ColumnMetricsComponent', () => {
  let component: ColumnMetricsComponent;
  let fixture: ComponentFixture<ColumnMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnMetricsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ColumnMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

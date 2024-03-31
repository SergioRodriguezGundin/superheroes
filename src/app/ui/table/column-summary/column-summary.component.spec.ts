import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnSummaryComponent } from './column-summary.component';

describe('ColumnSummaryComponent', () => {
  let component: ColumnSummaryComponent;
  let fixture: ComponentFixture<ColumnSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColumnSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

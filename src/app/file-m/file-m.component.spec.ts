import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileMComponent } from './file-m.component';

describe('FileMComponent', () => {
  let component: FileMComponent;
  let fixture: ComponentFixture<FileMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

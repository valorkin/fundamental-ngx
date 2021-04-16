import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotificationContentComponent } from './notification-content.component';

describe('NotificationContentComponent', () => {
    let component: NotificationContentComponent;
    let fixture: ComponentFixture<NotificationContentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NotificationContentComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotificationContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

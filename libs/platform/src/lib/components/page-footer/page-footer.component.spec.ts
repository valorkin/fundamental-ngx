import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformLinkModule } from '../link/link.module';

import { PlatformFooterComponent } from './page-footer.component';
import { PlatformPageFooterModule } from './page-footer.module';

@Component({
    selector: 'fdp-footer-test',
    template: `
        <fdp-page-footer [logo]="logo" [content]="content" [copyright]="copyright"></fdp-page-footer>
        <ng-template #logo>
            <img id="fd-logo-1" src="/assets/images/logo-sap.svg" alt="" />
        </ng-template>

        <ng-template #content>
            <fdp-link id="fd-link-test-1" href="/" title="footer link Supported Browser">Supported Browser</fdp-link>
            <fdp-link id="fd-link-test-2" href="/" title="footer link Security Disclosure"
                >Security Disclosure</fdp-link
            >
            <fdp-link id="fd-link-test-3" href="/" title="footer link Privacy Statement">Privacy Statement</fdp-link>
            <fdp-link id="fd-link-test-4" href="/" title="footer link Cookie Statement">Cookie Statement</fdp-link>
            <fdp-link id="fd-link-test-5" href="/" title="footer link Participant Team">Participant Team</fdp-link>
        </ng-template>

        <ng-template #copyright>
            <span>1996-2021 Ariba Inc. All Rights Reserved</span>
        </ng-template>
    `
})
class PlatformFooterTestComponent {
    @ViewChild(PlatformFooterComponent, { static: true, read: ElementRef })
    footerElementRef: ElementRef;
}

describe('FooterComponent', () => {
    let component: PlatformFooterTestComponent;
    let fixture: ComponentFixture<PlatformFooterTestComponent>;
    let footerEleRef: ElementRef;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformPageFooterModule, PlatformLinkModule],
            declarations: [PlatformFooterComponent, PlatformFooterTestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(PlatformFooterTestComponent);
        footerEleRef = fixture.componentInstance.footerElementRef;
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create footer logo component', () => {
        const ele = footerEleRef.nativeElement.querySelector('.fd-page-footer__logo');
        expect(ele).toBeTruthy();
    });

    it('should create footer icons component', () => {
        const ele = footerEleRef.nativeElement.querySelector('.fd-page-footer__container');
        expect(ele).toBeTruthy();
    });
});

import { Component } from '@angular/core';
import { DialogConfig, DialogService } from '@fundamental-ngx/core';

@Component({
    selector: 'fd-dialog-configuration-example',
    templateUrl: './dialog-configuration-example.component.html'
})
export class DialogConfigurationExample {
    constructor(public _dialogService: DialogService) {}

    openDraggableDialog(template): void {
        this._dialogService.open(template, {
            width: '300px',
            draggable: true,
            responsivePadding: true,
            backdropClickCloseable: true
        });
    }

    openResizableDialog(template): void {
        this._dialogService.open(template, {
            width: '300px',
            resizable: true,
            responsivePadding: true,
            backdropClickCloseable: true
        });
    }

    openClosableByButtonDialog(template): void {
        this._dialogService.open(template, {
            width: '300px',
            escKeyCloseable: false,
            responsivePadding: true
        });
    }
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DATA_PROVIDERS, MultiInputSelectionChangeEvent } from '@fundamental-ngx/platform';

@Component({
    selector: 'fdp-platform-multi-input-example',
    templateUrl: './platform-multi-input-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: DATA_PROVIDERS, useValue: new Map() }]
})
export class PlatformMultiInputExampleComponent {
    _datasource = [
        { firstName: 'Alabama', lastName: 'Montgomery' },
        { firstName: 'Alaska', lastName: 'Juneau' },
        { firstName: 'Arizona', lastName: 'Phoenix' },
        { firstName: 'Arkansas', lastName: 'Little Rock' },
        { firstName: 'California', lastName: 'Sacramento' },
        { firstName: 'Colorado', lastName: 'Denver' },
        { firstName: 'Connecticut', lastName: 'Hartford' },
        { firstName: 'Kentucky', lastName: 'Frankfort' },
        { firstName: 'Delaware', lastName: 'Dover' },
        { firstName: 'Florida', lastName: 'Tallahassee' },
        { firstName: 'Georgia', lastName: 'Atlanta' },
        { firstName: 'Hawaii', lastName: 'Honolulu' },
        { firstName: 'Idaho', lastName: 'Boise' },
        { firstName: 'Illinois', lastName: 'Springfield' },
        { firstName: 'Indiana', lastName: 'Indianapolis' },
        { firstName: 'Iowa', lastName: 'Des Moines' },
        { firstName: 'Kansas', lastName: 'Topeka' },
        { firstName: 'Kentucky', lastName: 'Frankfort' },
        { firstName: 'Louisiana', lastName: 'Baton Rouge' },
        { firstName: 'Maine', lastName: 'Augusta' },
        { firstName: 'Maryland', lastName: 'Annapolis' },
        { firstName: 'Massachusetts', lastName: 'Boston' },
        { firstName: 'Michigan', lastName: 'Lansing' },
        { firstName: 'Minnesota', lastName: 'St. Paul' },
        { firstName: 'Mississippi', lastName: 'Jackson' },
        { firstName: 'Missouri', lastName: 'Jefferson City' },
        { firstName: 'Montana', lastName: 'Helena' },
        { firstName: 'Nebraska', lastName: 'Lincoln' },
        { firstName: 'Nevada', lastName: 'Carson City' },
        { firstName: 'New Hampshire', lastName: 'Concord' },
        { firstName: 'New Jersey', lastName: 'Trenton' },
        { firstName: 'New Mexico', lastName: 'Santa Fe' },
        { firstName: 'New York', lastName: 'Albany' },
        { firstName: 'North Carolina', lastName: 'Raleigh' },
        { firstName: 'North Dakota', lastName: 'Bismarck' },
        { firstName: 'Ohio', lastName: 'Columbus' },
        { firstName: 'Oklahoma', lastName: 'Oklahoma City' },
        { firstName: 'Oregon', lastName: 'Salem' },
        { firstName: 'Pennsylvania', lastName: 'Harrisburg' },
        { firstName: 'Rhode Island', lastName: 'Providence' },
        { firstName: 'South Carolina', lastName: 'Columbia' },
        { firstName: 'South Dakota', lastName: 'Pierre' },
        { firstName: 'Tennessee', lastName: 'Nashville' },
        { firstName: 'Texas', lastName: 'Austin' },
        { firstName: 'Utah', lastName: 'Salt Lake City' },
        { firstName: 'Vermont', lastName: 'Montpelier' },
        { firstName: 'Virginia', lastName: 'Richmond' },
        { firstName: 'Washington', lastName: 'Olympia' },
        { firstName: 'West Virginia', lastName: 'Charleston' },
        { firstName: 'Wisconsin', lastName: 'Madison' },
        { firstName: 'Wyoming', lastName: 'Cheyenne' }
    ];
    selectedItem2 = null;

    showValues(item: MultiInputSelectionChangeEvent): void {
        this.selectedItem2 = item.payload;
    }
}

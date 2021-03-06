import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import {
    ObjectStatusModule,
    TableModule,
    LayoutPanelModule,
    FdDatetimeModule,
    RtlService
} from '@fundamental-ngx/core';
import {
    PlatformButtonModule,
    PlatformInputModule,
    PlatformSearchFieldModule,
    PlatformTableModule
} from '@fundamental-ngx/platform';

import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformTableHeaderComponent } from './platform-table-header/platform-table-header.component';
import { PlatformTableDocsComponent } from './platform-table-docs.component';
import { PlatformTableDefaultExampleComponent } from './platform-table-examples/platform-table-default-example.component';
import { PlatformTableCustomColumnExampleComponent } from './platform-table-examples/platform-table-custom-column-example.component';
import { PlatformTableMultipleRowSelectionExampleComponent } from './platform-table-examples/platform-table-multiple-row-selection-example.component';
import { PlatformTableSingleRowSelectionExampleComponent } from './platform-table-examples/platform-table-single-row-selection-example.component';
import { PlatformTableSortableExampleComponent } from './platform-table-examples/platform-table-sortable-example.component';
import { PlatformTableFilterableExampleComponent } from './platform-table-examples/platform-table-filterable-example.component';
import { PlatformTableGroupableExampleComponent } from './platform-table-examples/platform-table-groupable-example.component';
import { PlatformTableFreezableExampleComponent } from './platform-table-examples/platform-table-freezable-example.component';
import { PlatformTablePageScrollingExampleComponent } from './platform-table-examples/platform-table-page-scrolling-example.component';
import { PlatformTableInitialStateExampleComponent } from './platform-table-examples/platform-table-initial-state-example.component';
import { PlatformTableP13ColumnsExampleComponent } from './platform-table-examples/platform-table-p13-columns-example.component';
import { PlatformTableP13FilterExampleComponent } from './platform-table-examples/platform-table-p13-filter-example.component';
import { PlatformTableP13GroupExampleComponent } from './platform-table-examples/platform-table-p13-group-example.component';
import { PlatformTableP13SortExampleComponent } from './platform-table-examples/platform-table-p13-sort-example.component';
import { PlatformTableTreeExampleComponent } from './platform-table-examples/platform-table-tree-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformTableHeaderComponent,
        children: [
            { path: '', component: PlatformTableDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.table } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        CdkTableModule,
        TableModule,
        PlatformTableModule,
        PlatformButtonModule,
        ObjectStatusModule,
        LayoutPanelModule,
        FdDatetimeModule,
        PlatformInputModule,
        PlatformSearchFieldModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformTableDocsComponent,
        PlatformTableHeaderComponent,
        PlatformTableDefaultExampleComponent,
        PlatformTableCustomColumnExampleComponent,
        PlatformTableSingleRowSelectionExampleComponent,
        PlatformTableMultipleRowSelectionExampleComponent,
        PlatformTableSortableExampleComponent,
        PlatformTableFilterableExampleComponent,
        PlatformTableGroupableExampleComponent,
        PlatformTableFreezableExampleComponent,
        PlatformTablePageScrollingExampleComponent,
        PlatformTableInitialStateExampleComponent,
        PlatformTableP13ColumnsExampleComponent,
        PlatformTableP13SortExampleComponent,
        PlatformTableP13FilterExampleComponent,
        PlatformTableP13GroupExampleComponent,
        PlatformTableTreeExampleComponent
    ],
    providers: [RtlService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatformTableDocsModule {}

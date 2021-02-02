import { CoreBaseComponentPo } from './core-base-component.po';
import { waitForElDisplayed } from '../../driver/wdio';

export class GridListPo extends CoreBaseComponentPo {
    private url = '/grid-list';
    root = '#page-content';

    layoutPattern = 'h2#layoutPattern';

    moreButton = '.fd-grid-list__more';
    moreButtonItems = '#fd-grid-list-9 fd-grid-list-item';
    footer = '.fd-grid-list__footer';

    gridListsArray = '.fd-doc-component';

    gridListsTitle = '[title="Products"] label';
    deleteModeTitle = '[selectionmode="delete"] [title="Products"]';
    deleteItemButton = '[selectionmode="delete"] fd-grid-list-item button';
    multiSelectModeSelectedItems = 'fd-grid-list[selectionmode="multiSelect"] fd-grid-list-item .is-selected';
    multiSelectModeCheckboxes = 'fd-grid-list[selectionmode="multiSelect"] .fd-checkbox__label';
    singleSelectItems = '[selectionmode="singleSelect"] fd-grid-list-item > div';
    singleSelectItemsSelected = '[selectionmode="singleSelect"] fd-grid-list-item .is-selected';

    unreadStateItem = '[state="unread"] h6';
    errorStateItem = '.fd-object-status--negative';
    lockedStateItemButton = '[state="locked"] button';
    lockedStateItemText = '[state="locked"] span';
    draftStateItemButton = '[state="draft"] button';
    draftStateItemText = '[state="draft"] span'

    successStatusIndicator = '[status="success"] span';
    warningStatusIndicator = '[status="warning"] span';
    errorStatusIndicator = '[status="error"] span';
    neutralStatusIndicator = '[status="neutral"] span';

    dragAndDropItems = '#dnd + component-example fd-grid-list-item';
    dragAndDropItemTitles = '#dnd + component-example fd-grid-list-item .fd-title';

    gridListItemsByMode = (name: string) => {
        return ` [selectionmode="${name}"] fd-grid-list-item`;
    };

    open(): void {
        super.open(this.url);
        waitForElDisplayed(this.root);
        waitForElDisplayed(this.layoutPattern);
    };
}

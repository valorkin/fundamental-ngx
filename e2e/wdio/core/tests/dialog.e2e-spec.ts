import { DialogPo } from '../pages/dialog.po';
import {
    addIsActiveClass,
    browserIsFirefox,
    checkElementScreenshot,
    click,
    clickAndDragElement,
    clickWithOption,
    doesItExist,
    executeScriptBeforeTagAttr,
    focusElement,
    getAttributeByName,
    getCSSPropertyByName,
    getElementArrayLength,
    getElementLocation,
    getElementSize,
    getImageTagBrowserPlatform,
    getText,
    isElementDisplayed,
    mouseHoverElement,
    pause,
    refreshPage,
    saveElementScreenshot,
    scrollIntoView,
    sendKeys,
    waitForElDisplayed,
    waitForNotDisplayed
} from '../../driver/wdio';
import {
    approvedStatus,
    backgroundColor,
    blackBackground,
    bottomRightPosition,
    canceledStatus,
    classAttribute,
    closeBtnStatus,
    continueStatus,
    customClass,
    defaultPrice,
    dismissedStatus, dottedOutline,
    escapeStatus, fullscreenClass, mobileClass,
    mobileProperty, noMobileSpacingClass, noOutline, outlineProperty,
    styleAttribute, topPaddingProperty
} from '../fixtures/appData/dialog-contents';
import { papayaFruit } from '../fixtures/testData/dialog';

describe('dialog test suite', function() {
    const dialogPage = new DialogPo();
    const {
        templateDialog, button, dialog, dialogOutput, componentDialog, objectDialog, stateDialog, busyIndicator,
        configurationDialog, dialogContainer, resizeHandle, positionDialog, mobileDialog, complexDialog, dialogItems,
        searchBar, dialogCartOutput, stackedDialog, playgroundDialog, checkboxes, inputFields, dialogExamples,
        customDialog, dialogBody
    } = dialogPage;

    beforeAll(() => {
        dialogPage.open();
    }, 1);

    describe('template based dialog example', function() {
        it('should check dialog dismissal and output', () => {
            const closeBtn = 0;
            const acceptBtn = 1;
            const cancelBtn = 2;

            checkDialogDismissals(templateDialog, button, closeBtn, closeBtnStatus);
            checkDialogDismissals(templateDialog, button, acceptBtn, continueStatus);
            checkDialogDismissals(templateDialog, button, cancelBtn, canceledStatus);
            checkCloseDialogWithEscapeKey(templateDialog, button);
        });
    });

    describe('component based dialog example', function() {
        it('should check dialog dismissal and output', () => {
            const closeBtn = 0;
            const acceptBtn = 1;
            const cancelBtn = 2;

            checkDialogDismissals(componentDialog, button, closeBtn, closeBtnStatus);
            checkDialogDismissals(componentDialog, button, acceptBtn, continueStatus);
            checkDialogDismissals(componentDialog, button, cancelBtn, canceledStatus);
            checkCloseDialogWithEscapeKey(componentDialog, button);
        });
    });

    describe('object based dialog example', function() {
        it('should check dialog dismissal and output', () => {
            const closeBtn = 0;
            const acceptBtn = 2;
            const cancelBtn = 3;

            checkDialogDismissals(objectDialog, button, closeBtn, dismissedStatus);
            checkDialogDismissals(objectDialog, button, acceptBtn, approvedStatus);
            // skipped due to issue: https://github.com/SAP/fundamental-ngx/issues/4967
            // checkDialogDismissals(objectDialog, button, cancelBtn, canceledStatus);
            checkCloseDialogWithEscapeKey(objectDialog, button);
        });
    });

    describe('dialog state examples', function() {
        it('should check auto dismissal', () => {
            const selfDismissingDialogCount = 3;

            for (let i = 0; i < selfDismissingDialogCount; i++) {
                openDialog(stateDialog, i);
                pause(4500);

                expect(doesItExist(dialog)).toBe(false);
            }
        });

        it('check ability to dismiss alerts', () => {
            const dialogCount = getElementArrayLength(stateDialog + button);

            for (let i = 0; i < dialogCount; i++) {
                openDialog(stateDialog, i);
                closeDialog();

                expect(doesItExist(dialog)).toBe(false);
            }
        });

        it('check the loading icon', () => {
            openDialog(stateDialog, 3);

            expect(isElementDisplayed(dialog + busyIndicator)).toBe(true);
            closeDialog();
        });
    });

    describe('dialog configuration examples', function() {
        it('should check dialog is draggable', () => {
            if (!browserIsFirefox()) {
                // dragAndDrop not working correctly on Saucelabs for Edge/Chrome
                return;
            }

            scrollIntoView(configurationDialog);
            openDialog(configurationDialog);
            const dialogStartLocationX = Math.floor(getElementLocation(dialogContainer, 0, 'x'));
            const dialogStartLocationY = Math.floor(getElementLocation(dialogContainer, 0, 'y'));

            clickAndDragElement(dialogStartLocationX + 20, dialogStartLocationY + 10, dialogStartLocationX - 100, dialogStartLocationY - 50);

            expect(Math.floor(getElementLocation(dialogContainer, 0, 'x'))).not.toBe(dialogStartLocationX);
            expect(Math.floor(getElementLocation(dialogContainer, 0, 'y'))).not.toBe(dialogStartLocationY);
            closeDialog();
        });

        it('should check dialog is resizeable', () => {
            openDialog(configurationDialog, 1);

            checkResizingDialog();

            closeDialog();
        });

        it('should check dialog only closes with footer button click', () => {
            openDialog(configurationDialog, 2);
            clickWithOption(dialog, 0, 5000, { x: -100, y: -100 });

            expect(doesItExist(dialog)).toBe(true);
            closeDialog();

            expect(doesItExist(dialog)).toBe(false);
        });
    });

    describe('dialog positioning example', function() {
        it('should check dialog in bottom right', () => {
            openDialog(positionDialog);

            expect(getAttributeByName(dialogContainer, styleAttribute)).toContain(bottomRightPosition);
            closeDialog();
        });
    });

    describe('mobile dialog example', function() {
        it('should check mobile property', () => {
            openDialog(mobileDialog);

            expect(getAttributeByName(dialogContainer, classAttribute)).toContain(mobileProperty);
            closeDialog();
        });
    });

    describe('complex dialog example', function() {
        it('should check dialog selections', () => {
            openDialog(complexDialog);
            waitForNotDisplayed(busyIndicator);
            waitForElDisplayed(dialogItems);
            const startingPrice = getText(dialogCartOutput);

            click(dialogItems, 1);

            expect(getText(dialogCartOutput)).not.toEqual(startingPrice);
            clearAndCloseDialog();
        }, 1);

        it('should check ability to clear dialog/cart', () => {
            openDialog(complexDialog);
            waitForNotDisplayed(busyIndicator);

            click(dialogItems, 1);
            click(dialogItems, 3);
            click(dialog + button);

            expect(getText(dialogCartOutput)).toEqual(defaultPrice);
            clearAndCloseDialog();
        }, 1);

        it('should check dialog search', () => {
            openDialog(complexDialog);
            waitForNotDisplayed(busyIndicator);

            click(dialog + searchBar);
            sendKeys(papayaFruit);

            expect(getText(dialogItems).toLowerCase()).toContain(papayaFruit);
            clearAndCloseDialog();
        }, 1);

        it('should check resizing dialog', () => {
            openDialog(complexDialog);
            waitForNotDisplayed(busyIndicator);
            const startStyle = getAttributeByName(dialogContainer, styleAttribute);

            checkResizingDialog();
            expect(getAttributeByName(dialogContainer, styleAttribute)).not.toBe(startStyle);
            clearAndCloseDialog();
        }, 1);
    });

    describe('stacked dialogs examples', function() {
        it('should check that there can be multiple dialogs', () => {
            openDialog(stackedDialog);

            expect(getElementArrayLength(dialog)).toBe(1);
            click(dialog + button, 1);
            waitForElDisplayed(dialog, 1);

            expect(getElementArrayLength(dialog)).toBe(2);
            click(dialog + button, 3);
            closeDialog();

            expect(doesItExist(dialog)).toBe(false);
        });
    });

    describe('custom backdrop and container examples', function() {
        it('should check custom backdrop dialog dismissal', () => {
            openDialog(customDialog);

            click(dialog + button);

            expect(doesItExist(dialog)).toBe(false);
            openDialog(customDialog);

            click(dialog + button, 1);

            expect(doesItExist(dialog)).toBe(false);
        });

        it('should check custom backdrop class', () => {
            openDialog(customDialog);

            expect(getAttributeByName(dialog, classAttribute)).toContain(customClass);

            click(dialog + button);
        });

        it('should check custom container dismissal', () => {
            click(customDialog + button, 1);
            waitForElDisplayed(dialog);
            click(dialog + button);

            expect(doesItExist(dialog)).toBe(false);

            click(customDialog + button, 1);
            waitForElDisplayed(dialog);
            click(dialog + button, 1);

            expect(doesItExist(dialog)).toBe(false);
        });

        it('should check static dialog dismissal', () => {
            click(customDialog + button, 2);
            waitForElDisplayed(dialog);
            click(dialog + button);

            expect(doesItExist(dialog)).toBe(false);

            click(customDialog + button, 2);
            waitForElDisplayed(dialog);
            click(dialog + button, 1);

            expect(doesItExist(dialog)).toBe(false);
        });
    });

    describe('playground examples', function() {
        afterEach(() => {
            refreshPage();
            waitForElDisplayed(dialogPage.title);
        }, 1);

        it('should check dialog hasBackdrop option', () => {
            openDialog(playgroundDialog);

            expect(executeScriptBeforeTagAttr(dialog, backgroundColor)).toContain(blackBackground);

            closeDialog();
            // todo: find way to check pseudo element not present
        });

        it('should check dialog backdropClickCloseable option', () => {
            openDialog(playgroundDialog);
            clickWithOption(dialog, 0, 5000, { x: -100, y: -100 });

            expect(doesItExist(dialog)).toBe(false);

            click(playgroundDialog + checkboxes, 1);
            openDialog(playgroundDialog);
            clickWithOption(dialog, 0, 5000, { x: -100, y: -100 });

            expect(doesItExist(dialog)).toBe(true);
        });

        it('should check dialog escKeyCloseable option', () => {
            openDialog(playgroundDialog);
            sendKeys('Escape');
            expect(doesItExist(dialog)).toBe(false);

            scrollIntoView(playgroundDialog + checkboxes, 2);
            click(playgroundDialog + checkboxes, 2);
            openDialog(playgroundDialog);
            sendKeys('Escape');

            expect(doesItExist(dialog)).toBe(true);
        });

        it('should check dialog focusTrapped option', () => {
            openDialog(playgroundDialog);

            expect(getCSSPropertyByName(dialog + button, outlineProperty).value).toBe(dottedOutline);

            closeDialog();
            click(playgroundDialog + checkboxes, 3);
            openDialog(playgroundDialog);

            expect(getCSSPropertyByName(dialog + button, outlineProperty).value).toBe(noOutline);
        });

        it('should check dialog fullScreen option', () => {
            openDialog(playgroundDialog);

            expect(getAttributeByName(dialogContainer, classAttribute))
                .not.toContain(fullscreenClass);

            closeDialog();
            click(playgroundDialog + checkboxes, 4);
            openDialog(playgroundDialog);

            expect(getAttributeByName(dialogContainer, classAttribute))
                .toContain(fullscreenClass);
        });

        it('should check dialog mobile option', () => {
            openDialog(playgroundDialog);

            expect(getAttributeByName(dialogContainer, classAttribute))
                .not.toContain(mobileClass);

            closeDialog();
            click(playgroundDialog + checkboxes, 5);
            openDialog(playgroundDialog);

            expect(getAttributeByName(dialogContainer, classAttribute))
                .toContain(mobileClass);
        });

        it('should check dialog mobileOuterSpacing option', () => {
            click(playgroundDialog + checkboxes, 5);
            openDialog(playgroundDialog);

            expect(getAttributeByName(dialogContainer, classAttribute))
                .not.toContain(noMobileSpacingClass);
            closeDialog();
            click(playgroundDialog + checkboxes, 6);
            openDialog(playgroundDialog);

            expect(getAttributeByName(dialogContainer, classAttribute))
                .toContain(noMobileSpacingClass);
        });

        it('should check dialog draggable option', () => {
            if (!browserIsFirefox()) {
                // dragAndDrop not working correctly on Saucelabs for Edge/Chrome
                return;
            }
            click(playgroundDialog + checkboxes, 7);
            openDialog(playgroundDialog);
            const dialogStartLocationX = Math.floor(getElementLocation(dialogContainer, 0, 'x'));
            const dialogStartLocationY = Math.floor(getElementLocation(dialogContainer, 0, 'y'));

            clickAndDragElement(dialogStartLocationX + 20, dialogStartLocationY + 10, dialogStartLocationX - 100, dialogStartLocationY - 50);

            expect(Math.floor(getElementLocation(dialogContainer, 0, 'x'))).not.toBe(dialogStartLocationX);
            expect(Math.floor(getElementLocation(dialogContainer, 0, 'y'))).not.toBe(dialogStartLocationY);
        });

        it('should check dialog resizable option', () => {
            openDialog(playgroundDialog);

            expect(doesItExist(dialog + resizeHandle)).toBe(false);

            closeDialog();
            click(playgroundDialog + checkboxes, 8);
            openDialog(playgroundDialog);

            checkResizingDialog();
        });

        it('should check dialog verticalPadding option', () => {
            openDialog(playgroundDialog);

            expect(getCSSPropertyByName(dialogBody, topPaddingProperty).value).toBe('16px');

            closeDialog();
            click(playgroundDialog + checkboxes, 9);
            openDialog(playgroundDialog);

            expect(getCSSPropertyByName(dialogBody, topPaddingProperty).value).toBe('0px');
        });

        it('should check dialog width and height options', () => {
            click(playgroundDialog + inputFields);
            sendKeys('400px');
            click(playgroundDialog + inputFields, 1);
            sendKeys('400px');
            openDialog(playgroundDialog);

            expect(getElementSize(dialogContainer, 0, 'width')).toBe(400);
            expect(getElementSize(dialogContainer, 0, 'height')).toBe(400);
        });

        it('should check dialog min/max width and height options', () => {
            click(playgroundDialog + checkboxes, 8);
            click(playgroundDialog + inputFields, 2);
            sendKeys('400px');
            click(playgroundDialog + inputFields, 3);
            sendKeys('600px');
            click(playgroundDialog + inputFields, 4);
            sendKeys('400px');
            click(playgroundDialog + inputFields, 5);
            sendKeys('600px');
            openDialog(playgroundDialog);
            const handleXLocation = Math.floor(getElementLocation(dialog + resizeHandle, 0, 'x'));
            const handleYLocation = Math.floor(getElementLocation(dialog + resizeHandle, 0, 'y'));

            clickAndDragElement(handleXLocation + 1, handleYLocation + 1, handleXLocation + 250, handleYLocation + 250);

            expect(getElementSize(dialogContainer, 0, 'width')).toBe(600);
            expect(getElementSize(dialogContainer, 0, 'height')).toBe(600);

            const newHandleXLocation = Math.floor(getElementLocation(dialog + resizeHandle, 0, 'x'));
            const newHandleYLocation = Math.floor(getElementLocation(dialog + resizeHandle, 0, 'y'));

            clickAndDragElement(newHandleXLocation + 1, newHandleYLocation + 1, newHandleXLocation - 300, newHandleYLocation - 300);

            expect(getElementSize(dialogContainer, 0, 'width')).toBe(400);
            expect(getElementSize(dialogContainer, 0, 'height')).toBe(400);
        });
    });

    describe('visual regression', function() {
        const complexExample = 12;
        const stackedExample = 13;

        beforeEach(() => {
            refreshPage();
        }, 1);

        it('should check examples visual regression', () => {
            dialogPage.saveExampleBaselineScreenshot();
            expect(dialogPage.compareWithBaseline()).toBeLessThan(3);
        });

        it('should check each dialog', () => {
            const dialogCount = getElementArrayLength(dialogExamples + button);

            for (let i = 0; i < dialogCount; i++) {
                if (i === 3 || i === 4 || i === 5 || i === 6) {
                    // skip due to dynamic content
                    continue;
                }
                if (i === complexExample) {
                    click(dialogExamples + button, i);
                    waitForElDisplayed(dialog);
                    waitForNotDisplayed(busyIndicator);
                    waitForElDisplayed(dialogItems);
                    saveElementScreenshot(dialogContainer, `dialog-${i}-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder());
                    expect(checkElementScreenshot(dialogContainer, `dialog-${i}-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder()))
                        .toBeLessThan(5, `dialog ${i} screenshot doesn't match baseline`);
                    click(dialog + button, 2);
                    continue;
                }
                if (i === stackedExample) {
                    click(dialogExamples + button, i);
                    waitForElDisplayed(dialog);
                    saveElementScreenshot(dialogContainer, `dialog-${i}a-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder());
                    expect(checkElementScreenshot(dialogContainer, `dialog-${i}a-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder()))
                        .toBeLessThan(5, `dialog ${i}a screenshot doesn't match baseline`);
                    click(dialog + button, 1);
                    waitForElDisplayed(dialog, 1);
                    saveElementScreenshot(dialogContainer, `dialog-${i}b-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder(), 1);
                    expect(checkElementScreenshot(dialogContainer, `dialog-${i}b-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder(), 1))
                        .toBeLessThan(5, `dialog ${i}b screenshot doesn't match baseline`);
                    click(dialog + button, 3);
                    closeDialog();
                    continue;
                }
                click(dialogExamples + button, i);
                waitForElDisplayed(dialog);
                saveElementScreenshot(dialogContainer, `dialog-${i}-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder());
                expect(checkElementScreenshot(dialogContainer, `dialog-${i}-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder()))
                    .toBeLessThan(5, `dialog ${i} screenshot doesn't match baseline`);
                if (doesItExist(dialog) === false) {
                    continue;
                }
                click(dialog + button);
            }
        }, 1);

        it('should check example button hover states', () => {
            const dialogCount = getElementArrayLength(dialogExamples + button);

            for (let i = 0; i < dialogCount; i++) {
                scrollIntoView(dialogExamples + button, i);
                mouseHoverElement(dialogExamples + button, i);
                saveElementScreenshot(dialogExamples + button, `dialog-${i}-example-hover-state-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder(), i);
                expect(checkElementScreenshot(dialogExamples + button, `dialog-${i}-example-hover-state-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder(), i))
                    .toBeLessThan(5, `dialog ${i} hover state screenshot doesn't match baseline`);
            }
        }, 1);

        it('should check example button focus states', () => {
            const dialogCount = getElementArrayLength(dialogExamples + button);

            for (let i = 0; i < dialogCount; i++) {
                scrollIntoView(dialogExamples + button, i);
                focusElement(dialogExamples + button, i);
                saveElementScreenshot(dialogExamples + button, `dialog-${i}-example-focus-state-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder(), i);
                expect(checkElementScreenshot(dialogExamples + button, `dialog-${i}-example-focus-state-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder(), i))
                    .toBeLessThan(5, `dialog ${i} focus state screenshot doesn't match baseline`);
            }
        }, 1);

        it('should check example button active states', () => {
            const dialogCount = getElementArrayLength(dialogExamples + button);

            for (let i = 0; i < dialogCount; i++) {
                scrollIntoView(dialogExamples + button, i);
                addIsActiveClass(dialogExamples + button, i);
                saveElementScreenshot(dialogExamples + button, `dialog-${i}-example-active-state-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder(), i);
                expect(checkElementScreenshot(dialogExamples + button, `dialog-${i}-example-active-state-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder(), i))
                    .toBeLessThan(5, `dialog ${i} active state screenshot doesn't match baseline`);
            }
        }, 1);

        it('should check dialog button hover states', () => {
            checkButtonState('hover', mouseHoverElement);
        }, 1);

        it('should check dialog button focus states', () => {
            checkButtonState('focus', focusElement);
        }, 1);

        it('should check dialog button active states', () => {
            checkButtonState('active', addIsActiveClass);
        }, 1);

        it('should check custom backdrop example', () => {
            openDialog(customDialog);

            saveElementScreenshot(dialog, `dialog-with-custom-backdrop-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder());
            expect(checkElementScreenshot(dialog, `dialog-dialog-with-custom-backdrop-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder()))
                .toBeLessThan(10, `dialog with custom backdrop screenshot doesn't match baseline`);

            closeDialog();
        });

        function checkButtonState(stateCheck: string, applyStateFunction: any): void {
            const dialogCount = getElementArrayLength(dialogExamples + button);

            for (let i = 0; i < dialogCount; i++) {
                if (i === 3 || i === 4 || i === 5) {
                    // skip: sometimes dialog auto closes before screenshot taken
                    continue;
                }

                click(dialogExamples + button, i);
                waitForElDisplayed(dialog);
                const dialogButtonCount = getElementArrayLength(dialog + button);

                for (let j = 0; j < dialogButtonCount; j++) {
                    applyStateFunction(dialog + button, j);
                    saveElementScreenshot(dialog + button, `dialog-${i}-button-${j}-${stateCheck}-state-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder(), j);
                    expect(checkElementScreenshot(dialog + button, `dialog-${i}-button-${j}-${stateCheck}-state-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder(), j))
                        .toBeLessThan(5, `dialog ${i} button ${j} ${stateCheck} state screenshot doesn't match baseline`);
                }
                if (i === complexExample) {
                    click(dialog + button, 2);
                    continue;
                }
                if (i === stackedExample) {
                    click(dialog + button, 1);
                    const btnCount = 4;

                    for (let k = 2; k < btnCount; k++) {
                        applyStateFunction(dialog + button, k);
                        saveElementScreenshot(dialog + button, `dialog-${i}-button-${k}-${stateCheck}-state-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder(), k);
                        expect(checkElementScreenshot(dialog + button, `dialog-${i}-button-${k}-${stateCheck}-state-${getImageTagBrowserPlatform()}-`, dialogPage.getScreenshotFolder(), k))
                            .toBeLessThan(5, `dialog ${i} button ${k} ${stateCheck} state screenshot doesn't match baseline`);
                    }
                    click(dialog + button, 3);
                }
                closeDialog();
            }
        }
    });

    function checkDialogDismissals(exampleSelector: string, dialogSelector: string, dialogButtonIndex: number = 0, expectation: string, selectorIndex: number = 0): void {
        scrollIntoView(exampleSelector, selectorIndex);
        click(exampleSelector + dialogSelector, selectorIndex);
        waitForElDisplayed(dialog);
        click(dialog + button, dialogButtonIndex);

        expect(getText(exampleSelector + dialogOutput)).toContain(expectation);
    }

    function checkCloseDialogWithEscapeKey(exampleSelector: string, dialogSelector: string, selectorIndex: number = 0): void {
        scrollIntoView(exampleSelector, selectorIndex);
        click(exampleSelector + dialogSelector, selectorIndex);
        waitForElDisplayed(dialog);
        sendKeys('Escape');

        expect(getText(exampleSelector + dialogOutput)).toContain(escapeStatus);
    }

    function openDialog(dialogSelector: string, index: number = 0): void {
        click(dialogSelector + button, index);
        waitForElDisplayed(dialog);
    }

    function clearAndCloseDialog(): void {
        click(dialog + button);
        click(dialog + button, 2);
    }

    function closeDialog(): void {
        click(dialog + button);
    }

    function checkResizingDialog(): void {
        const elementStartWidth = getElementSize(dialogContainer, 0, 'width');
        const elementStartHeight = getElementSize(dialogContainer, 0, 'height');
        const handleLocationX = Math.floor(getElementLocation(dialog + resizeHandle, 0, 'x'));
        const handleLocationY = Math.floor(getElementLocation(dialog + resizeHandle, 0, 'y'));

        clickAndDragElement(handleLocationX + 1, handleLocationY + 1, handleLocationX + 110, handleLocationY + 100);

        expect(getElementSize(dialogContainer, 0, 'width')).not.toBe(elementStartWidth);
        expect(getElementSize(dialogContainer, 0, 'height')).not.toBe(elementStartHeight);
    }
});

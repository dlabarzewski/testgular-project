import { TableCardElement } from '@components/backoffice';
import {
  App,
  ButtonElement,
  Component,
  ContainerElement,
  ElementLocator,
  Router,
  cssSelector,
  exactCaseInsensitiveRegexp,
  textSelector,
} from '@lowgular/testgular';
import { BackofficeRoutesPattern, Routes } from '@shared';

@Component()
 class UserListPage {
  constructor(
    private readonly app: App,
    private readonly router: Router,
    private readonly el: ElementLocator
  ) {}

  async clickCreate() {
    const createButton = this.el.locateChild(
      ButtonElement,
      textSelector(exactCaseInsensitiveRegexp('Dodaj użytkownika'))
    );

    await createButton.click();

    await this.router.expectAndWaitForUrl(Routes.BACKOFFICE_USER_CREATE);
  }

  async editByEmail(email: string) {
    const createTableCard = this.el.locateChild(
      TableCardElement,
      TableCardElement.Selector
    );

    const createdRow = await createTableCard.findRowByValue(email, 2);

    const createdRowColumns = createdRow.elementLocator.locateList(
      ContainerElement,
      cssSelector('td')
    );

    const createdRowLength = await createdRowColumns.length();

    const createdRowActionsColumn = await createdRowColumns.getNthElement(
      createdRowLength - 1
    );

    const editButton = createdRowActionsColumn.elementLocator.locateChild(
      ButtonElement,
      textSelector(exactCaseInsensitiveRegexp('Edytuj'))
    );

    await editButton.click();

    await this.router.expectAndWaitForUrl(BackofficeRoutesPattern.USER_EDIT);
  }

  async deleteByEmail(email: string) {
    const editedTableCard = this.el.locateChild(TableCardElement, TableCardElement.Selector);

    const editedRow = await editedTableCard.findRowByValue(email, 2);

    const editedRowColumns = editedRow.elementLocator.locateList(ContainerElement, cssSelector('td'));

    const editedRowLength = await editedRowColumns.length();

    const editedRowActionsColumn = await editedRowColumns.getNthElement(editedRowLength - 1);

    const deleteButton = editedRowActionsColumn.elementLocator.locateChild(ButtonElement, textSelector(exactCaseInsensitiveRegexp('Usuń')));

    await deleteButton.click();

    await this.app.waitForTimeout(500);

    const deleteModal = this.el.locateChild(ContainerElement, cssSelector('#delete-modal'))

    const deleteModalButton = deleteModal.elementLocator.locateChild(ButtonElement, textSelector('Usuń'));

    await deleteModalButton.click();

    await this.router.expectAndWaitForUrl(Routes.BACKOFFICE_USER_LIST);
  }
}

export {UserListPage};
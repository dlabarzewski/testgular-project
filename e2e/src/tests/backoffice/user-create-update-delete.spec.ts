import {
  App,
  ButtonElement,
  ContainerElement,
  ElementLocator,
  Router,
  cssSelector,
  describe,
  exactCaseInsensitiveRegexp,
  it,
  textSelector,
} from '@lowgular/testgular';
import {
  CardElement,
  TableCardElement,
  UserFormElement,
} from '../../components/backoffice';
import { APP_CONFIG, BackofficeRoutesPattern, Routes } from '../../shared';
import { login } from '../../utils';

const createData = {
  name: 'teste2e',
  email: 'teste2e@com.pl',
  password: 'teste2e',
};

const editData = {
  name: 'teste2e1',
  email: 'teste2e1@com.pl',
  password: 'teste2e1',
};

describe('Backoffice: User CRUD', () => {
  it(`Should create, update and delete user`, APP_CONFIG, async (app: App) => {
    const router = app.inject(Router);
    const el = app.inject(ElementLocator);

    await login(router, el);

    // go to list

    await router.navigateAndWait(Routes.BACKOFFICE_USER_LIST);

    // click create

    const createButton = el.locateChild(
      ButtonElement,
      textSelector(exactCaseInsensitiveRegexp('Dodaj użytkownika'))
    );

    await createButton.click();

    await router.expectAndWaitForUrl(Routes.BACKOFFICE_USER_CREATE);

    // create

    const createCard = el.locateChild(CardElement, CardElement.Selector);

    const createForm = createCard.elementLocator.locateChild(
      UserFormElement,
      UserFormElement.Selector
    );

    await createForm.setValues(createData);

    await createForm.submit();

    await router.expectAndWaitForUrl(Routes.BACKOFFICE_USER_LIST);

    // find created row

    const createTableCard = el.locateChild(
      TableCardElement,
      TableCardElement.Selector
    );

    const createdRow = await createTableCard.findRowByValue(
      createData.email,
      2
    );

    /* commented because of not being able to find child by using TableRow<ContainerElement>
      const createdRowLength = await createdRow.length();

      const createdRowActionsColumn = await createdRow.getNthColumn(createdRowLength - 1);
    */

    const createdRowColumns = createdRow.elementLocator.locateList(
      ContainerElement,
      cssSelector('td')
    );

    const createdRowLength = await createdRowColumns.length();

    //

    const createdRowActionsColumn = await createdRowColumns.getNthElement(
      createdRowLength - 1
    );

    const editButton = createdRowActionsColumn.elementLocator.locateChild(
      ButtonElement,
      textSelector(exactCaseInsensitiveRegexp('Edytuj'))
    );

    await editButton.click();

    // edit

    const editCard = el.locateChild(CardElement, CardElement.Selector);

    const editForm = editCard.elementLocator.locateChild(
      UserFormElement,
      UserFormElement.Selector
    );

    await editForm.setValues(editData);

    await editForm.submit();

    await router.expectAndWaitForUrl(BackofficeRoutesPattern.USER_EDIT);

    await router.navigateAndWait(Routes.BACKOFFICE_USER_LIST);

    // find edited row

    const editedTableCard = el.locateChild(
      TableCardElement,
      TableCardElement.Selector
    );

    const editedRow = await editedTableCard.findRowByValue(editData.email, 2);

    /*
      const editedRowLength = await editedRow.length();

      const editedRowActionsColumn = await editedRow.getNthColumn(editedRowLength - 1);
    */

    const editedRowColumns = editedRow.elementLocator.locateList(
      ContainerElement,
      cssSelector('td')
    );

    const editedRowLength = await editedRowColumns.length();

    //

    const editedRowActionsColumn = await editedRowColumns.getNthElement(
      editedRowLength - 1
    );

    // delete

    const deleteButton = editedRowActionsColumn.elementLocator.locateChild(
      ButtonElement,
      textSelector(exactCaseInsensitiveRegexp('Usuń'))
    );

    await deleteButton.click();

    await app.waitForTimeout(500);

    const deleteModal = el.locateChild(
      ContainerElement,
      cssSelector('#delete-modal')
    );

    const deleteModalButton = deleteModal.elementLocator.locateChild(
      ButtonElement,
      textSelector('Usuń')
    );

    await deleteModalButton.click();

    await router.expectAndWaitForUrl(Routes.BACKOFFICE_USER_LIST);
  });
});

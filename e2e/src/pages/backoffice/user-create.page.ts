import { CardElement, UserFormElement } from '@components/backoffice';
import { Component, ElementLocator, Router } from '@lowgular/testgular';
import { Routes } from '@shared';
import { UserModel } from 'e2e/src/models/user.model';

export
@Component()
class UserCreatePage {
  constructor(
    private readonly router: Router,
    private readonly el: ElementLocator
  ) {}

  async create(createData: UserModel) {
    const createCard = this.el.locateChild(CardElement, CardElement.Selector);

    const createForm = createCard.elementLocator.locateChild(
      UserFormElement,
      UserFormElement.Selector
    );

    await createForm.setValues(createData);

    await createForm.submit();

    await this.router.expectAndWaitForUrl(Routes.BACKOFFICE_USER_LIST);
  }
}

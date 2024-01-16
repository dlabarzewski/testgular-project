import { CardElement, UserFormElement } from '@components/backoffice';
import { Component, ElementLocator, Router } from '@lowgular/testgular';
import { BackofficeRoutesPattern } from '@shared';
import { UserModel } from 'e2e/src/models/user.model';

export 
@Component()
class UserEditPage {
  constructor(
    private readonly router: Router,
    private readonly el: ElementLocator
  ) {}

  async edit(editData: UserModel) {
    const editCard = this.el.locateChild(CardElement, CardElement.Selector);

    const editForm = editCard.elementLocator.locateChild(
      UserFormElement,
      UserFormElement.Selector
    );

    await editForm.setValues(editData);

    await editForm.submit();

    await this.router.expectAndWaitForUrl(BackofficeRoutesPattern.USER_EDIT);
  }
}

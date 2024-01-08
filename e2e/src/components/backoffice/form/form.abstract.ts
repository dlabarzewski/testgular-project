import {
  ButtonElement,
  ContainerElement,
  ElementSelector,
  InputFormControl,
  cssSelector,
} from '@lowgular/testgular';
import { FormGroupElement } from './form-group';

export type SelectorsType = Record<string, ElementSelector> & {
  submit: ElementSelector;
}

export type ControlsType = Record<string, InputFormControl | ButtonElement> & {
  submit: ButtonElement;
}

export type ValuesType = Record<string, string>;

export abstract class FormAbstractElement<
  T extends ValuesType
> extends ContainerElement {
  static Selector = cssSelector('form');

  protected abstract _selectors: SelectorsType;

  protected abstract _controls: ControlsType;

  async setValues(values: T): Promise<void> {
    for (let key in values) {
      const control = this._controls[key];

      if (control instanceof InputFormControl) {
        await (this._controls[key] as InputFormControl).setValue(values[key]);
      }
    }
  }

  async expectValues(values: T): Promise<void> {
    for (let key in values) {
      const control = this._controls[key];

      if (control instanceof InputFormControl) {
        await (this._controls[key] as InputFormControl).expectValue(
          values[key]
        );
      }
    }
  }

  async expectErrors(messages: Partial<T>): Promise<void> {
    const formGroups = this.elementLocator.locateList(
      FormGroupElement,
      FormGroupElement.Selector
    );

    for (let key in messages) {
      const formGroup = await formGroups.findOrThrow(
        async (child: FormGroupElement) => {
          const input = child.elementLocator.locateChild(
            InputFormControl,
            this._selectors[key]
          );

          return await input.isVisible(true);
        }
      );

      await formGroup.expectError(messages[key]);
    }
  }

  async submit(): Promise<void> {
    await this._controls.submit.click();
  }
}

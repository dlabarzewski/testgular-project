import { ContainerElement, cssSelector, TextElement, TableRow, ButtonElement, StringOrRegExp } from "@lowgular/testgular";
import { CardElement } from "./card";

interface TableCardExpectedButtonsColumnContent {
  text: string;
  urlPattern: StringOrRegExp | undefined;
}

export interface TableCardExpectedContent {
  title: StringOrRegExp,
  header: StringOrRegExp[],
  content: (StringOrRegExp | TableCardExpectedButtonsColumnContent[])[]
}

export class TableCardElement extends CardElement {
  private _table = this.elementLocator.locateChild(
    ContainerElement,
    cssSelector('.table')
  );
  private _tableHeaders = this._table.elementLocator.locateTableRows(
    TextElement,
    cssSelector('thead tr')
  );
  private _tableBody = this._table.elementLocator.locateTableRows(
    ContainerElement,
    cssSelector('tbody tr')
  );
  private _tableBodyRows = this._table.elementLocator.locateList(
    ContainerElement,
    cssSelector('tbody tr')
  );

  async expectData(expectedData: TableCardExpectedContent) {
    await this.expectTitle(expectedData.title);

    await this._tableHeaders.expectToHaveLength(1);

    const tableHeader = await this._tableHeaders.getNthElement(0);

    await tableHeader.forEachColumn(async (col: TextElement, index: number) => {
      await col.expectContent(expectedData.header[index]);
    });

    await this._tableBody.forEachChild(
      async (row: TableRow<ContainerElement>, rIndex: number) => {
        await row.forEachColumn(async (col: ContainerElement, cIndex) => {
          const colContent = expectedData.content[cIndex];

          if (Array.isArray(colContent)) {
            const buttons = col.elementLocator.locateList(
              ButtonElement,
              cssSelector('.btn')
            );

            await buttons.expectToHaveLength(
              colContent.length
            );

            await buttons.forEachChild(
              async (button: ButtonElement, bIndex: number) => {
                await button.expectContent(colContent[bIndex].text);

                if (colContent[bIndex].urlPattern) {
                  await button.expectAttribute(
                    'href',
                    colContent[bIndex].urlPattern
                  );
                }
              }
            );
          } else {
            await col.expectContent(colContent as StringOrRegExp);
          }
        });
      }
    );
  }

  async findRowByValue(value: StringOrRegExp, columnIndex: number) {
    return await this._tableBodyRows.findOrThrow(async (row: ContainerElement) => {
      const columns = row.elementLocator.locateList(ContainerElement, cssSelector('td'));

      const column = await columns.getNthElement(columnIndex);

      return await column.hasContent(value);
    });
  }
}
import { NestedListConfig } from "../types/listParams";
import * as Dom from '../utils/dom';
import { ListRenderer } from './listRenderer';

/**
 * Class that is responsible for ordered list rendering
 */
export class OrderedListRenderer extends ListRenderer {
  /**
   * Tool's configuration
   */
  protected config?: NestedListConfig;

  constructor(config?: NestedListConfig) {
    super();
    this.config = config;
  }

  /**
   * Renders ol wrapper for list
   * @param classes -
   * @returns - created html ol element
   */
  renderWrapper(classes: string[] = []): HTMLOListElement {
    classes.push(this.CSS.wrapperOrdered);

    return Dom.make('ol', [this.CSS.wrapper, ...classes]) as HTMLOListElement;
  }

  /**
   * Redners list item element
   * @param content - content of the list item
   * @returns - created html list item element
   */
  renderItem(content: string): HTMLLIElement {
    const itemWrapper = Dom.make('li', this.CSS.item);
    const itemBody = Dom.make('div', this.CSS.itemBody);
    const itemContent = Dom.make('div', this.CSS.itemContent, {
      innerHTML: content,
    });

    console.log(itemContent, itemContent instanceof Node);
    itemBody.appendChild(itemContent);
    console.log(itemBody, itemBody instanceof Node);
    itemWrapper.appendChild(itemBody);

    console.log('created item wrapper', itemWrapper, typeof itemWrapper)

    return itemWrapper as HTMLLIElement;
  }

  /**
   * Return the item content
   *
   * @param {Element} item - item wrapper (<li>)
   * @returns {string}
   */
  getItemContent(item: Element): string {
    const contentNode = item.querySelector(`.${this.CSS.itemContent}`);
    if (!contentNode) {
      return '';
    }

    if (Dom.isEmpty(contentNode)) {
      return '';
    }

    return contentNode.innerHTML;
  }
}

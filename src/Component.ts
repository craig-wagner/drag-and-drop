abstract class Component<
  THostElement extends HTMLElement,
  TElement extends HTMLElement
> {
  templateElement: HTMLTemplateElement;
  hostElement: THostElement;
  element: TElement;

  constructor(
    templateId: string,
    hostElementId: string,
    insertLocation: InsertPosition,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId) as THostElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as TElement;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertLocation);
  }

  private attach(insertLocation: InsertPosition) {
    this.hostElement.insertAdjacentElement(insertLocation, this.element);
  }
}

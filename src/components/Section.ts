export interface SectionProps<T> {
  items: T[];
  renderer: (item: T) => void;
}

export default class Section<T> {
  private _items: T[];
  private _renderer: (item: T) => void;
  private _container: HTMLElement;

  constructor(
    { items, renderer }: SectionProps<T>,
    containerSelector: string
  ) {
    this._items = items;
    this._renderer = renderer;

    this._container = document.querySelector(
      containerSelector
    ) as HTMLElement;
  }

    // ==========================
// Renderiza los elementos 
// ========================== 

  public renderItems(): void {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

    // ==========================
// Toma un elemento y lo agrega al contenedor
// ========================== 

  public addItem(element: HTMLElement): void {
    this._container.prepend(element);
  }
}
export default class Section {
    _items;
    _renderer;
    _container;
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
        console.log("CONTENEDOR:", this._container);
    }
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
    addItem(element) {
        console.log("ADD ITEM:", this._container);
        this._container.prepend(element);
    }
}
//# sourceMappingURL=Section.js.map
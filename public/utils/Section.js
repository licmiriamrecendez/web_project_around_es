export default class Section {
    _items;
    _renderer;
    _container;
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    // ==========================
    // Renderiza los elementos 
    // ========================== 
    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }
    // ==========================
    // Toma un elemento y lo agrega al contenedor
    // ========================== 
    addItem(element) {
        this._container.prepend(element);
    }
}
//# sourceMappingURL=Section.js.map
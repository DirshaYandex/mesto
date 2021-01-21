export default class Section {
    constructor(containerSelector, renderer) {
        this._container = document.querySelector(containerSelector);
		this._renderer = renderer;
    }
    
    addItem(item){
        const element = this._renderer(item);
        this._container.prepend(element);
    }

    setItems(items){
        this._items = items
    }

    renderAll(){
        this._items.forEach(item => {
            this.addItem(item)
        });
    } 
}
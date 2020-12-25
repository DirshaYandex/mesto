export default class Section {
    constructor(sectionData, containerSelector) {
        this._container = document.querySelector(containerSelector);
		this._items = sectionData.items;
		this._renderer = sectionData.renderer;
    }
    
    addItem(item){
        const element = this._renderer(item);
        this._container.prepend(element);
    }

    renderAll(){
        this._items.forEach(item => {
            this.addItem(item)
        });
    } 
}
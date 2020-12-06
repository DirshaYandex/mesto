export default class Card {
    constructor(data, cardSelector, openPopup) {
		this._name = data.name;
		this._link = data.link;
        this._cardSelector = cardSelector;
        this._openPopup = openPopup
    }
    
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.pictures__element')
        .cloneNode(true);
    
      return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._element.querySelector('.pictures__img').src = this._link;
        this._element.querySelector('.pictures__img').alt = this._name;
        this._element.querySelector('.pictures__title').textContent = this._name;

        this._setEventListeners();
        this._handleOpenImagePopup();

        return this._element;
    } 

    _handleLikeClick(event) {
        event.currentTarget.classList.toggle('pictures__like_black');
    }

    _handleRemoveElement(event) {
        event.target.parentElement.remove();
    }

    _handleOpenImagePopup () {
        const picturePopup = document.querySelector('.picture-popup')
        const picturePopupImage = picturePopup.querySelector('.picture-popup__image');
        const picturePopupText = picturePopup.querySelector('.picture-popup__text');

        this._element.querySelector('.pictures__img').addEventListener('click', () => {
            this._openPopup(picturePopup);
            picturePopupImage.src = event.target.src 
            picturePopupImage.alt = event.target.alt
            picturePopupText.textContent = event.target.alt
        });
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.pictures__like').addEventListener('click', event => {
            this._handleLikeClick(event);
        });

        this._element.querySelector('.pictures__img-delete').addEventListener('click', event => {
            this._handleRemoveElement(event);
        });
    }
}

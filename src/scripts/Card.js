export default class Card {
    constructor(data, cardSelector, handleCardClick) {
		this._name = data.name;
		this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick     
    }
    
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
    
      return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImg = this._element.querySelector('.card__img')

        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        this._element.querySelector('.card__title').textContent = this._name;

        this._setEventListeners();

        return this._element;
    } 

    _handleLikeClick(event) {
        event.currentTarget.classList.toggle('card__like_black');
    }

    _handleRemoveElement(event) {
        event.target.parentElement.remove();
    }

    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', event => {
            this._handleLikeClick(event);
        });

        this._element.querySelector('.card__img-delete').addEventListener('click', event => {
            this._handleRemoveElement(event);
        });

        this._cardImg.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}

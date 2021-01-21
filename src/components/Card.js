export default class Card {
    constructor(data, cardSelector, handleCardClick, handleDeleteCardClick, handleLikeCardClick) {
        this._cardId = data._id;
		this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._owner = data.owner;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick; 
        this._handleDeleteCardClick = handleDeleteCardClick;
        this._handleLikeCardClick = handleLikeCardClick;
    }
    
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
      return cardElement;
    }

    generateCard(ownerId) {
        this._element = this._getTemplate(); 
        this._element.querySelector('.card__title').textContent = this._name;
        this._cardLike = this._element.querySelector('.card__like')

        this._cardImg = this._element.querySelector('.card__img');
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;

        this._cardLikes = this._element.querySelector('.card__number-like')
        this._cardLikes.textContent = this._likes.length;

        if (this._owner._id === ownerId){
            this._deleteBtn = document.createElement("button");
            this._deleteBtn.type = 'button';
            this._deleteBtn.classList.add('card__img-delete');
            this._element.insertBefore(this._deleteBtn, this._element.children[1]);
        }
        this._likes.forEach(userInfo => {
            if (userInfo._id === ownerId){
                this._cardLike.classList.add('card__like_black');
            }
        });
        this._setEventListeners();
        return this._element;
    } 

    isLiked() {
        return this._cardLike.classList.contains('card__like_black');
    }

    addCardLike() {
        this._cardLike.classList.add('card__like_black');
        this._cardLikes.textContent = parseInt(this._cardLikes.textContent) + 1;
    }

    removeCardLike(){
        this._cardLike.classList.remove('card__like_black');
        this._cardLikes.textContent = parseInt(this._cardLikes.textContent) - 1;
    }

    getCardId(){
        return this._cardId;
    }

    removeCard(){
        this._element.remove();
    }

    _setEventListeners() {

        this._cardImg.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

        this._cardLike.addEventListener('click', event => {
            this._handleLikeCardClick(this);
        });

        if(this._deleteBtn) {
            this._deleteBtn.addEventListener('click', event => {
                this._handleDeleteCardClick(this);
            });
        }        
    }
}

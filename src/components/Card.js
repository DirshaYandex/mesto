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
        this._initElements();
    }

    _initElements(){
        this._element = this._getTemplate(); 
        this._cardTitle = this._element.querySelector('.card__title');
        this._cardLike = this._element.querySelector('.card__like');
        this._cardLikes = this._element.querySelector('.card__number-like');
        this._deleteBtn = this._element.querySelector('.card__img-delete');
        this._cardImg = this._element.querySelector('.card__img');
    }
    
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
      return cardElement;
    }

    generateCard(myId) {
        this._cardTitle.textContent = this._name;
        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;

        if (this._owner._id !== myId){
            this._deleteBtn.style.display = "none";
        }
        
        this.setLikes(this._likes, myId);
        this._setEventListeners();
        return this._element;
    } 

    isLiked() {
        return this._cardLike.classList.contains('card__like_black');
    }

    setLikes(likes, myId){
        this._likes = likes;
        this._cardLikes.textContent = this._likes.length;
        this._cardLike.classList.remove('card__like_black');

        this._likes.forEach(userInfo => {
            if (userInfo._id === myId){
                this._cardLike.classList.add('card__like_black');
            }
        });
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

        if(this._deleteBtn.style.display !== "none") {
            this._deleteBtn.addEventListener('click', event => {
                this._handleDeleteCardClick(this);
            });
        }        
    }
}

import View from './View.js';
import icons from 'url:../../img/icons.svg';
import { MODAL_CLOSE_SEC } from '../config.js';

class addRecipeView extends View {
  _message = 'Recipe was successfully uploaded!';
  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');

  _parentElement;
  _btnClose;
  _btnOpen;
  _closeModalTimeout;

  constructor() {
    super();
    this.initAddRecipe();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  _setDOMReferences() {
    this._parentElement = document.querySelector('.upload');
    this._btnOpen = document.querySelector('.nav__btn--add-recipe');
    this._btnClose = document.querySelector('.btn--close-modal');
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
    if (this._window.classList.contains('hidden'))
      clearTimeout(this._closeModalTimeout);
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  closeModal() {
    this._closeModalTimeout = setTimeout(() => {
      this.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  }

  initAddRecipe() {
    const markup = this._renderAddRecipe();
    this._clearAddRecipe();
    this._window.insertAdjacentHTML('afterbegin', markup);
    this._setDOMReferences();
  }

  _clearAddRecipe() {
    this._window.innerHTML = '';
  }

  _renderAddRecipe() {
    // testing
    return `
    <button class="btn--close-modal">&times;</button>
      <form class="upload">
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="Pizza Cheese" required name="title" type="text" />
          <label>URL</label>
          <input value="https://unsplash.com/photos/pizza-with-berries-MQUqbmszGGM" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" required name="image" type="text" />
          <label>Publisher</label>
          <input value="Zenister" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="15" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="2" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>
    `;
  }
  addRecipeRenderMessage(message = this._message) {
    const markup = `
              <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;
    this._clearAddRecipe();
    this._window.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new addRecipeView();

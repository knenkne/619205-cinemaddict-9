import BaseComponent from './base-component';
import {months} from '../data';
import {controls} from '../films';

// Genres
const generateFilmGenreTemplate = (genre) => `<span class="film-details__genre">${genre}</span>`;

const generateFilmGenresTemplate = (genres) => Array.from(genres).map(generateFilmGenreTemplate).join(``);

const generateFilmGenresBlockTemplate = (genres) => {
  const filmGenresBlockTemplate =
  `<tr class="film-details__row">
    <td class="film-details__term">Genres</td>
    <td class="film-details__cell">
    ${generateFilmGenresTemplate(genres)}
  </tr>`.trim();

  return filmGenresBlockTemplate;
};

// Controls
const generateFilmControlTemplate = ({name}, isActive) =>
  `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}" ${isActive ? `checked` : ``}>
  <label for="${name}" class="film-details__control-label film-details__control-label--${name}">Add to ${name}</label>`.trim();

const generateFilmControlsTemplate = (items, isActive) => items.map((item, index) => generateFilmControlTemplate(item, isActive[index])).join(``);

const generateFilmControlsBlockTemplate = (items, isActive) => {
  const filmControlsBlockTemplate =
  `<section class="film-details__controls">
  ${generateFilmControlsTemplate(items, isActive)}
  </section>`.trim();

  return filmControlsBlockTemplate;
};


// Rating
const generateFilmScoreTemplate = (score, userScore) =>
  `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${score}" id="rating-${score}" ${userScore === score ? `checked` : ``}>
  <label class="film-details__user-rating-label" for="rating-${score}">${score}</label>`.trim();

const generateFilmScoresTemplate = (scores, userScore) => [...Array(scores)].map((score, index) => generateFilmScoreTemplate(index + 1, userScore)).join(``);

const generateFilmRatingTemplate = (name, image, userScore) => {
  const filmRatingTemplate =
    `<div class="form-details__middle-container">
    <section class="film-details__user-rating-wrap">
      <div class="film-details__user-rating-controls">
        <button class="film-details__watched-reset" type="button">Undo</button>
      </div>
  
      <div class="film-details__user-score">
        <div class="film-details__user-rating-poster">
          <img src="./images/posters/${image}" alt="${name}" class="film-details__user-rating-img">
        </div>
  
        <section class="film-details__user-rating-inner">
          <h3 class="film-details__user-rating-title">${name}</h3>
  
          <p class="film-details__user-rating-feelings">How you feel it?</p>
  
          <div class="film-details__user-rating-score">
          ${generateFilmScoresTemplate(9, parseInt(userScore, 10))}
          </div>
        </section>
      </div>
    </section>
  </div>`.trim();

  return filmRatingTemplate;
};

// Comments
const generateFilmCommentTemplate = ({author, comment, reaction, ago}) =>
  `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${reaction}.png" width="55" height="55" alt="emoji" data-name="${reaction}">
  </span>
  <div>
    <p class="film-details__comment-text">${comment}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${ago.getFullYear()}/${ago.getMonth() + 1}/${ago.getDate()}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`.trim();

const generateFilmCommentsTemplate = (comments) => comments.map((comment) => generateFilmCommentTemplate(comment)).join(``);

const generateFilmCommentsListTemplate = (comments) => {
  const filmCommentsListTemplate =
  `<ul class="film-details__comments-list">
    ${generateFilmCommentsTemplate(comments)}
  </ul>`.trim();

  return filmCommentsListTemplate;
};

const joinSet = (set) => [...set].join(`, `);

export default class FilmDetailed extends BaseComponent {
  constructor(film) {
    super();
    this._id = film.id;
    this._name = film.name;
    this._poster = film.poster;
    this._rating = film.rating;
    this._date = film.date;
    this._duration = film.duration;
    this._genres = film.genres;
    this._description = film.description;
    this._comments = film.comments;
    this._isAdded = film.isAdded;
    this._isWatched = film.isWatched;
    this._isFavorite = film.isFavorite;
    this._userScore = film.userScore;
    this._director = film.director;
    this._writers = film.writers;
    this._actors = film.actors;
    this._country = film.country;
  }

  get template() {
    return `<section class="film-details" data-id="${this._id}">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${this._poster}" alt="${this._name}">
  
            <p class="film-details__age">18+</p>
          </div>
  
          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._name}</h3>
                <p class="film-details__title-original">Original: ${this._name}</p>
              </div>
  
              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
                <p class="film-details__user-rating">${this._isWatched && this._userScore ? `Your rate ${this._userScore}` : ``}</p>
              </div>
            </div>
  
            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${this._director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${joinSet(this._writers)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${joinSet(this._actors)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${this._date.getDate()} ${months[this._date.getMonth()]} ${this._date.getFullYear()}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${Math.floor(this._duration / 60)}h ${this._duration % 60}m</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._country}</td>
              </tr>
              ${generateFilmGenresBlockTemplate(this._genres)}
            </table>
  
            <p class="film-details__film-description">
              ${this._description}
            </p>
          </div>
        </div>
  
        ${generateFilmControlsBlockTemplate(controls, [this._isAdded, this._isWatched, this._isFavorite])}
      </div>
  
      ${this._isWatched ? generateFilmRatingTemplate(name, this._poster, this._userScore) : ``}
  
      <div class="form-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>
  
          ${generateFilmCommentsListTemplate(this._comments)}
  
          <div class="film-details__new-comment">
            <div for="add-emoji" class="film-details__add-emoji-label"></div>
  
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>
  
            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>
  
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`.trim();
  }

  addEventListeners() {

    const onScoreChange = (evt) => {
      const scoreButton = this.element.querySelector(`.film-details__user-rating`);
      scoreButton.textContent = evt.target.checked ? `Your rate ${evt.target.value}` : ``;
    };

    const onScoreReset = () => {
      for (const score of this.element.querySelectorAll(`.film-details__user-rating-input`)) {
        score.checked = false;
      }

      this.element.querySelector(`.film-details__user-rating`).textContent = ``;
    };

    const onWatchedControlClick = (evt) => {
      if (evt.target.checked) {
        const filmInfo = this.element.querySelector(`.form-details__top-container`);
        filmInfo.insertAdjacentHTML(`afterend`, generateFilmRatingTemplate(this._name, this._poster, ``));

        for (const score of this.element.querySelectorAll(`.film-details__user-rating-input`)) {
          score.addEventListener(`change`, onScoreChange);
        }

        this.element.querySelector(`.film-details__watched-reset`).addEventListener(`click`, onScoreReset);
      } else {
        this.element.querySelector(`.film-details__user-rating`).textContent = ``;
        this.element.querySelector(`.form-details__middle-container`).remove();
      }
    };

    const onEmojiClick = (evt) => {
      const emojiBlock = this.element.querySelector(`.film-details__add-emoji-label`);
      emojiBlock.classList.remove(`film-details__add-emoji-label--error`);
      emojiBlock.innerHTML = ``;

      const emojiElement = document.createElement(`img`);
      emojiElement.width = `55`;
      emojiElement.height = `55`;
      emojiElement.alt = `emoji`;
      emojiElement.src = `images/emoji/${evt.target.value}.png`;
      emojiElement.setAttribute(`data-name`, evt.target.value);

      emojiBlock.insertAdjacentElement(`beforeend`, emojiElement);
    };

    const onCommentDelete = (evt) => {
      evt.target.closest(`.film-details__comment`).remove();
      const commentsCount = parseInt(this.element.querySelector(`.film-details__comments-count`).textContent, 10);

      this.element.querySelector(`.film-details__comments-count`).textContent = commentsCount - 1;
    };

    const onCommentSubmit = (evt) => {
      if (evt.ctrlKey && evt.key === `Enter`) {
        const emojiBlock = this.element.querySelector(`.film-details__add-emoji-label`);
        if (!emojiBlock.querySelector(`img`)) {
          emojiBlock.classList.add(`film-details__add-emoji-label--error`);

          return;
        }

        const commentsCount = parseInt(this.element.querySelector(`.film-details__comments-count`).textContent, 10);
        const commentsList = document.querySelector(`.film-details__comments-list`);
        const comment = {
          author: `Max Kuznetsov TEMPORARY`,
          comment: this.element.querySelector(`.film-details__comment-input`).value,
          reaction: this.element.querySelector(`.film-details__add-emoji-label`).querySelector(`img`).getAttribute(`data-name`),
          ago: new Date()
        };

        commentsList.insertAdjacentHTML(`beforeend`, generateFilmCommentTemplate(comment));

        this.element.querySelector(`.film-details__comments-count`).textContent = commentsCount + 1;

        // Fallback to default state
        this.element.querySelector(`.film-details__comment-input`).value = ``;
        this.element.querySelector(`.film-details__emoji-item:checked`).checked = false;
      }
    };

    // Score elements
    if (this.element.querySelector(`.form-details__middle-container`)) {
      for (const scoreButton of this.element.querySelectorAll(`.film-details__user-rating-input`)) {
        scoreButton.addEventListener(`change`, onScoreChange);
      }

      this.element.querySelector(`.film-details__watched-reset`).addEventListener(`click`, onScoreReset);
    }

    // Watched control element
    this.element.querySelector(`.film-details__control-input[name="watched"]`).addEventListener(`change`, onWatchedControlClick);

    // Emoji elements
    for (const emoji of this.element.querySelectorAll(`.film-details__emoji-item`)) {
      emoji.addEventListener(`change`, onEmojiClick);
    }

    // Comment field element
    this.element.querySelector(`.film-details__comment-input`).addEventListener(`focus`, () => {
      this.element.querySelector(`.film-details__comment-input`).addEventListener(`keydown`, onCommentSubmit);
    });

    this.element.querySelector(`.film-details__comment-input`).addEventListener(`blur`, () => {
      this.element.querySelector(`.film-details__comment-input`).removeEventListener(`keydown`, onCommentSubmit);
    });

    // Delete comment buttons
    for (const deleteButton of this.element.querySelectorAll(`.film-details__comment-delete`)) {
      deleteButton.addEventListener(`click`, onCommentDelete);
    }
  }
}

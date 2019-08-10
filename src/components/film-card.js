const generateFilmCardTemplate = ({name, image, rating, year, duration, genres, description, comments}) => {
  const filmCardTemplate =
    `<article class="film-card">
    <h3 class="film-card__title">${name}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration.hours}h ${duration.minutes}m</span>
      <span class="film-card__genre">${genres[0]}</span>
    </p>
    <img src="./images/posters/${image}" alt="${name}" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`.trim();

  return filmCardTemplate;
};

const generateFilmCardsTemplate = (items) => items.map((item) => generateFilmCardTemplate(item)).join(``);
const generateFilmCardsBlockTemplate = (items) => {
  const filmCardsTemplate =
    `<div class="films-list__container">
    ${generateFilmCardsTemplate(items)}
    </div>`.trim();

  return filmCardsTemplate;
};

export {generateFilmCardsBlockTemplate};

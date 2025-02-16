import { shuffleArray } from './util';
const RANDOM_PHOTOS_LENGTH = 10;
const ACTIVE_FILTER_CLASS = 'img-filters__button--active';

const imgFiltersElement = document.querySelector('.img-filters');
let activeFilterElement = imgFiltersElement.querySelector(`.${ACTIVE_FILTER_CLASS}`);

const sortByDecreasing = (firstElement, secondElement) => {
  const firstElementDiscussed = firstElement.comments.length;
  const secondElementDiscussed = secondElement.comments.length;

  return secondElementDiscussed - firstElementDiscussed;
};

const filter = {
  default: {
    id: 'filter-default',
    getFilter(array) {
      return array.slice();
    }
  },
  random: {
    id: 'filter-random',
    getFilter(array) {
      return shuffleArray(array.slice()).slice(0, RANDOM_PHOTOS_LENGTH);
    }
  },
  discussed: {
    id: 'filter-discussed',
    getFilter(array) {
      return array.slice().sort(sortByDecreasing);
    }
  }
};

const applyFilter = (array, activeElement) => {
  for (const key in filter) {
    if (filter[key].id === activeElement.id) {
      return filter[key].getFilter(array);
    }
  }
};

const overrideActiveFilter = (nevActiveElement) => {
  activeFilterElement.classList.remove(ACTIVE_FILTER_CLASS);
  nevActiveElement.classList.add(ACTIVE_FILTER_CLASS);
  activeFilterElement = nevActiveElement;
};

const getFilters = (photos) => {
  imgFiltersElement.classList.remove('img-filters--inactive');
  applyFilter(photos, activeFilterElement);
};

const setFilterClick = (photos, callback) => {
  const imgFiltersFormElement = imgFiltersElement.querySelector('.img-filters__form');

  const onImgFiltersFormElementClick = (evt) => {
    const filterElement = evt.target;
    if (filterElement.matches('.img-filters__button') && !(filterElement === activeFilterElement)) {
      overrideActiveFilter(filterElement);
      const filteredPhotos = applyFilter(photos, filterElement);
      callback(filteredPhotos);
    }
  };

  imgFiltersFormElement.addEventListener('click', onImgFiltersFormElementClick);
};

export { getFilters, setFilterClick };

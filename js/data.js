import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util';

const NUMBER_PHOTOS = 25;
const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;
const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 30;
const MIN_COUNT_AVATAR = 1;
const MAX_COUNT_AVATAR = 6;

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const DISCRIPTIONS_PHOTO = [
  'Мороз и солнце; день чудесный!',
  'Еще ты дремлешь, друг прелестный —',
  'Пора, красавица, проснись:',
  'Открой сомкнуты негой взоры',
  'Навстречу северной Авроры,',
  'Звездою севера явись!'
];

const NAMES = [
  'Хан Ган',
  'Нихон хиданкё',
  'Джеффри Хинтон',
  'Джон Хопфилд',
  'Демис Хассабис',
  'Дэвид Бейкер',
  'Джон Джампер',
  'Виктор Эмброс',
  'Гэри Равкан',
  'Джеймс Робинсон',
  'Саймон Джонсон',
  'Дарон Аджемоглу'
];

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_COUNT_AVATAR, MAX_COUNT_AVATAR)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const generatePhoto = () => {
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DISCRIPTIONS_PHOTO),
    likes: getRandomInteger(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
    comments: Array.from({length: getRandomInteger(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS)}, generateComment),
  };
};

const getArrayPhotos = () => Array.from({length: NUMBER_PHOTOS}, generatePhoto);

const photos = getArrayPhotos();

export {photos};

import { getRandomInt, getRandomArrayElement, getUniqueRandomNumbers } from './util.js';

const tempMessages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const tempDescriptionss = [
  'Мы в походе в горы',
  'Отличный день на природе',
  'Стандартные офисные будни',
  'День рождение моей дочери',
  'Рядовой обход в больнице',
]

const names = ['Вася', 'Nik', 'Stella', 'Мария', 'Александр']

const CommentMessagesLength = {
  MIN: 1,
  MAX: 2,
}

const CommentsNumberRange = {
  MIN: 1,
  MAX: 15,
}

const CommentsIdRange = {
  MIN: 1,
  MAX: 250,
}
//Создает объекты с комментариями и помещает в массив
const generateRandomComments = () => {

  const getRandomMessages = (array) => {
    let messages = [];
    const length = getRandomInt(CommentMessagesLength.MIN, CommentMessagesLength.MAX);
    for (let i = 0; i < length; i++) {
      messages.push(getRandomArrayElement(array));
    }

    return messages.join(' ');
  };

  const commentsNumber = getRandomInt(CommentsNumberRange.MIN, CommentsNumberRange.MAX);
  const commentIds = getUniqueRandomNumbers(commentsNumber, CommentsIdRange.MIN, CommentsIdRange.MAX);
  let comments = [];

  for (let i = 0; i < commentsNumber; i++) {
    comments.push({
      id: commentIds[i],
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: getRandomMessages(tempMessages),
      name: getRandomArrayElement(names),
    });
  }

  return comments;
};


// Создает объекты с фото и помещает их в массив
const generateRandomPhotos = (number) => {
  let photos = [];
  const photoIds = getUniqueRandomNumbers(25, 1, 25);

  for (let i = 0; i < number; i++) {
    // console.log(i);
    photos.push({
      tag: i + 1,
      id: photoIds[i],
      url: `photos/${i + 1}.jpg`,
      description: getRandomArrayElement(tempDescriptionss),
      likes: getRandomInt(15, 200),
      comments: generateRandomComments(),
    });
  }

  return photos;
};

// const result = generateRandomPhotos();
// console.log(result);

export { generateRandomPhotos };


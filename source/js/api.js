const getData = async (url) => {
  const response = await fetch(url);

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Не удается зарузить фотографии. Перезагрузите страницу.');
  }

};


const postData = async (url, body) => {
  const response = await fetch(
    url,
    {
      method: 'POST',
      body,
    })

  if (!response.ok) {
    throw new Error('Rejected: Не удалось опубликовать фотографию');
  }
};

export { getData, postData };


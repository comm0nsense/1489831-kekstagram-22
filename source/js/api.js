const getData = async (url) => {

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
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


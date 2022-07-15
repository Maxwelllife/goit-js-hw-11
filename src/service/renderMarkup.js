export function renderMarkup(data) {
  console.log(data);
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => /*HTML*/ `
    <a class = 'photo-link' href = "${largeImageURL}">
      <div class="photo-card">
          <div class="img-wrap">
            <img class = 'card-img' width = "150" src="${webformatURL}" alt="${tags}" loading="lazy" />
          </div>
        <ul class="info">
          <li class="info__item">
            <b>Likes</b>
            <span class = "info__item-span" >${likes}</span>
          </li>
          <li class="info__item">
            <b>Views</b>
            <span class = "info__item-span" >${views}</span>
          </li>
          <li class="info__item">
            <b>Comments</b>
            <span class = "info__item-span" >${comments}</span>
          </li>
          <li class="info__item">
            <b>Downloads</b>
            <span class = "info__item-span" >${downloads}</span>
          </li>
        </ul>
      </div>
    </a>`
    )
    .join('');
}

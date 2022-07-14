import refs from './refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export function renderMarkup(params) {
  if (params.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (params.length === 1) {
    renderMarkupOneCountry(params[0]);
  } else renderMarkupList(params);
}

function renderMarkupList(data) {
  const markupList = data
    .map(
      item => `
        <li class = "image-wrap">
          <img width = "24" height = "24" src = "${item.flags.svg}"/>
          <p>${item.name.official}</p>
        </li>`
    )
    .join('');

  refs.listCountries.innerHTML = markupList;
}

function renderMarkupOneCountry(data) {
  const language = Object.values(data.languages).join(', ');
  const markupOneCountry = `<div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`;

  refs.oneCounty.innerHTML = markupOneCountry;
}

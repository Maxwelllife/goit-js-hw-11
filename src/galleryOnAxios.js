import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './service/refs';
import { renderMarkup } from './service/renderMarkup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { GetImages } from './service/GetImagesAxios';

refs.form.addEventListener('submit', onSubmitForm);
refs.loadMoreBtn.addEventListener('click', onClickOpenMoreInfo);

const lightbox = new SimpleLightbox('.gallery a');
const getImages = new GetImages();
let inputValue = '';

async function onSubmitForm(event) {
  event.preventDefault();
  inputValue = event.target.elements.searchQuery.value.trim();
  getImages.page = 1;

  if (!inputValue) {
    Notify.failure(
      'If you want to see a picture then you need to write something'
    );
    return;
  }
  try {
    const { data } = await getImages.feachPhotos(inputValue);

    refs.gallery.innerHTML = renderMarkup(data.hits);

    lightbox.refresh();

    if (!data.hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      refs.loadMoreBtn.classList.add('is-hidden');
      return;
    }
    Notify.info(`Hooray! We found ${data.totalHits} images.`);

    if (getImages.image_per_page < data.totalHits) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else refs.loadMoreBtn.classList.add('is-hidden');
  } catch (error) {
    console.log(error);
  }
}

async function onClickOpenMoreInfo(event) {
  getImages.incrementPage();
  try {
    const { data } = await getImages.feachPhotos(inputValue);
    refs.gallery.insertAdjacentHTML('beforeend', renderMarkup(data.hits));

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    console.log(cardHeight);
    window.scrollBy({
      top: cardHeight * 2.7,
      behavior: 'smooth',
    });

    getImages.totalPage = data.totalHits / getImages.image_per_page;

    if (getImages.page > getImages.totalPage) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
  }
}

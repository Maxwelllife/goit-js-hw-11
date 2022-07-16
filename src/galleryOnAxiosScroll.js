import { Notify } from 'notiflix/build/notiflix-notify-aio';
import refs from './service/refs';
import { renderMarkup } from './service/renderMarkup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { GetImages } from './service/GetImagesAxios';

refs.form.addEventListener('submit', onSubmitForm);

const lightbox = new SimpleLightbox('.gallery a');
const getImages = new GetImages();
let inputValue = '';

async function onSubmitForm(event) {
  event.preventDefault();
  inputValue = event.target.elements.searchQuery.value.trim();
  getImages.page = 1;

  if (!inputValue) {
    Notify.failure(
      'If you want to see a pictures then you need to write something'
    );
    return;
  }
  try {
    const { data } = await getImages.feachPhotos(inputValue);
    refs.gallery.innerHTML = renderMarkup(data.hits);
    lightbox.refresh();
    getImages.quantityPages = data.totalHits / getImages.image_per_page;

    if (getImages.page < getImages.quantityPages) {
      intersectionObserver.observe(refs.targetElement);
    }
    //якщо запит пішов та повернув пустий масив то failure
    if (!data.hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notify.info(`Hooray! We found ${data.totalHits} images.`);
  } catch (error) {
    console.log(error);
  }
}

const intersectionObserverOptions = {
  root: null,
  rootMargin: '0px 0px 200px 0px',
  treshold: 1,
};
const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach(async entry => {
    if (!entry.isIntersecting) {
      return;
    }

    getImages.incrementPage();

    try {
      const { data } = await getImages.feachPhotos(inputValue);
      refs.gallery.insertAdjacentHTML('beforeend', renderMarkup(data.hits));

      if (getImages.page > getImages.quantityPages) {
        intersectionObserver.unobserve(refs.targetElement);
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        return;
      }
    } catch (error) {
      console.log(error);
    }
  });
}, intersectionObserverOptions);

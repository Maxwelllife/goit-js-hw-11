import axios from 'axios';

export class GetImages {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '28613912-2b9f86456f3c39b89c047be0c';

  #searchParams = new URLSearchParams({
    key: this.#API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  });

  constructor() {
    this.totalPage = null;
    this.page = 1;
    this.per_page = 40;
  }

  feachPhotos(query) {
    return fetch(
      `${this.#BASE_URL}?page=${this.page}&${this.#searchParams}&q=${query}`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
  incrementPage() {
    this.page += 1;
  }
}

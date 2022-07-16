import axios from 'axios';

export class GetImages {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '28613912-2b9f86456f3c39b89c047be0c';

  constructor() {
    this.totalPage = null;
    this.page = 1;
    this.image_per_page = 40;
  }

  feachPhotos(query) {
    return axios.get(`?q=${query}`, {
      baseURL: this.#BASE_URL,
      params: {
        key: this.#API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: this.image_per_page,
        page: this.page,
      },
    });
  }
  incrementPage() {
    this.page += 1;
  }
}

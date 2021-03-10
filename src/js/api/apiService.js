import settings from '../settings/settings';
const { API_KEY, BASE_URL } = settings;
export default class ApiService {
  constructor(query) {
    this.imageType = 'photo';
    this.orientation = 'horizontal';
    this.query = query;
    this.page = 1;
    this.resultsPerPage = 12;
  }
  fetchReguest() {
    return fetch(this.createRequest(this.query)).then(response =>
      response.json(),
    );
  }
  createRequest() {
    return `${BASE_URL}?image_type=${this.imageType}&orientation=${this.orientation}&q=${this.query}&page=${this.page}&per_page=${this.resultsPerPage}&key=${API_KEY}`;
  }
  nextPage() {
    this.page += 1;
    return this.fetchReguest();
  }
  newPage() {
    this.page = 1;
    return this.fetchReguest();
  }
}

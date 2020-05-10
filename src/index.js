import menuItem from './template.hbs';
import countries from './countries.hbs';
import './styles.css';
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const menuItemPosition = document.querySelector('.js-menu');

const refs = {
  searchForm: document.querySelector('.my-input'),
};

refs.searchForm.addEventListener('input', _.debounce(searchFormSubmitHandler, 500));

function searchFormSubmitHandler(e) {
  e.preventDefault();

  const SearchQuery = refs.searchForm.value;

  clearListItems();

  fetch('https://restcountries.eu/rest/v2/name/' + SearchQuery)
    .then(response => {
      console.log(response);

      return response.json();
    })
    .then(data => {
      console.log(data);

      if (data.length === 1) {
        const markup = data.map(name => menuItem(name)).join('');
        menuItemPosition.insertAdjacentHTML('beforeend', markup);
      } else if (data.length >= 2 & data.length <= 10) {
        const markup = data.map(name => countries(name)).join('');
        menuItemPosition.insertAdjacentHTML('beforeend', markup);
      } else if (data.length > 10) {
        const myError = error({
          text: "Too many matches found. Please enter a more specific query!"
        });
      }
    });
};

function clearListItems() {
  menuItemPosition.innerHTML = '';
}

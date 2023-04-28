import Dropdown from 'bootstrap/js/src/dropdown';

document.addEventListener('DOMContentLoaded', function () {
  const dropdownElements = [].slice.call(document.querySelectorAll('[data-bs-toggle="dropdown"]'));
  dropdownElements.map(function (el) {
    return new Dropdown(el);
  });
});

'use strict';

// Функциональное программирование - в небольших приложениях мило и довольно понятно,
// в боевых проектах, без прихода к общему фреймворку для работы с ним в JS,
// крайне опасно и запутано.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const toNumber = str => str.replace(/[^\d]/g, '');

const setRandomId = (element) => {
  element.id = Math.random().toString().slice(2);

  return element;
};

const moveElementByIdToTop = (id) => {
  const element = document.getElementById(id);
  const firstElement = element.parentNode.children[0];

  element.parentNode.insertBefore(element, firstElement);

  return id;
};

const highlightById = (id) => {
  const el = document.getElementById(id);

  el.className = el.className + ' ' + 'highlight';

  return id;
};

const moveElementByIdToTopWithAnimation = (id, index) => {
  return delay(index * 2000)
    .then(() => highlightById(id))
    .then(() => delay(1000))
    .then(() => moveElementByIdToTop(id));
};

const toEmployee = (el) => {
  return {
    position: el.dataset.position,
    salary: toNumber(el.dataset.salary),
    age: el.dataset.age,
    id: el.id,
    name: el.innerText,
  };
};

const diffSalary = (a, b) => b.salary - a.salary;

const toId = (x) => x.id;

const main = ({ animate }) => {
  Array
    // Получение DOM списка работников.
    .from(document.querySelectorAll('li'))
    // Установка ID для каждого элемента в списке для возможности легко связать
    // бизнес данные с их отображением в списке.
    .map(setRandomId)
    // Конвертация DOM элементов в объекты, с которыми гораздо проще проводить манипуляции.
    .map(toEmployee)
    // Сортировка списка по разнице в зарплате.
    .sort(diffSalary)
    // Гениально, не правда ли?! Нам нужно обратить список обратно, чтобы переставлять
    // DOM компоненты снизу-вверх. То-есть, мы берем первый элемент по ID работника и
    // перемещаем его наверх. Потом берем следующий и он тоже оказывается на самом верху и т.д.
    .reverse()
    .map(toId)
    .forEach(animate ? moveElementByIdToTopWithAnimation : moveElementByIdToTop);
};

document
  .getElementById('btn-fast-sort')
  .addEventListener('click', () => main({ animate: false }));

document
  .getElementById('btn-animated-sort')
  .addEventListener('click', () => main({ animate: true }));

'use strict';

const toggle = (element) => element && element.classList.toggle('active');

const sidebar = document.querySelector('[data-sidebar]');
const sidebarButton = document.querySelector('[data-sidebar-btn]');

if (sidebar && sidebarButton) {
  sidebarButton.addEventListener('click', () => {
    toggle(sidebar);
    sidebarButton.setAttribute('aria-expanded', sidebar.classList.contains('active'));
  });
}

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

function showPage(pageName, updateHash = true) {
  if (!pages.length) return;

  const target = pageName || 'about';
  pages.forEach((page) => page.classList.toggle('active', page.dataset.page === target));
  navigationLinks.forEach((link) => link.classList.toggle('active', link.textContent.trim().toLowerCase() === target));

  if (updateHash) {
    const nextHash = target === 'about' ? '' : `#${target}`;
    history.replaceState(null, '', `${window.location.pathname}${nextHash}`);
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navigationLinks.forEach((link) => {
  link.addEventListener('click', () => showPage(link.textContent.trim().toLowerCase()));
});

if (pages.length && window.location.hash) {
  const requestedPage = window.location.hash.slice(1).toLowerCase();
  if ([...pages].some((page) => page.dataset.page === requestedPage)) showPage(requestedPage, false);
}

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');
const filterButtons = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

function filterProjects(category) {
  filterItems.forEach((item) => {
    item.classList.toggle('active', category === 'all' || item.dataset.category === category);
  });
}

if (select) select.addEventListener('click', () => toggle(select));

selectItems.forEach((item) => {
  item.addEventListener('click', () => {
    const category = item.textContent.trim().toLowerCase();
    if (selectValue) selectValue.textContent = item.textContent.trim();
    if (select) select.classList.remove('active');
    filterProjects(category);
    filterButtons.forEach((button) => button.classList.toggle('active', button.textContent.trim().toLowerCase() === category));
  });
});

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.textContent.trim().toLowerCase();
    filterProjects(category);
    filterButtons.forEach((candidate) => candidate.classList.toggle('active', candidate === button));
    if (selectValue) selectValue.textContent = button.textContent.trim();
  });
});

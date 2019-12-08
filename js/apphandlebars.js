'use strict';

const animalsArray = [];
const keywords = [];

// constructor for the animal
function Animals(animalObj) {
  this.title = animalObj.title;
  // eslint-disable-next-line camelcase
  this.image_url = animalObj.image_url;
  this.description = animalObj.description;
  this.keyword = animalObj.keyword;
  this.horns = animalObj.horns;

  animalsArray.push(this);
}

Animals.prototype.handlebarsCompileAnimals = function () {
  // 1. get template from HTML
  let template = $('#animaltemplate').html();

  // 2. compile HTML via handlebars
  let templateRender = Handlebars.compile(template);

  // 3. return HTML
  return templateRender(this);
};

let renderAnimals = () => {
  animalsArray.forEach((animal) => {
    $('main').append(animal.handlebarsCompileAnimals());
  });
};

Animals.prototype.handlebarsCompileDropDown = function () {
  // 1. get template from HTML
  let template = $('#dropdowntemplate').html();

  // 2. compile HTML
  let templateRender = Handlebars.compile(template);

  // 3. return HTML
  return templateRender(this);

};

// make drop down menu containing unique keywords
let dropDownMenu = () => {
  animalsArray.forEach((animal) => {
    if (!keywords.includes(animal.keyword)) {
      keywords.push(animal.keyword);
      $('#dropdown').append(animal.handlebarsCompileDropDown());
    }
  });
};

// select dropdown, and on change of the box's content, hide everything and show only the animals whose keyword matches the clicked keyword
let filterAnimals = () => {
  $('#dropdown').on('change', () => {

    // disable the 'Filter by Keyword' option
    $('option[value="default"]').attr('disabled', 'disabled');

    $('.animal').hide();

    let clickedKeyword = $('#dropdown')[0].value;

    $(`section[id="${clickedKeyword}"`).show();
  });
};

// get data from json file and make object instances
// getting the data and making a new animal object
let pageoneData = () => {
  $.get('./data/page-1.json', animals => {
    animals.forEach(animal => {
      new Animals(animal);
    });
    dropDownMenu();
    renderAnimals();
    filterAnimals();
  });
};
let pagetwoData = () => {
  $.get('./data/page-2.json', animals => {
    animals.forEach(animal => {
      new Animals(animal);
    });
    dropDownMenu();
    renderAnimals();
    filterAnimals();
  });
};

// if on main page, load page 1 data, else load page 2 data
if (window.location.pathname.includes('/index.html')) {
  $('#indexbody').ready(pageoneData());
  $('#switchtopagetwo').on('click', function () {
    window.location = 'pagetwo.html';
  });
} else if (window.location.pathname.includes('/pagetwo.html')) {
  $('#pagetwobody').ready(pagetwoData());
  $('#switchtoindex').on('click', function () {
    window.location = 'index.html';
  });
} else {
  $('#indexbody').ready(pageoneData());
  $('#switchtopagetwo').on('click', function () {
    window.location = 'pagetwo.html';
  });
}


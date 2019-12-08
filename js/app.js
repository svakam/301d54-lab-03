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

Animals.prototype.handlebarsRender = function () {
  // 1. get template from HTML
  let template = $('#animaltemplate').html();

  // 2. compile HTML via handlebars
  let templateRender = Handlebars.compile(template);

  // 3. return HTML
  return templateRender(this);
};

// render the object
Animals.prototype.render = function () {

  // get the template
  const photoTemplate = $('#photo-template').html();

  // make a new section
  const $newSection = $('<section></section>');

  // set newsection's html content to the template
  $newSection.html(photoTemplate);

  // put the title into the section
  $newSection.find('h2').text(this.title);

  // put the image into the section
  $newSection.find('img').attr('src', this.image_url);
  $newSection.find('img').attr('alt', this.title);
  $newSection.attr('class', 'animal');
  $newSection.attr('id', this.keyword);

  // put description into section
  $newSection.find('p').text(this.description);

  // append newsection to parent (main)
  $('main').append($newSection);
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

// make drop down menu containing unique keywords
let dropDownMenu = animal => {
  if (!keywords.includes(animal.keyword)) {
    keywords.push(animal.keyword);

    // make a new option and add keyword
    let $newOption = $(`<option value='${animal.keyword}'>${animal.keyword}</option>`);

    $('#dropdown').append($newOption);
  }
};

// getting the data and making a new animal object
let pageoneData = () => {
  $.get('./data/page-1.json', animals => {
    animals.forEach(animal => {
      new Animals(animal).render();
      dropDownMenu(animal);
    });
    filterAnimals();
  });
};
let pagetwoData = () => {
  $.get('./data/page-2.json', animals => {
    animals.forEach(animal => {
      new Animals(animal).render();
      dropDownMenu(animal);
    });
    filterAnimals();
  });
};


// if on main page, load page 1 data, else load page 2 data
if (window.location.pathname.includes('/index.html')) {
  $('#indexbody').ready(pageoneData());
  $('#switchtopagetwo').on('click', function () {
    window.location = 'pagetwo.html';
  });
}
else if (window.location.pathname.includes('/pagetwo.html')) {
  $('#pagetwobody').ready(pagetwoData());
  $('#switchtoindex').on('click', function () {
    window.location = 'index.html';
  });
}
else {
  $('#indexbody').ready(pageoneData());
  $('#switchtopagetwo').on('click', function () {
    window.location = 'pagetwo.html';
  });
}

'use strict';

// keyword goes into dropdown
// url, title, description goes into section
// horns are a stretch goal

const animalsArray = [];

const keywords = [];

// constructor for the animal
function Animals(animalObj) {
  this.title = animalObj.title;
  this.image_url = animalObj.image_url;
  this.description = animalObj.description;
  this.keyword = animalObj.keyword;
  this.horns = animalObj.horns;

  animalsArray.push(this);
}

// render the object
Animals.prototype.render = function () {

  // render animals on first load
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

let filterAnimals = () => {
  // select dropdown, and on change of the box's content, hide everything and show only the animals whose keyword matches the clicked keyword
  $('#dropdown').on('change', () => {
    // disable the Filter by Keyword option every time
    $('option[value="showall"]').attr('disabled', 'disabled');

    $('.animal').hide();

    let clickedKeyword = $('#dropdown')[0].value;

    $(`section[id="${clickedKeyword}"`).show();
  });
};

// make drop down menu containing unique keywords
let dropDownMenu = animal => {
  if (!keywords.includes(animal.keyword)) {
    keywords.push(animal.keyword);
    console.log(keywords);
    console.log(animal.keyword);

    // make a new option and add keyword
    let $newOption = $(`<option value='${animal.keyword}'>${animal.keyword}</option>`);
    console.log($newOption);

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

// pageoneData();

let pagetwoData = () => {
  $.get('./data/page-2.json', animals => {
    animals.forEach(animal => {
      new Animals(animal).render();
      dropDownMenu(animal);
    });
    filterAnimals();
  });
};

//index.html button
$('#switchtopagetwo').on('click', function () {
  event.preventDefault();
  window.location = './pagetwo.html';
  pagetwoData();
});

//pagetwo.html button
$('#switchtoindex').on('click', function () {
  event.preventDefault();
  window.location = './index.html';
  pageoneData();
});

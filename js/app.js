'use strict';

// keyword goes into dropdown
// url, title, description goes into section
// horns are a stretch goal

let animalsArray = [];

const keywords = [];

// constructor for the animal
function Animals(animalObj) {
  this.title = animalObj.title;
  this.image_url = animalObj.image_url;
  this.description = animalObj.description;
  this.keyword = animalObj.keyword;
  this.horns = animalObj.horns;

  // animalsArray.push(this);
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

  // put description into section
  $newSection.find('p').text(this.description);

  // append newsection to parent (main)
  $('main').append($newSection);
};

function filterAnimals(animals) {
  // if a choice is clicked (choice contains keyword),
  // make note of keyword
  // hide everything and show the images with the keyword that was clicked on
  $('#dropdown').on('change', () => {
    $('.animal').hide();
    // console.log($('#dropdown option[value]'));
    console.log($('#dropdown option'));
    console.log($('#dropdown option').length);
    for (let i = 0; i < $('#dropdown option').length; i++) {
      console.log($('#dropdown option')[i]);
      console.log($('#dropdown option')[i].value);

      // animals.forEach(animal => {
      //   console.log(animal);
      // });
    }
  });

  // $('#dropdown').on('change', () => {
  //   console.log($(`option[value=${keywords}]`));
  // });
}

function dropDownMenu(animal) {
  if (!keywords.includes(animal.keyword)) {
    keywords.push(animal.keyword);

    // make a new option and add keyword
    let $newOption = $(`<option value='${animal.keyword}'>${animal.keyword}</option>`);

    $('#dropdown').append($newOption);
  }
}

function pageoneData(){
  // getting the data and making a new animal object
  $.get('./data/page-1.json', animals => {
    animals.forEach(animal => {
      new Animals(animal).render();
      dropDownMenu(animal);
      filterAnimals(animal);
    });
  });
}

// pageoneData();

function pagetwoData(){
  console.log('i am in pagetwodata');
  $.get('./data/page-2.json', animals => {
    animals.forEach(animal => {
      new Animals(animal).render();
      dropDownMenu(animal);
      filterAnimals(animal);
    });
  });
}

//index.html button
$('#indexhtml').on('click', function(){
  event.preventDefault();
  window.location = './pagetwo.html';
  // pagetwoData();
});

//pagetwo.html button
$('#pagetwobutton').on('click', function(){
  event.preventDefault();
  window.location = './index.html';
  // pageoneData();
});



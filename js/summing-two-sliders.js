import Rx from 'rxjs/Rx';

const recordObservation = Marbelous.createMarbleDisplay(document.getElementById('marbles-container'));

Rx.Observable.prototype.visualize = function(name){
  this.subscribe( e => recordObservation(name,e) );
  return this;
}

function valueFromEvent(e){
  return e.target.value;
}

const $sliderA = $('.slider.a input'),
      $sliderB = $('.slider.b input'),
      $labelA = $('.slider.a .label'),
      $labelB = $('.slider.b .label'),
      $labelSummed = $('.sum .label');

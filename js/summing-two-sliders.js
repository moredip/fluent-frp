import Rx from 'rxjs/Rx';

const recordObservation = Marbelous.createMarbleDisplay(document.getElementById('marbles-container'));

Rx.Observable.prototype.visualize = function(name){
  this.subscribe( e => recordObservation(name,e) );
  return this;
}

function valueFromEvent(e){
  return e.target.value;
}

function valueStreamFrom($slider){
  return Rx.Observable.fromEvent($slider,'input',valueFromEvent)
    .startWith($slider.val())
    .map( parseFloat );
}

const $sliderA = $('.slider.a input'),
      $sliderB = $('.slider.b input'),
      $labelA = $('.slider.a .label'),
      $labelB = $('.slider.b .label'),
      $labelSummed = $('.sum .label');

const valuesA = valueStreamFrom($sliderA);

valuesA.visualize('values A');

const valuesB = valueStreamFrom($sliderB);

valuesB.visualize('values B');

valuesA.subscribe( (v) => $labelA.text(v) );
valuesB.subscribe( (v) => $labelB.text(v) );

const summedValues = Rx.Observable.combineLatest(
    valuesA,
    valuesB,
    (a,b) => a+b
    );

summedValues.visualize('summed');

summedValues.subscribe( (v) => $labelSummed.text(v) );
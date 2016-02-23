import Rx from 'rxjs/Rx';
import NumberLine from './min-max/number-line.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

const numberLineContainer = document.getElementById('number-line');

function renderNumberLine(props){
  ReactDOM.render(
    <NumberLine {...props} />,
    numberLineContainer
  );
}

const recordObservation = Marbelous.createMarbleDisplay(document.getElementById('marbles-container'));

Rx.Observable.prototype.visualize = function(name){
  this.subscribe( e => recordObservation(name,e) );
  return this;
}

function valueFromEvent(e){
  return e.target.value;
}

const $slider = $('.slider input'),
      $label = $('.slider .label');

const numbers = Rx.Observable.fromEvent($slider,'input',valueFromEvent).map( parseFloat );
numbers.visualize( 'numbers' );

numbers.subscribe( f => $label.text(f) );


const mins = numbers
  .scan( Math.min )
  .distinctUntilChanged();

const maxes = numbers
  .scan( Math.max )
  .distinctUntilChanged();

mins.visualize( 'mins' );
maxes.visualize( 'maxes' );

const minsAndMaxes = Rx.Observable.combineLatest( mins, maxes, (min,max)=> { return {min,max} } );

minsAndMaxes.subscribe( renderNumberLine );

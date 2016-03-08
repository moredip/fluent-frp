import Rx from 'rxjs/Rx';
import setupMarbelous from './setup-marbelous';

import NumberLine from './min-max/number-line.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

setupMarbelous(Rx);

const numberLineContainer = document.getElementById('number-line');
function renderNumberLine(props){
  ReactDOM.render(
    <NumberLine {...props} />,
    numberLineContainer
  );
}

function valueFromEvent(e){
  return e.target.value;
}

const $slider = $('.slider input'),
      $label = $('.slider .label');

const number$ = Rx.Observable.fromEvent($slider,'input',valueFromEvent)
  .startWith($slider.val())
  .map( parseFloat )

number$.visualize( 'numbers' );

number$.subscribe( f => $label.text(f) );














//const viewState = Rx.Observable.combineLatest( number$, min$, max$, (number,min,max)=> { return {number,min,max} } );
//viewState.visualize('view state');
//viewState.subscribe( (vs)=> console.log("view state", vs) );
//viewState.subscribe( renderNumberLine );

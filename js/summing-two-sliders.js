import Rx from 'rxjs/Rx';
import setupMarbelous from './setup-marbelous';
setupMarbelous(Rx);

function valueFromEvent(e){
  return e.target.value;
}

const $sliderA = $('.slider.a input'),
      $sliderB = $('.slider.b input'),
      $labelA = $('.slider.a .label'),
      $labelB = $('.slider.b .label'),
      $labelSummed = $('.sum .label');

const valuesA = Rx.Observable.fromEvent($sliderA,'input',valueFromEvent);
valuesA.visualize('values A');

const valuesB = Rx.Observable.fromEvent($sliderB,'input',valueFromEvent);
valuesB.visualize('values B');

valuesA.subscribe( (v) => $labelA.text(v) );
valuesB.subscribe( (v) => $labelB.text(v) );

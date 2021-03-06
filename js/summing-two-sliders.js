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

const valueA$ = Rx.Observable.fromEvent($sliderA,'input',valueFromEvent);
valueA$.visualize('value A');

const valueB$ = Rx.Observable.fromEvent($sliderB,'input',valueFromEvent);
valueB$.visualize('value B');

valueA$.subscribe( (v) => $labelA.text(v) );
valueB$.subscribe( (v) => $labelB.text(v) );

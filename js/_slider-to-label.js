import Rx from 'rxjs/Rx';
import setupMarbelous from './setup-marbelous';
setupMarbelous(Rx);

function valueFromEvent(e){
  return e.target.value;
}

const $slider = $('.slider input'),
      $label = $('.slider .label');

const values = Rx.Observable.fromEvent($slider,'input',valueFromEvent);

values.visualize( 'values' );

const floats = values.map( v => parseFloat(v) )
floats.visualize( 'the floats' );

const percents = floats.map( v => Math.round(100*v) );
percents.visualize('percentages');

const formatted = percents.map( p => `${p}%` );

formatted.subscribe( f => $label.text(f) )

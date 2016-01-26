import Rx from 'rxjs/Rx';

const recordObservation = Marbelous.createMarbleDisplay(document.getElementById('marbles-container'));
function visualize(name,observable) {
  observable.subscribe( e => recordObservation(name,e) );
}

function valueFromEvent(e){
  return e.target.value;
}

const $slider = $('.slider input'),
      $label = $('.slider .label');

const values = Rx.Observable.fromEvent($slider,'input',valueFromEvent);
visualize('values',values);

const floats = values.map( (v) => parseFloat(v) );
visualize('floats',floats);

const percentages = floats.map( (f)=> Math.round(f*100) );
visualize('percentages',percentages);

const formatted = percentages.map( (p)=> `${p}%` );
visualize('formatted',formatted);

formatted.subscribe( f => $label.text(f) );

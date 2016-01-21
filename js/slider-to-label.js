import Rx from 'rxjs/Rx';

const recordObservation = Marbelous.createMarbleDisplay(document.getElementById('marbles-container'));
function visualize(name,observable) {
  observable.subscribe( e => recordObservation(name,e) );
}

function observeEventValues($el,eventName){
  return Rx.Observable.fromEvent($el, eventName)
    .map( (e)=> e.target.value );
}

function updateSpread(spread,curr){
  return {
    max: Math.max(curr,spread.max),
    min: Math.min(curr,spread.min)
  };
}

const $slider = $('.slider input'),
      $label = $('.slider .label');

const values = observeEventValues($slider,'input')
  .startWith($slider.val())
  .map( (v)=> parseFloat(v) );

visualize('slider values',values);

const min = values.scan( (min,curr)=> Math.min(min,curr) ).distinctUntilChanged();
const max = values.scan( (max,curr)=> Math.max(max,curr) ).distinctUntilChanged();
const spread = Rx.Observable.combineLatest(min,max, (min,max)=> [min,max]);

visualize('min',min);
visualize('max',max);

values
  .map( (v)=> Math.round(v*100) )
  .map( (v)=> `${v}%` )
  .subscribe( s => $label.text(s) );

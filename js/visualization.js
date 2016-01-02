import Rx from 'rx';
import createMarbleDisplay from './lib/marbles';

const recordObservation = createMarbleDisplay(document.getElementById('marbles-container'));

function visualize(name,observable) {
  observable.subscribe( e => recordObservation(name,e) );
}

const tickStream = Rx.Observable.interval(333);

const clickStream = Rx.Observable.fromEvent(document.getElementById('click-me'),'click')
  .map(()=>'tap!');

visualize('clicks',clickStream);
visualize('ticks',tickStream);

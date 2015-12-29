import Rx from 'rx';
import Immutable from 'immutable';
import createInitialRealizer from './lib/virtualDomRealizer';
import renderMarbles from './lib/visual';
import createMarbleDisplay from './lib/marbles';

const recordObservation = createMarbleDisplay(document.getElementById('marbles-container'));

const tickStream = Rx.Observable.interval(333);

const clickStream = Rx.Observable.fromEvent(document.getElementById('click-me'),'click')
  .map(()=>'tap!');

clickStream.timestamp().subscribe( function(s){
  recordObservation('clicks',s);
});

tickStream.timestamp().subscribe( function(s){
  recordObservation('ticks',s);
});

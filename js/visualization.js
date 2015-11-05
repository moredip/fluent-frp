import Rx from 'rx';
import Immutable from 'immutable';
import createInitialRealizer from './lib/virtualDomRealizer';
import renderMarbles from './lib/visual';

const initialRealizer = createInitialRealizer(document.getElementsByTagName('main')[0]);

let observations = new Rx.Subject(); 

function recordObservation(streamId,observation){
  observations.onNext({streamId,observation});
}

const animationFrames = Rx.Observable.interval(50,Rx.Scheduler.requestAnimationFrame);

const obsState = observations.scan( function(observables,{streamId,observation}){
  const EMPTY_OBSERVABLE = Immutable.Map({observations:Immutable.List()})

  return observables.update( streamId, EMPTY_OBSERVABLE, function(observable){
    return observable.update('observations', (obs)=> obs.push(observation));
  });
},Immutable.Map());

const stateFrames = animationFrames.withLatestFrom(obsState,(s1,s2)=> s2);

const realizerStream = stateFrames.scan( function(realizer, atom){
  const newTree = renderMarbles(atom.toJSON());
  const nextRealizer = realizer(newTree);
  return nextRealizer;
}, initialRealizer);

// Need something to pull values through. 
// TODO: How am I supposed to do this the Rx Way?
realizerStream.subscribe( function(){} )


const tickStream = Rx.Observable.interval(333);

const clickStream = Rx.Observable.fromEvent(document.getElementById('click-me'),'click')
  .map(()=>'tap!');

const stream = tickStream;

//animationFrames.subscribe(function(s){
  //console.log('ANIMATION',s);
//});

//stream.subscribe(function(s){
  //console.log('STREAM',s);
//});

//observations.subscribe(function(o){
  //console.log('OBSERVATION',o);
//});

//obsState.subscribe(function(o){
  //console.log('OBS',o.toJSON());
//});

clickStream.timestamp().subscribe( function(s){
  recordObservation('clicks',s);
});

tickStream.timestamp().subscribe( function(s){
  recordObservation('ticks',s);
});

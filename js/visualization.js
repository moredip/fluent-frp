import Rx from 'rx';
import Immutable from 'immutable';
import createInitialRealizer from './lib/virtualDomRealizer';
import renderMarbles from './lib/visual';

const initialRealizer = createInitialRealizer(document.getElementsByTagName('main')[0]);

let observations = new Rx.Subject(); 

function recordObservation(streamId,observation){
  observations.onNext({streamId,observation});
}

const obsState = observations.scan( function(observables,{streamId,observation}){
  const EMPTY_OBSERVABLE = Immutable.Map({observations:Immutable.List()})

  return observables.update( streamId, EMPTY_OBSERVABLE, function(observable){
    return observable.update('observations', (obs)=> obs.push(observation));
  });
},Immutable.Map());

const realizerStream = obsState.scan( function(realizer, atom){
  const newTree = renderMarbles(atom.toJSON());
  const nextRealizer = realizer(newTree);
  return nextRealizer;
}, initialRealizer);

// Need something to pull values through
realizerStream.subscribe( (r)=> console.log( "REALIZER", r ) );

const stream = Rx.Observable.interval(1000).timestamp();

//stream.subscribe(function(s){
  //console.log('STREAM',s);
//});

//observations.subscribe(function(o){
  //console.log('OBSERVATION',o);
//});

//obsState.subscribe(function(o){
  //console.log('OBS',o.toJSON());
//});

stream.subscribe( function(s){
  recordObservation('a-stream',s);
});

import Rx from 'rx';
import Immutable from 'immutable';
import createInitialRealizer from './virtualDomRealizer';
import renderMarbles from './visual';

export default function createMarbleDisplay(containerElement){

  const initialRealizer = createInitialRealizer(containerElement);

  let observations = new Rx.Subject(); 

  function recordObservation(streamId,observation){
    const timestamp = Date.now();
    observations.onNext({streamId,observation,timestamp});
  }

  const obsState = observations.scan( function(observables,{streamId,observation,timestamp}){
    const EMPTY_OBSERVABLE = Immutable.Map({streamName:streamId,observations:Immutable.List()})

    return observables.update( streamId, EMPTY_OBSERVABLE, function(observable){
      return observable.update('observations', (obs)=> obs.push({timestamp,value:observation}));
    });
  },Immutable.Map());

  const animationFrames = Rx.Observable.interval(50,Rx.Scheduler.requestAnimationFrame);
  const stateFrames = animationFrames.withLatestFrom(obsState,(s1,s2)=> s2);

  const realizerStream = stateFrames.scan( function(realizer, atom){
    const newTree = renderMarbles(atom.toJSON());
    const nextRealizer = realizer(newTree);
    return nextRealizer;
  }, initialRealizer);

  // Need something to pull values through. 
  // TODO: How am I supposed to do this the Rx Way?
  realizerStream.subscribe( ()=>{} )

  return recordObservation;
}

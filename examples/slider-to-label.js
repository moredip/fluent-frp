function observeEventValues($el,eventName){
  return Rx.Observable.fromEvent($el, eventName)
    .map( (e)=> e.target.value );
}

const Rx = require('rx');
const $slider = $('.slider input'),
      $label = $('.slider .label');


const source = observeEventValues($slider,'input')
  .map( (v)=> parseFloat(v) )
  .map( (v)=> Math.round(v*100) )
  .map( (v)=> `${v}%` )

//source.subscribe( function(s){
  //console.log(s);
//});

source.subscribe( function(s){
  $label.text(s);
});

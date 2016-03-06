export default function setupMarbelous(Rx){
  const recordObservation = Marbelous.createMarbleDisplay(document.getElementById('marbles-container'));

  Rx.Observable.prototype.visualize = function(name){
    this.inspectTime(60).subscribe( e => recordObservation(name,e) );
    return this;
  }
}

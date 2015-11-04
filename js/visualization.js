import createInitialRealizer from './lib/virtualDomRealizer';
import renderMarbles from './lib/visual';

var counter = 0;
function render(){
  counter += 1;
  return <div>Hello VDom World <span>{counter}</span></div>;
}

var realizer = createInitialRealizer(document.getElementsByTagName('main')[0]);

function atom(){
  var observables = []
  observables.push({
    marbles: [
      {
        timestamp: Date.now()-100
      },
      {
        timestamp: Date.now()-40
      },
      {
        timestamp: Date.now()
      }
    ]
  });

  observables.push({
    marbles: [
      {
        timestamp: Date.now()-200
      },
      {
        timestamp: Date.now()-120
      },
      {
        timestamp: Date.now()+10
      }
    ]
  });

  return {observables};
}

realizer = realizer(renderMarbles(atom()));

//setInterval( function(){
  //realizer = realizer(render());
//}, 40 );

import _ from 'underscore';
import d3 from 'd3';
import h from 'virtual-dom/virtual-hyperscript';
import svg from 'virtual-dom/virtual-hyperscript/svg';

/** @jsx jsxToHyperscriptAdapter */
function jsxToHyperscriptAdapter(name,props,...children){
  if( _.contains(['svg','g','circle'],name) ){
    return svg(name,props,children);
  }else{
    return h(name,props,children);
  }
}

const circleStyle = {fill:"#ddd",stroke:"#999", strokeWidth:"2px"},
      CIRCLE_RADIUS = 10,
      VERT_PADDING = 8,
      FULL_HEIGHT = (CIRCLE_RADIUS * 2) + (VERT_PADDING*2),
      FULL_WIDTH = 400,
      HORZ_PADDING = 20;
      

function findFullTimeRange(observables){
  const timestamps = _.flatten( observables.map( (o)=> o.marbles.map( (m) => m.timestamp ) ) );
  return [_.min(timestamps),_.max(timestamps)];
}

function renderMarble({marble,timescale}){
  const cx = timescale(marble.timestamp);
  return <circle cx={cx} style={circleStyle} r={CIRCLE_RADIUS}></circle>;
}

function renderObservableLine({vertIndex,marbles,timescale}){
  const vertOffset = (vertIndex*FULL_HEIGHT) + (FULL_HEIGHT/2) + VERT_PADDING
  const circles = marbles.map( function(marble){
    return renderMarble({marble,timescale});
  });
  
  const transform = `translate(0,${vertOffset})`;
  return <g transform={transform}>
    {circles}
  </g>;
}

export default function render(atom){
  const timeRange = findFullTimeRange(atom.observables);
  const timescale = d3.time.scale()
      .domain(timeRange)
      .range([HORZ_PADDING,FULL_WIDTH-HORZ_PADDING]);

  const lines = atom.observables.map(function(observable,ix){
    return renderObservableLine({marbles:observable.marbles,vertIndex:ix,timescale:timescale});
  });

  return <section>
    <h1>MARBLES!</h1>
    <svg height="100%" width="100%">
      {lines}
    </svg>
  </section>;
}

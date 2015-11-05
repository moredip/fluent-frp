import _ from 'underscore';
import d3 from 'd3';
import h from 'virtual-dom/virtual-hyperscript';
import svg from 'virtual-dom/virtual-hyperscript/svg';

/** @jsx jsxToHyperscriptAdapter */
function jsxToHyperscriptAdapter(name,props,...children){
  if( _.contains(['svg','g','circle','text','line'],name) ){
    return svg(name,props,children);
  }else{
    return h(name,props,children);
  }
}

const circleStyle = {fill:"#ddd",stroke:"#999", strokeWidth:"2px"},
      CIRCLE_RADIUS = 20,
      VERT_PADDING = 8,
      FULL_HEIGHT = (CIRCLE_RADIUS*2) + (VERT_PADDING*2),
      FULL_WIDTH = 400,
      HORZ_PADDING = 40,
      TIME_RANGE = 1000*7;
      

function findFullTimeRange(observables){
  const timestamps = _.flatten( observables.map( (o)=> o.observations.map( (obs) => obs.timestamp ) ) );
  return [_.min(timestamps),_.max(timestamps)];
}

function renderMarble({observation,timescale}){
  const x = timescale(observation.timestamp);

  if( x < -100 ){
    return undefined;
  }

  const fadescale = timescale.copy().range([0.2,1])
  const opacity = fadescale(observation.timestamp);
  const y = 0;
  const transform = `translate(${x},${y})`;

  const TEXT_PROPS = { 'alignment-baseline': 'middle', 'text-anchor':'middle' };
  return <g transform={transform} opacity={opacity}>
    <circle style={circleStyle} r={CIRCLE_RADIUS}></circle>
    <text {...TEXT_PROPS}>
      {observation.value}
    </text>
  </g>;
}

function renderObservableLine({vertIndex,observable,timescale}){
  const vertOffset = (vertIndex*FULL_HEIGHT) + (FULL_HEIGHT/2) + VERT_PADDING
  const circles = _.compact( observable.observations.map( function(observation){
    return renderMarble({observation,timescale});
  }));
  
  const transform = `translate(0,${vertOffset})`;
  return <g transform={transform}>
    <line class="marble-line" x1="0" y1={0} x2={FULL_WIDTH} y2={0}/>
    {circles}
  </g>;
}

export default function render(observables){
  // const timeRange = findFullTimeRange(_.values(observables));
  const now = Date.now();
  const timeRange = [now - TIME_RANGE,now];
  const timescale = d3.time.scale()
      .domain(timeRange)
      .range([HORZ_PADDING,FULL_WIDTH-HORZ_PADDING]);

  const lines = _.values(observables).map(function(observable,ix){
    return renderObservableLine({observable:observable,vertIndex:ix,timescale:timescale});
  });

  return <section>
    <h1>MARBLES!</h1>
    <svg class="marbles" height="100%" width="100%">
      {lines}
    </svg>
  </section>;
}

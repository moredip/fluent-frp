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

const CIRCLE_STYLE = {fill:"#ddd",stroke:"#999", strokeWidth:"2px"},
      MARBLE_TEXT_PROPS = { 'alignment-baseline': 'middle', 'text-anchor':'middle' },
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

  // don't render things that are way off-scene
  if( x < -100 ){
    return undefined;
  }

  const fadescale = timescale.copy().range([0.1,1])
  const opacity = fadescale(observation.timestamp);
  const transform = `translate(${x},0)`;

  return <g class="marble" transform={transform} opacity={opacity}>
    <circle r={CIRCLE_RADIUS}></circle>
    <text class="marble-text" {...MARBLE_TEXT_PROPS}>
      {observation.value}
    </text>
  </g>;
}

function renderLatestValueMarble(observation,xOffset){
  const transform = `translate(${xOffset},0)`;

  return <g class="marble curr-value" transform={transform}>
    <circle r={CIRCLE_RADIUS}></circle>
    <text {...MARBLE_TEXT_PROPS}>
      {observation.value}
    </text>
  </g>;
}

function latestValueFrom(observable){
  return _.last( observable.observations );
}

function renderObservableLine({observable,timescale}){
  const vertOffset = (FULL_HEIGHT/2);
  const marbles = _.compact( observable.observations.map( function(observation){
    return renderMarble({observation,timescale});
  }));
  const latestValueMarble = renderLatestValueMarble( 
      latestValueFrom(observable),
      timescale.range()[1]
      );
  
  const transform = `translate(0,${vertOffset})`;
  return <section className="marble-stream">
    <h2>{observable.streamName}</h2>
    <svg class="marbles" width={FULL_WIDTH} height={FULL_HEIGHT}>
    <g transform={transform}>
    <line class="marble-line" x1="0" x2={FULL_WIDTH-HORZ_PADDING} y1="0" y2="0"/>
    {latestValueMarble}
    {marbles}
  </g>
  </svg>
  </section>;
}

export default function render(observables){
  // const timeRange = findFullTimeRange(_.values(observables));
  const now = Date.now();
  const timeRange = [now - TIME_RANGE,now];
  const timescale = d3.time.scale()
      .domain(timeRange)
      .range([HORZ_PADDING,FULL_WIDTH-HORZ_PADDING]);

  const lines = _.values(observables).map(function(observable){
    return renderObservableLine({observable:observable,timescale:timescale});
  });

  return <section className="stream-visualizations">
      {lines}
    </section>;
}

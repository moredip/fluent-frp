import React from 'react';

const FULL_WIDTH=400;

function scaleX(normalizedX){
  return `${normalizedX*FULL_WIDTH}`;
}

function renderCurrMarker(normalizedX){
  const x = scaleX(normalizedX);
  return <line className='number-line__curr-marker' x1={x} y1="5" x2={x} y2="35"></line>
}

function renderMinMarker(x){
  return renderMinMaxMarker( x, "M -10 5 l 10 15 l -10 15" );
}

function renderMaxMarker(x){
  return renderMinMaxMarker( x, "M 10 5 l -10 15 l 10 15" );
}

function renderMinMaxMarker(x,pathDesc){
  const transform = `translate(${scaleX(x)},0)`;
  return (
    <path 
      className="number-line__range-marker" 
      d={pathDesc}
      transform={transform}/>
  );
}

export default function renderNumberLine(props){
  return (
    <section className="number-line">
      <h1 className="number-line__title">range:</h1>
      <div>min: {props.min}</div>
      <div>max: {props.max}</div>
      <svg width={`${FULL_WIDTH+20}px`} height="100px">
        <g transform="translate(10,10)">
          <line className="number-line__number-line" x1="0" y1="20" x2={FULL_WIDTH} y2="20"></line>
          <line className="number-line__range-line" 
            x1={scaleX(props.min)} y1="20" 
            x2={scaleX(props.max)} y2="20"></line>
          {renderCurrMarker(props.number)}
          {renderMinMarker(props.min)}
          {renderMaxMarker(props.max)}
        </g>
      </svg>
    </section>
  );
}

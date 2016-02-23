import React from 'react';

const FULL_WIDTH=400;

function renderMarker(normalizedX,key){
  var x = ""+(400*normalizedX)+"px";
  return <line key={key} className="number-line__marker" x1={x} y1="5" x2={x} y2="35"></line>
}

export default function renderNumberLine(props){
  return (
    <svg width={""+FULL_WIDTH+"px"} height="100px">
      <g tranform="translate(0,10)">
        <line className="number-line__number-line" x1="0" y1="20" x2="100%" y2="20"></line>
        {renderMarker(props.min,'min')}
        {renderMarker(props.max,'max')}
      </g>
    </svg>
  );
}

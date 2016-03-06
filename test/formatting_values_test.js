import {expect} from 'chai';
import Rx from 'rxjs/Rx';

function formatValues(values$){
  return values$.map( v => parseFloat(v) )
    .map( v => Math.round(100*v) )
    .map( p => `${p}%` );
}

describe( 'formatting input values', function(){
  it('formats values correctly', function(){
    var values$ = Rx.Observable.of("0.12","0.555","0","1.173");
    var expectedResult = ["12%","56%","0%","117%"];
    
    return formatValues(values$).toArray().do( function(actualResult){
      expect(actualResult).to.eql(expectedResult);
    }).toPromise();
  });
});

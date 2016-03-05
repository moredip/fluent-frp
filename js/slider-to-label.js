import Rx from 'rxjs/Rx';
import setupMarbelous from './setup-marbelous';
setupMarbelous(Rx);

function valueFromEvent(e){
  return e.target.value;
}

const $slider = $('.slider input'),
      $label = $('.slider .label');

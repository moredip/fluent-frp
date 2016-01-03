import {create,diff,patch} from 'virtual-dom';

// A realizer is a function which takes a new virtual-dom tree and makes it "real" by 
// mutating the actual DOM. Each call to the realizer returns a new realizer which can be used to
// apply the next mutation.

function createNextRealizerFn(prevTree,prevRootNode){
  return function( newTree ){
    const patches = diff(prevTree,newTree);
    const newRootNode = patch(prevRootNode,patches);

    return createNextRealizerFn(newTree,newRootNode);
  }
}

function initialRealization( tree, container ){
  const rootNode = create(tree);
  container.appendChild(rootNode);
  return createNextRealizerFn(tree,rootNode);
};

// partial application of initialRealization
export default function createInitialRealizerFn(container){
  return function(tree){ return initialRealization(tree,container); };
}

const clamp = (num:number, min:number, max:number) => {return Math.min(Math.max(num, min), max)};

export default function initFinalDiagram(){
  const elArea = document.getElementsByClassName('finalDiagram')[0];
  const slider = document.getElementById('finalDiagramSlider')!;
  const aligner = document.getElementById('aligner');
   
  // get size of diagram
  let diagramSize = elArea.clientWidth;
  window.addEventListener('resize', ()=>{
    diagramSize = elArea.clientWidth;
  })

  // get current mouse
  let mouseX = 0;
  let mouseRange = 0;
  //mouseevent
  elArea.addEventListener('mousemove', (e:any)=>{
    mouseX = e.offsetX;
    mouseRange = (mouseX/diagramSize);
    // clamp input;
    mouseRange = clamp(mouseRange, 0, 1);
    //move slider
    slider.style = `left: -${mouseRange*5.75}em`;
    moveSlider(mouseRange);
  })
  elArea.addEventListener('touchmove', (e:any)=>{
    mouseX = e.touches[0].clientX;
    mouseRange = (mouseX/diagramSize)
    // clamp input;
    mouseRange = clamp(mouseRange, 0, 1);
    slider.style = `left: -${mouseRange*5.75}em`;
    moveSlider(mouseRange);
  })
  moveSlider(mouseRange);

  function moveSlider(range:number){
    // align alignment visual
    const alignmentFactor = (range*10)%1;
    aligner!.style = `left: ${7+(alignmentFactor*5.25)}em`  // 7em is at 0
  }
}
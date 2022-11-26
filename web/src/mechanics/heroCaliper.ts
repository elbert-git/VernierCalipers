const clamp = (num:number, min:number, max:number) => {return Math.min(Math.max(num, min), max)};

export default function initCalipers(){
  const offset = 0.1;
  const limit = 0.67125;
  const elArea:HTMLElement = document.querySelector('.heroHolder')!;
  const elSlidingElement:any = document.querySelectorAll('.heroSlider')!;
  const elLabel = document.querySelector('.heroMeasurementLabel')!;

  // get size of size of hero
  let heroSize = elArea.clientWidth;
  document.addEventListener('resize', ()=>{
    heroSize = elArea.clientWidth;
  })
   
  //get current mouse x
  let mouseX = 0;
  let mouseRange = 0;

  // mouse event 
  elArea.addEventListener('mousemove', (e)=>{
    mouseX = e.offsetX;

    // get current mouse
    mouseRange = (mouseX/heroSize) - offset;
    // clamp mouse move
    mouseRange = clamp(mouseRange, 0, limit);
    console.log(mouseRange);
     
    // move the slider
    [...elSlidingElement].forEach((element) => {
      element.style = `left: ${mouseRange*heroSize}px`
    });
     
    // get measurement
    const measurement = clamp((mouseX/heroSize)*15, 0, 12);
    elLabel.innerHTML = measurement.toFixed(2).toString() + " cm";
  })

  // touch event 
  elArea.addEventListener('touchmove', (e)=>{
    mouseX = e.touches[0].clientX;

    // get current mouse
    mouseRange = (mouseX/heroSize) - offset;
    // clamp mouse move
    mouseRange = clamp(mouseRange, 0, limit);
     
    // move the slider
    [...elSlidingElement].forEach((element) => {
      element.style = `left: ${mouseRange*heroSize}px`
    });
  });
   
  // create lerp loop
  function moveSlider(){

  }
}



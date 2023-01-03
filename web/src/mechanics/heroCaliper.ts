const clamp = (num:number, min:number, max:number) => {return Math.min(Math.max(num, min), max)};

export function map(current: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
  const mapped: number = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  return clamp(mapped, out_min, out_max);
}

export default function initCalipers(){
  const offset = 0.1;
  const limit = 0.67125;
  const measurementThreshold = 0.1;
  const elArea:HTMLElement = document.querySelector('.heroHolder')!;
  const elSlidingElement:any = document.querySelectorAll('.heroSlider')!;
  const elLabel = document.querySelector('.heroMeasurementLabel')!;

  // get size of size of hero
  let heroSize = elArea.clientWidth;
  window.addEventListener('resize', ()=>{
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
     
    // move the slider
    [...elSlidingElement].forEach((element) => {
      element.style = `left: ${mouseRange*heroSize}px`
    });
     
    // get measurement
    const measurement = map(mouseRange, 0, limit, 0, 12)
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

    // get measurement
    const measurement = map(mouseRange, 0, limit, 0, 12)
    elLabel.innerHTML = measurement.toFixed(2).toString() + " cm";
  });
   
}



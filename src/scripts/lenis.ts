import Lenis from "@studio-freight/lenis";

const initializeLenis = () => {
  const lenis = new Lenis({
    duration: 1,
    autoResize: true
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  
  requestAnimationFrame(raf);
  
}

export default {
  initializeLenis
}

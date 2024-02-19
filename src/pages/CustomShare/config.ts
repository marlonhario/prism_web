export const cubeAnimation = {
  initial: 'enter',
  animate: 'animate',
  exit: 'exit',
  dragConstraints: { left: 0, right: 0 },
  dragElastic: 0.15,
  dragTransition: { bounceStiffness: 600, bounceDamping: 50 },
  variants: {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 50 : -50,
        opacity: 0
      };
    },
    animate: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0
      };
    }
  },
  transition: {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.35 }
  }
};


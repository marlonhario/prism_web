export const dropdownAnimation = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0
  }
}

export const dropdownItemAnimation = {
  initial: {
    opacity: 0,
    translateY: 20
  },
  animate: {
    opacity: 1,
    translateY: 0
  },
  exit: {
    opacity: 0,
    translateY: 20
  }
}

export const searchInputAnimation = {
  initial: { width: 0 },
  animate: { width: '100%' }
}

export const searchTextAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}
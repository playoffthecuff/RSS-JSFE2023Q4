export const createElement = (type, ...classes) => {
  const elem = document.createElement(type);
  if (classes.length !== 0) {
    for (let i = 0; i < classes.length; i += 1) {
      if (classes[i]) elem.classList.add(classes[i]);
    }
  }
  return elem;
  }
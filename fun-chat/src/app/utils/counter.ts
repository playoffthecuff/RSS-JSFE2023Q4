function createCounter() {
  let count = 0;
  return () => {
    const value = count;
    count += 1;
    return value;
  };
}

const counter = createCounter();
export default counter;

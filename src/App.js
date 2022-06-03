import "./App.css";
import Sketch from "react-p5";
import p5 from "p5";

function App() {
  var array = [];
  var state = [];
  const width = 2;

  const setup = (p5, parentRef) => {
    p5.createCanvas(p5.windowWidth - 10, p5.windowHeight - 10);
    array = new Array(Math.floor(p5.windowWidth / width));
    for (var i = 0; i < array.length; i++) {
      array[i] = p5.random(p5.windowHeight);
      state[i] = -1;
    }
    quickSort(array, 0, array.length - 1);
  };

  async function quickSort(arr, start, end) {
    if (start >= end) {
      return;
    }
    let index = await partition(arr, start, end);
    state[index] = -1;

    await Promise.all([
      quickSort(arr, start, index - 1),
      quickSort(arr, index + 1, end),
    ]);
  }

  async function partition(arr, start, end) {
    for (let i = start; i < end; i++) {
      state[i] = 1;
    }

    let pivotValue = arr[end];
    let pivotIndex = start;
    state[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        await swap(arr, i, pivotIndex);
        state[pivotIndex] = -1;
        pivotIndex++;
        state[pivotIndex] = 0;
      }
    }
    await swap(arr, pivotIndex, end);

    for (let i = start; i < end; i++) {
      if (i !== pivotIndex) {
        state[i] = -1;
      }
    }

    return pivotIndex;
  }

  async function swap(arr, a, b) {
    await sleep(2);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const draw = (p5) => {
    p5.background(0);

    for (var i = 0; i < array.length; i++) {
      p5.noStroke();

      if (state[i] === 0) p5.fill("#E0777D");
      else if (state[i] === 1) p5.fill("#D6FFB7");
      else p5.fill(255);

      p5.rect(i * width, p5.windowHeight - array[i], width, array[i]);
    }
  };

  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}

export default App;

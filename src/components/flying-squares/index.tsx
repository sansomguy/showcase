import {
  component$,
  useStyles$,
  useStore,
  useOnDocument,
  $,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import styles from "./style.css?inline";

export default component$(() => {
  useStyles$(styles);
  const squares = useStore(createInitialState());
  const previousScroll = useSignal(0);
  const scrollUpdate = useSignal(0);
  // const mousePosition = useSignal({ x: 0, y: 0 });

  // useOnDocument(
  //   "mousemove",
  //   $((e) => {
  //     const xPercent = (e.clientX / window.innerWidth) * 100;
  //     const yPercent = (e.clientY / window.innerHeight) * 100;
  //     mousePosition.value = { x: xPercent, y: yPercent };
  //   })
  // );

  useVisibleTask$(() => {
    function update(timestamp: number) {
      const timeUpdate = progressOverTime(timestamp);
      // const latestControlPoint = controlPointFromMouse(mousePosition.value);
      const latestDestinationPoint = destinationPointFromScroll(
        scrollUpdate.value
      );
      const updateDelta = timeUpdate + Math.abs(scrollUpdate.value);
      updateSquares(squares, updateDelta, controlPoint, latestDestinationPoint);
      scrollUpdate.value = 0;
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });

  useOnDocument(
    "scroll",
    $((e) => {
      const document = e.target as Document;
      const window = document.defaultView!;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const newScrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollDiff = previousScroll.value - newScrollTop;
      previousScroll.value = newScrollTop;
      const normalizedDiff = scrollDiff / scrollHeight;
      scrollUpdate.value = normalizedDiff;
    })
  );

  return (
    <>
      {Object.values(squares).map((square) => {
        return (
          <div
            key={`square-${square.id}`}
            class={`flying-square`}
            style={{
              left: `${square.initial.x}vw`,
              top: `${square.initial.y}vh`,
              transform: `perspective(500px) translate(${square.x}vw, ${square.y}vh) scale(${1 - square.progress})`,
              opacity: square.opacity,
            }}
          ></div>
        );
      })}
    </>
  );
});

const START_MIN_X = 0;
const START_MAX_X = 30;
const START_MIN_Y = 0;
const START_MAX_Y = 100;
const START_MAX_Z = 5;
const START_MIN_OPACITY = 0.1;
const START_MAX_OPACITY = 0.3;

const DESTINATION_X = 100;
const DESTINATION_Y = 0;
const DESTINATION_Z = 0;
const DESTINATION_OPACITY = 0;

const CONTROL_POINT_X = 50;
const CONTROL_POINT_Y = 50;

const controlPoint = {
  x: CONTROL_POINT_X,
  y: CONTROL_POINT_Y,
};

// function controlPointFromMouse(mousePosition: { x: number; y: number }) {
//   return {
//     x: CONTROL_POINT_X - mousePosition.x,
//     y: CONTROL_POINT_Y - mousePosition.y,
//     z: DESTINATION_Z,
//   };
// }
let currentDestinationY = DESTINATION_Y;
function destinationPointFromScroll(scrollDelta: number) {
  return {
    x: DESTINATION_X,
    y: (currentDestinationY = Math.max(
      0,
      Math.min(currentDestinationY - scrollDelta * 100, 100)
    )),
    z: DESTINATION_Z,
  };
}
let previousTimestamp = 0;
function progressOverTime(timestamp: number) {
  const diff = timestamp - previousTimestamp;
  previousTimestamp = timestamp;
  return diff / 5000;
}

function updateSquares(
  squares: Record<string, Square>,
  normalizedDiff: number,
  latestControlPoint: { x: number; y: number },
  latestDestinationPoint: { x: number; y: number; z: number }
) {
  for (const squareKey in squares) {
    const square = squares[squareKey];
    if (square.progress >= 1) {
      resetSquare(square);
    }
    square.progress = Math.min(
      square.progress + square.progressRate * normalizedDiff,
      1
    );
    const controlPoint = {
      x: latestControlPoint.x + square.initial.x,
      y: latestControlPoint.y - square.initial.y,
    } as const;
    // destination with respect to viewport
    // measured as difference from starting  point
    const destination = {
      x: latestDestinationPoint.x + square.initial.x,
      y: latestDestinationPoint.y - square.initial.y,
      z: latestDestinationPoint.z,
    };

    square.x = bezier(
      square.initial.x,
      controlPoint.x,
      destination.x,
      square.progress
    );
    square.y = bezier(
      square.initial.y,
      controlPoint.y,
      destination.y,
      square.progress
    );

    square.z =
      (1 - square.progress) * square.initial.z +
      destination.z * square.progress;

    square.opacity =
      (1 - square.progress) * square.initial.opacity +
      DESTINATION_OPACITY * square.progress;
  }
}

type Square = {
  id: string;
  x: number;
  y: number;
  z: number;
  initial: {
    x: number;
    y: number;
    z: number;
    opacity: number;
  };
  opacity: number;
  progress: number;
  progressRate: number;
  sum: number;
};

function createInitialState() {
  return Array.from({ length: 30 }, (_, i) => i)
    .map(
      (i) =>
        ({
          id: i.toString(),
          initial: {},
        }) as any
    )
    .map(resetSquare)
    .reduce(
      (acc, square) => {
        acc[square.id] = square;
        return acc;
      },
      {} as Record<string, Square>
    );
}

function resetSquare(square: Square): Square {
  square.initial.x =
    START_MIN_X + Math.floor(Math.random() * START_MAX_X - START_MIN_X);
  square.initial.y =
    START_MIN_Y + Math.floor(Math.random() * START_MAX_Y - START_MIN_Y);
  square.initial.z = Math.random() * START_MAX_Z;
  square.initial.opacity =
    START_MIN_OPACITY +
    Math.floor(Math.random() * START_MAX_OPACITY - START_MIN_OPACITY);
  
  square.progressRate = Math.random();
  
  square.x = 0;
  square.y = 0;
  square.z = 0;
  square.progress = 0;
  square.opacity = 0;

  return square;
}

function bezier(p1: number, p2: number, p3: number, t: number) {
  return (1 - t) ** 2 * p1 + 2 * (1 - t) * t * p2 + t ** 2 * p3;
}

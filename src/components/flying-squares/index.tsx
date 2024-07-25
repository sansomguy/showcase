import {
  component$,
  useStyles$,
  useStore,
  useOnDocument,
  $,
  useOnWindow,
  useSignal,
} from "@builder.io/qwik";
import styles from "./style.css?inline";

// TODO
// should have different shapes,
// should have different starting positions,
// should all move with an arc motion instead of a straight line
// should all move in the same direction but at different speeds based on starting z-index
// should have different z-indexes with ones above z-index 0 using background blur effect

export default component$(() => {
  useStyles$(styles);
  const squares = useStore(createInitialState());
  const previousScroll = useSignal(0);

  useOnDocument(
    "scroll",
    $((e) => {
      const document = e?.target as Document;
      const window = document.defaultView!;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const newScrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollDiff = Math.abs(previousScroll.value - newScrollTop);
      previousScroll.value = newScrollTop;
      const normalizedDiff = scrollDiff / scrollHeight;

      
      requestAnimationFrame(() => {
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
            x: 50 + square.initial.x,
            y: 50 - square.initial.y,
          } as const;
          const topRight = {
            x: 100 + square.initial.x,
            y: 0 - square.initial.y,
            z: 0,
          };

          square.x = bezier(
            square.initial.x,
            controlPoint.x,
            topRight.x,
            square.progress
          );
          square.y = bezier(
            square.initial.y,
            controlPoint.y,
            topRight.y,
            square.progress
          );
          square.z =
            ((1 - square.progress) * square.initial.z) + (topRight.z * square.progress);
          square.opacity = square.progress;
        }
      });
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

type Square = {
  id: string;
  x: number;
  y: number;
  z: number;
  initial: {
    x: number;
    y: number;
    z: number;
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
          initial: {}
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

function resetSquare(old: Square): Square {
  old.initial.x = Math.floor(Math.random() * 30);
  old.initial.y = Math.floor(Math.random() * 30); // random starting Y position
  old.initial.z = Math.random() * 5;
  old.progressRate = Math.random();
  old.x = 0;
  old.y = 0;
  old.z = 0;
  old.opacity = 0;
  old.progress = 0;

  return old;
}

function bezier(p1: number, p2: number, p3: number, t: number) {
  return (1 - t) ** 2 * p1 + 2 * (1 - t) * t * p2 + t ** 2 * p3;
}

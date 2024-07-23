import {
  component$,
  useStyles$,
  useStore,
  useOnDocument,
  $,
  useOnWindow,
} from "@builder.io/qwik";
import styles from "./style.css?inline";

// TODO
// should have different shapes, 
// should have different starting positions,
// should all move with an arc motion instead of a straight line
// should all move in the same direction but at different speeds based on starting z-index
// should have different z-indexes with ones above z-index 0 using background blur effect
type SquareState = {
  id: string;
  x: number;
  y: number;
  z: number;
  opacity: number;
  initial?: {
    x: number;
    y: number;
  };
  ref: Element;
};

const createInitialState = () =>
  Array.from({ length: 1 }, (_, i) => i)
    .map(() => ({
      id: `${Math.random()}`,
      x: 0,
      y: 0,
      z: 0,
      ref: null as any,
      opacity: 1,
    }))
    .reduce(
      (acc, square) => {
        acc[square.id] = square;
        return acc;
      },
      {} as Record<string, SquareState>
    );

export default component$(() => {
  useStyles$(styles);
  const squares = useStore(createInitialState());

  useOnWindow(
    "resize",
    $(() => {
      for (const squareKey in squares) {
        const square = squares[squareKey];
        if (square.ref) {
          const htmlTarget = square.ref as HTMLElement;
          const rect = htmlTarget.getBoundingClientRect();
          square.initial = {
            x: rect.right,
            y: rect.top,
          };
        }
      }
    })
  );

  useOnDocument(
    "scroll",
    $((e) => {
      const document = e?.target as Document;
      const window = document.defaultView!;
      const yOffset = window.scrollY!;
      const progress = (yOffset / document.body.clientHeight);

      for (const squareKey in squares) {
        const square = squares[squareKey];
        if (!square.initial && square.ref) {
          const htmlTarget = square.ref as HTMLElement;
          const rect = htmlTarget.getBoundingClientRect();

          square.initial = {
            x: rect.right,
            y: rect.top,
          };
        }

        if (square.initial) {
          const x = square.initial.x;
          const y = square.initial.y;
          const originalDistanceFromCenterX = window.innerWidth / 2 - x;
          const originalDistanceFromCenterY = window.innerHeight / 2 - y;

          square.x = originalDistanceFromCenterX * progress;
          square.y = originalDistanceFromCenterY * progress;
          square.z = progress * -100;
        }

        square.opacity = 0.8 - (1 * progress);
      }
    })
  );

  return (
    <>
      {Object.values(squares).map((square) => {
        return (
          <div
            key={`square-${square.id}`}
            class="flying-square"
            ref={(el) => (square.ref = el)}
            data-initial-x={square.initial?.x}
            data-initial-y={square.initial?.y}
            style={{
              transform: `perspective(500px) translate3d(${square.x}px, ${square.y}px, ${square.z}px)`,
              opacity: square.opacity,
            }}
          ></div>
        );
      })}
    </>
  );
});

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
    z: number;
    opacity: number;
  };
  ref: Element;
};

export default component$(() => {
  useStyles$(styles);
  const squares = useStore(createInitialState());

  // useOnWindow(
  //   "resize",
  //   $(() => {
  //     for (const squareKey in squares) {
  //       const square = squares[squareKey];
  //       if (square.ref) {
  //         const htmlTarget = square.ref as HTMLElement;
  //         const rect = htmlTarget.getBoundingClientRect();
  //         square.initial = {
  //           x: rect.right,
  //           y: rect.top,
  //         };
  //       }
  //     }
  //   })
  // );

  useOnDocument(
    "scroll",
    $((e) => {
      const document = e?.target as Document;
      const window = document.defaultView!;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;

      const controlPoint = {
        x: window.innerWidth / 4,
        y: window.innerWidth / 4,
        z: 100,
      } as const;


      console.log(progress);

      for (const squareKey in squares) {
        const square = squares[squareKey];
        if (!square.initial && square.ref) {
          const htmlTarget = square.ref as HTMLElement;
          const rect = htmlTarget.getBoundingClientRect();

          square.initial = {
            x: rect.x,
            y: rect.y,
            z: 0,
            opacity: parseFloat(htmlTarget.style.opacity),
          };
        }

        if (square.initial) {
          const startingPoint = square.initial;
          const topRight = {
            x: window.innerWidth,
            y: window.innerHeight,
            z: -500,
          };

          

          const newXY = threePointBezier(
            startingPoint,
            controlPoint,
            topRight,
            progress
          );

          square.x = newXY.x;
          square.y = newXY.y;
          square.z = newXY.z;
          // square.opacity = 0.8 - (square.initial.opacity * progress);
        }
      }
    })
  );

  return (
    <>
      {Object.values(squares).map((square) => {
        return (
          <div
            key={`square-${square.id}`}
            class={`flying-square flying-square--${square.id}`}
            ref={(el) => (square.ref = el)}
            data-initial-x={square.initial?.x}
            data-initial-y={square.initial?.y}
            style={{
              top: `${square.y}px`,
              left: `${square.x}px`,
              transform: `perspective(500px) translateZ(${square.z}px)`,
              opacity: square.opacity,
            }}
          ></div>
        );
      })}
    </>
  );
});

function createInitialState() {
  return Array.from({ length: 6 }, (_, i) => i)
    .map((i) => ({
      id: `${i + 1}`,
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
}

type Point = {
  x: number;
  y: number;
  z: number;
};
function threePointBezier(p1: Point, p2: Point, p3: Point, t: number) {
   
  return {
    x: bezier(p1.x, p2.x, p3.x, t),
    y: bezier(p1.y, p2.y, p3.y, t),
    z: bezier(p1.z, p2.z, p3.z, t)
  };
}
function bezier(p1: number, p2: number, p3: number, t: number) {
  return (((1 - t) ** 2) * p1) + (2 * (1 - t) * t * p2) + ((t ** 2) * p3);
}
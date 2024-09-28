/** @jsxImportSource react */

import { Handle, Position } from "@xyflow/react";

export const Start = () => {
  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        <div className={`workflow__start`}></div>
        <Handle
          position={Position.Right}
          type="source"
          id="rightTarget"
          style={{
            right: "-0.4rem",
          }}
        />
        <div className={`workflow__start__background`}></div>
      </div>
    </>
  );
};

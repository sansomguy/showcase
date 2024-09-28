/** @jsxImportSource react */

import { Handle, Position } from "@xyflow/react";

export const Process = ({
  data,
}: {
  data: { label: string; status: "pending" | "active" | "error" };
}) => {
  const statusStyle = {
    pending: "workflow__process--pending",
    active: "workflow__process--active",
    error: "workflow__process--error",
  };

  const statusBGStyle = {
    pending: "workflow__process__background--pending",
    active: "workflow__process__background--success",
    error: "workflow__process__background--error",
  };

  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        <Handle
          position={Position.Left}
          type="target"
          id="leftSource"
          style={{
            left: "-0.4rem",
            opacity: 0,
          }}
        />
        <div className={`workflow__process ${statusStyle[data.status]}`}>
          {data.label}
        </div>
        <Handle
          position={Position.Right}
          type="source"
          id="rightTarget"
          style={{
            right: "-0.4rem",
            opacity: 0,
          }}
        />
        <div
          className={`workflow__process__background ${statusBGStyle[data.status]}`}
        ></div>
      </div>
    </>
  );
};

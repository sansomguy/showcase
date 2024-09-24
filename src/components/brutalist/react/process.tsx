/** @jsxImportSource react */

import { Handle, Position } from "@xyflow/react";
import styles from "./brutalist.module.css";

export const Process = ({
  data,
}: {
  data: { label: string; status: "pending" | "active" | "error" };
}) => {
  const statusStyle = {
    pending: styles["workflow__process--pending"],
    active: styles["workflow__process--active"],
    error: styles["workflow__process--error"],
  };

  const statusBGStyle = {
    pending: styles["workflow__process__background--pending"],
    active: styles["workflow__process__background--success"],
    error: styles["workflow__process__background--error"],
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
          }}
        />
        <div
          className={`${styles.workflow__process} ${statusStyle[data.status]}`}
        >
          {data.label}
        </div>
        <Handle
          position={Position.Right}
          type="source"
          id="rightTarget"
          style={{
            right: "-0.4rem",
          }}
        />
        <div
          className={`${styles.workflow__process__background} ${statusBGStyle[data.status]}`}
        ></div>
      </div>
    </>
  );
};

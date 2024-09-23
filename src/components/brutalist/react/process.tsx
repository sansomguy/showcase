/** @jsxImportSource react */

import { Handle, Position } from "@xyflow/react";
import styles from "./brutalist.module.css";

export const Process = ({ data }: { data: any }) => {
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
        <div className={styles.workflow__processs}>{data.label}</div>
        <Handle
          position={Position.Right}
          type="source"
          id="rightTarget"
          style={{
            right: "-0.4rem",
          }}
        />
        <div className={styles.workflow__processs__background}></div>
      </div>
    </>
  );
};

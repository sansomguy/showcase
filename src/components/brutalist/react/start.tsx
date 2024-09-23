/** @jsxImportSource react */

import { Handle, Position } from "@xyflow/react";
import styles from "./brutalist.module.css";

export const Start = ({ data }: { data: any }) => {
  return (
    <>
      <div
        style={{
          position: "relative",
        }}
      >
        <div className={styles.workflow__start}></div>
        <Handle
          position={Position.Right}
          type="source"
          id="rightTarget"
          style={{
            right: "-0.4rem",
          }}
        />
        <div className={styles.workflow__start__background}></div>
      </div>
    </>
  );
};

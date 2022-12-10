import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import VisuallyHidden from "../VisuallyHidden";

/**
 * This uses a "native" progress element. There are stylistic limitations
 * to this approach, but it is accessible and ~somewhat~ customizable
 * */
const ProgressBar = ({ size }) => {
  // This code would likely be lifted up into a parent component in a real-world app
  // ------------ //
  const interval = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    interval.current = setInterval(() => {
      setValue((val) => {
        if (val >= 100) {
          clearInterval(interval.current);
          return val;
        }
        return val + 1;
      });
    }, 100);
  }, []);
  // ------------ //

  const styles = {
    small: {
      height: "0.5rem",
      padding: "0",
      progressBarRadius: "4px",
      progressValueRadius: `4px ${value > 96 ? "4px" : "0"} ${
        value > 96 ? "4px" : "0"
      } 4px`,
    },
    medium: {
      height: "0.75rem",
      padding: "0",
      progressBarRadius: "4px",
      progressValueRadius: `4px ${value > 96 ? "4px" : "0"} ${
        value > 96 ? "4px" : "0"
      } 4px`,
    },
    large: {
      height: "1.5rem",
      padding: "4px",
      progressBarRadius: "8px",
      progressValueRadius: `6px ${value > 96 ? "6px" : "0"} ${
        value > 96 ? "6px" : "0"
      } 6px`,
    },
  };

  const style = {
    "--height": styles[size].height,
    "--padding": styles[size].padding,
    "--progress-bar-radius": styles[size].progressBarRadius,
    "--progress-value-radius": styles[size].progressValueRadius,
  };

  return (
    <>
      <VisuallyHidden as="label" for="loading-label">
        Loading: {`${value}%`}
      </VisuallyHidden>
      <Progress id="loading-label" max="100" value={value} style={style} />
    </>
  );
};

const Progress = styled.progress`
  /* Reset the default appearance */
  appearance: none;
  height: var(--height);
  line-height: 0;

  /* Chrome styles */
  ::-webkit-progress-bar {
    background-color: ${COLORS.transparentGray15};
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
    padding: var(--padding);
    border-radius: var(--progress-bar-radius);
  }

  ::-webkit-progress-value {
    background-color: ${COLORS.primary};
    background-size: 35px 20px, 100% 100%, 100% 100%;
    border-radius: var(--progress-value-radius);
  }
  /* End Chrome styles */

  /* TODO: add moz and safari styles */
`;
export default ProgressBar;

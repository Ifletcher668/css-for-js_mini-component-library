import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";

const IconInput = ({ name, label, icon, width = 250, size, placeholder }) => {
  const styles = {
    small: {
      iconStrokeWidth: 1,
      iconSize: 14,
      fontSize: `${14 / 16}rem`,
      border: "1px solid black",
    },
    large: {
      iconStrokeWidth: 2,
      iconSize: 18,
      fontSize: `${18 / 16}rem`,
      border: "2px solid black",
    },
  };

  const [shouldMovePlaceholder, setShouldMovePlaceholder] = useState(false);

  const placeholderStyles = {
    "--position-top": shouldMovePlaceholder ? "-18px" : "0",
    "--position-left": shouldMovePlaceholder
      ? "-4px"
      : "calc(var(--font-size) + 4px)",
    "--placeholder-font-size": shouldMovePlaceholder
      ? "calc(var(--font-size) - 25%)"
      : "var(--font-size)",
  };

  const handlePlaceholderPosition = (e) =>
    setShouldMovePlaceholder(e.target.value ? true : false);

  return (
    <Wrapper
      style={{
        "--width": `${width}px`,
        "--font-size": styles[size].fontSize,
        "--border": styles[size].border,
      }}
    >
      <IconWrapper>
        <Icon
          id={icon}
          size={styles[size].iconSize}
          strokeWidth={styles[size].iconStrokeWidth}
        />
      </IconWrapper>
      <VisuallyHidden as="label" htmlFor={`${name}-text-input`}>
        {label}
      </VisuallyHidden>
      <TextInput
        id={`${name}-text-input`}
        onFocus={() => setShouldMovePlaceholder(true)}
        onBlur={handlePlaceholderPosition}
        onChange={handlePlaceholderPosition}
      />
      <Placeholder style={placeholderStyles}>{placeholder}</Placeholder>
    </Wrapper>
  );
};

const IconWrapper = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: var(--font-size);
  height: var(--font-size);
  pointer-events: none;
`;

const TextInput = styled.input.attrs({ type: "text" })`
  /* Reset */
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  padding: 0;
  /* End reset */

  color: ${COLORS.gray700};
  font-weight: 700;
  padding-left: calc(var(--font-size) + 2px);
  border-bottom: var(--border);
  outline-offset: 2px;
  font-size: inherit;
  width: 100%;
  height: 100%;

  &:hover {
    color: ${COLORS.black};
  }
`;

const Placeholder = styled.span`
  position: absolute;
  top: var(--position-top);
  left: var(--position-left);
  font-size: var(--placeholder-font-size);
  font-weight: 400;
  pointer-events: none;
  color: ${COLORS.gray300};
  transition: all 250ms ease;

  @media (prefers-reduced-motion) {
    transition: revert;
  }

  ${TextInput}:hover + & {
    color: inherit;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: var(--width);
  font-size: var(--font-size);
  line-height: 1.5;
`;

export default IconInput;

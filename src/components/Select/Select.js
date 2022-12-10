import React from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import Icon from "../Icon";
import { getDisplayedValue } from "./Select.helpers";
import VisuallyHidden from "../VisuallyHidden";

const Select = ({ label, value, onChange, children }) => {
  const displayedValue = getDisplayedValue(value, children);
  const iconSize = 24;
  return (
    <Wrapper>
      <VisuallyHidden>{label}</VisuallyHidden> {displayedValue}
      <IconWrapper style={{ "--size": `${iconSize}px` }}>
        <Icon id="chevron-down" strokeWidth={2} size={iconSize} />
      </IconWrapper>
      <HiddenSelect value={value} onChange={onChange}>
        {children}
      </HiddenSelect>
    </Wrapper>
  );
};

const HiddenSelect = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  appearance: none;
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  border: none;
  background-color: ${COLORS.transparentGray15};
  border-radius: 8px;
  padding: 12px 16px;
  padding-right: 52px;
  width: max-content;
  color: ${COLORS.gray500};

  &:hover {
    background-color: ${COLORS.transparentGray35};
    color: ${COLORS.black};
  }

  &:has(${HiddenSelect}:focus) {
    outline: 1px dotted #212121;
    outline: 5px auto -webkit-focus-ring-color;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: calc(var(--size) / 2);
  margin: auto;
  width: var(--size);
  height: var(--size);
`;

export default Select;

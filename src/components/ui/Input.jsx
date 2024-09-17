import styled, { css } from "styled-components";

const radius = {
  "radius-none": css`
    border-radius: none;
  `,

  "radius-sm": css`
    border-radius: var(--border-radius-sm);
  `,
};

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  padding: 0.8rem 1.2rem;
  ${(props) => radius[props.radius]}
`;

Input.defaultProps = {
  radius: "radius-sm",
};

export default Input;

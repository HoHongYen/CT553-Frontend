import styled, { css } from "styled-components";

const sizes = {
  small: css`
    width: 1.1rem;
    height: 1.1rem;
  `,
  medium: css`
    width: 2.2rem;
    height: 2.2rem;
  `,
  large: css`
    width: 2.8rem;
    height: 2.8rem;
  `,
};

const variations = {
  primary: css`
    color: var(--color-brand-600);
  `,
  secondary: css`
    color: var(--color-grey-0);
  `,
  danger: css`
    color: var(--color-red-600);
  `,
  success: css`
    color: var(--color-green-700);
  `,
};

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    ${(props) => sizes[props.size]}

    ${(props) =>
      variations[props.variation]} /* color: var(--color-brand-600); */
  }
`;

ButtonIcon.defaultProps = {
  size: "medium",
  variation: "primary",
};

export default ButtonIcon;

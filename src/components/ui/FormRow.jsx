import styled, { css } from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  /* grid-template-columns: 24rem 1fr 1.2fr; */
  grid-template-columns: 1.2fr 1.5fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const sizes = {
  small: css`
    font-weight: 500;
    font-size: 1.4rem;
  `,
  medium: css`
    font-weight: 700;
    font-size: 1.5rem;
  `,
  large: css`
    font-weight: 700;
    font-size: 1.6rem;
  `,
};

const Label = styled.label`
  ${(props) => sizes[props.size]}
`;

Label.defaultProps = {
  size: "small",
};

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function FormRow({ label, error, children, size, required }) {
  return (
    <StyledFormRow>
      {label && (
        <Label
          size={size}
          className={required ? "required" : ""}
          htmlFor={children.props.id}
        >
          {label}
        </Label>
      )}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;

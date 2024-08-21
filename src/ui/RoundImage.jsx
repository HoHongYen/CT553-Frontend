import styled, { css } from "styled-components";

const StyledRoundImage = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  margin-right: 1rem;
`;

const Image = styled.img`
  display: block;
  ${(props) => sizes[props.size]}
  /* width: 4rem; */
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

RoundImage.defaultProps = {
  size: "small",
};

const sizes = {
  small: css`
    width: 4rem;
  `,
  medium: css`
    width: 8rem;
  `,
  large: css`
    width: 10rem;
  `,
};

function RoundImage({ path, ...props }) {
  return (
    <StyledRoundImage {...props}>
      <Image {...props} src={path || "default-user.jpg"} />
    </StyledRoundImage>
  );
}

export default RoundImage;

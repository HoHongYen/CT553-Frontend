import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmCertain = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmCertain({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmCertain>
      <Heading as="h3">Xác nhận</Heading>
      <p>
        {resourceName}
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Thoát
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Chắc chắn
        </Button>
      </div>
    </StyledConfirmCertain>
  );
}

export default ConfirmCertain;

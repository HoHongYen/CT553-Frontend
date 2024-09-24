import styled from "styled-components";

const OrderTrackingText = styled.div`
  color: var(--color-${(props) => props.type}-${(props) => (props.type === "grey" ? 400 : 700)});
`;

export default OrderTrackingText;

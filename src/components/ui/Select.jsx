import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

{
  /* <StyledSelect value={value} {...props} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect> */
}

function Select({ options, value, onChange, ...props }) {
  return (
    <div className="relative">
      <StyledSelect value={value} {...props} onChange={onChange}>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      {props.label && (
        <label className="text-[1.1rem] z-2 text-[var(--color-grey-400)] pointer-events-none absolute left-3 inset-y-0 h-fit flex items-center select-none transition-all peer-focus:text-sm peer-placeholder-shown:text-lg px-1 peer-focus:px-1 peer-placeholder-shown:px-0 bg-[var(--color-grey-0)] peer-focus:bg-[var(--color-grey-0)] peer-placeholder-shown:bg-transparent m-0 peer-focus:m-0 peer-placeholder-shown:m-auto -translate-y-1/2 peer-focus:-translate-y-1/2 peer-placeholder-shown:translate-y-0">
          {props.label}
        </label>
      )}
    </div>
  );
}

export default Select;

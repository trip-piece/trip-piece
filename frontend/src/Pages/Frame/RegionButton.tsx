import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

interface Props {
  data: string;
  checkedItems: string[];
  checkedItemHandler: Function;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  label {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      font-size: ${(props) => props.theme.fontSizes.h4};
      border-radius: 50px;
      width: 100%;
      padding: 0.5rem 0;
      height: 80%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid ${(props) => props.theme.colors.mainDark};
    }
    .checked {
      background-color: ${(props) => props.theme.colors.mainDark};
      color: ${(props) => props.theme.colors.white};
    }
    .nochecked {
      font-size: ${(props) => props.theme.fontSizes.h4};
      color: ${(props) => props.theme.colors.mainDark};
    }
  }
`;
function RegionButton({ data, checkedItems, checkedItemHandler }: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkedItemHandler(e.target.value, e.target.checked);
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    if (checkedItems.includes(data)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  }, [checkedItems]);

  return (
    <Container>
      <label key={data}>
        <input
          type="checkbox"
          name="region"
          checked={isChecked}
          value={data}
          onChange={(e) => onCheck(e)}
          hidden
        />
        <p className={isChecked ? "checked" : "nochecked"}>{data}</p>
      </label>
    </Container>
  );
}
export default RegionButton;

import styled from "@emotion/styled";
import React, { memo, useEffect, useState } from "react";

interface Props {
  data: string;
  checkedItems: number[];
  checkedItemHandler: Function;
  index: number;
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
    cursor: pointer;
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
function RegionButton({
  data,
  checkedItems,
  checkedItemHandler,
  index,
}: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const onCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    checkedItemHandler(+e.target.value, e.target.checked);
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (checkedItems.includes(index)) {
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
          value={index}
          onChange={(e) => onCheck(e, index)}
          hidden
        />
        <p className={isChecked ? "checked" : "nochecked"}>{data}</p>
      </label>
    </Container>
  );
}
export default memo(RegionButton);

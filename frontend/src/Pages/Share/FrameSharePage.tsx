import React from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";
import { BsFillBookmarkHeartFill } from "react-icons/bs";

const Container = styled.section`
  min-height: 90vh;
  width: 100%;
  border-radius: 30px 30px 0 0;
  padding: 1rem;

  button {
    width: 30%;
    height: 2rem;
    border-radius: 20px;
  }
`;

const FrameGroup = styled.div`
  width: 100%;
  height: 50vh;
  background-color: pink;
  .Frame {
    width: 50%;
    height: 50%;
    background-color: white;
    display: flex;
    flex-direction: column;
  }
  .right {
    text-align: right;
  }
`;

function FrameSharePage() {
  return (
    <>
      <Helmet>
        <title>공유페이지 | 여행조각</title>
      </Helmet>
      <Container>
        <button type="button">지역별 조회</button>
        <FrameGroup>
          <div className="Frame">
            <div className="right">
              <BsFillBookmarkHeartFill className="scrapicon" />
            </div>
            <div>안녕</div>
            <div>후후후</div>
          </div>
        </FrameGroup>
      </Container>
    </>
  );
}
export default FrameSharePage;

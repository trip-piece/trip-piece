import styled from "@emotion/styled";
import { memo, MouseEvent, useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { InfiniteData, QueryObserverResult } from "react-query";
import { Link } from "react-router-dom";
import { REGIONLIST } from "../../utils/constants/constant";
import { changeDateFormatToDot } from "../../utils/functions/util";
import { TripManagementModal } from "./Modal";
import activeTicket from "../../assets/image/activeTicket.png";

interface ITripCardProps {
  tripId: number;
  regionId: number;
  title: string;
  startDate: string;
  endDate: string;
  isEditMode: boolean;
  refetch: () => Promise<
    QueryObserverResult<
      InfiniteData<
        | {
            result: any;
            page: any;
          }
        | undefined
      >,
      unknown
    >
  >;
}

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const LinkContainer = styled(Link)<{ editmode: number }>`
  pointer-events: ${(props) => props.editmode && "none"};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  img {
    width: 100%;
    height: auto;
  }

  .ticket {
    width: 75%;
    height: 78%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 1.3rem;

    .ticketMain {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      text-align: center;
      align-items: center;
      justify-content: center;
      border-radius: 3px;

      .imageBox {
        width: 100%;
        height: 100%;
        background-color: black;
        position: absolute;
        border-radius: 3px;

        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: fill;
          opacity: 0.6;
          border-radius: 3px;
        }
      }

      .textBox {
        width: 90%;
        height: 80%;
        position: absolute;
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-items: center;

        p {
          width: 100%;
          color: ${(props) => props.theme.colors.white};
        }

        hr {
          width: 80%;
          color: ${(props) => props.theme.colors.white};
        }

        .regionName {
          height: 17%;
          font-size: ${(props) => props.theme.fontSizes.h3};
          font-weight: bold;
        }

        .tripTitle {
          display: flex;
          align-items: center;
          height: 40%;
          font-size: ${(props) => props.theme.fontSizes.s1};
          text-align: center;
          width: 100%;
        }

        .date {
          height: fit-content;
          text-align: left;
          font-size: ${(props) => props.theme.fontSizes.s2};
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
    .ticketSub {
      width: 90%;
      height: 20%;
      background-color: transparent;
    }
  }
`;

function Card({
  tripId,
  regionId,
  title,
  startDate,
  endDate,
  isEditMode,
  refetch,
}: ITripCardProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(true);
  };
  const regionImage = `/image/region/${REGIONLIST[regionId]}.png`;

  return (
    <Container>
      {isEditMode && (
        <button
          type="button"
          onClick={handleOpen}
          style={{
            position: "absolute",
            marginLeft: "1.8rem",
            marginTop: "3.7vh",
            textAlign: "center",
            background: "transparent",
            border: "1px solid #f8f8f8",
            color: "#f8f8f8",
            borderRadius: "5px",
            width: "45px",
            height: "25px",
            fontSize: "12pt",
            zIndex: 999,
          }}
        >
          편집
        </button>
      )}
      {isEditMode && open && (
        <TripManagementModal
          setOpen={setOpen}
          open={open}
          tripInformation={{ tripId, regionId, title, startDate, endDate }}
          refetch={refetch}
        />
      )}
      <LinkContainer
        to={`${tripId}/diarys`}
        editmode={isEditMode ? 1 : 0}
        state={{ tripId, regionId, title, startDate, endDate }}
      >
        <img src={activeTicket} alt="기본이미지" />
        <div className="ticket">
          <div className="ticketMain">
            <div className="imageBox">
              <img src={regionImage} alt="기본이미지" />
            </div>
            <div className="textBox">
              <p className="regionName">{REGIONLIST[regionId]}</p>
              <hr />
              <p className="tripTitle">{title}</p>
              <p className="date">
                <span>{startDate} ~ </span>
                <span style={{ textAlign: "right" }}>{endDate}</span>
              </p>
            </div>
          </div>
          <div className="ticketSub" />
        </div>
      </LinkContainer>
    </Container>
  );
}

export default Card;
export const MemoCard = memo(Card);

import styled from "@emotion/styled";
import { memo, MouseEvent, useState } from "react";
import { InfiniteData, QueryObserverResult } from "react-query";
import { Link } from "react-router-dom";
import { REGIONLIST } from "../../utils/constants/constant";
import { changeDateForamtToDot } from "../../utils/functions/util";
import { TripManagementModal } from "./Modal";

interface ITripCardProps {
  tripId: number;
  regionId: number;
  title: string;
  startDate: Date;
  endDate: Date;
  index: number;
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
  background-color: ${(props) => props.theme.colors.gray400};
  height: 200px;
  width: 100%;
  position: relative;
`;

const LinkContainer = styled(Link)<{ editmode: number }>`
  pointer-events: ${(props) => props.editmode && "none"};
  height: 100%;
  display: block;
`;

function Card({
  tripId,
  regionId,
  title,
  startDate,
  endDate,
  index,
  isEditMode,
  refetch,
}: ITripCardProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setOpen(true);
  };

  return (
    <Container>
      <LinkContainer
        to={`${tripId}/diarys`}
        editmode={isEditMode ? 1 : 0}
        state={{ tripId, regionId, title, startDate, endDate }}
      >
        <h3>
          No.{tripId} {title}
        </h3>
        <h4>{REGIONLIST[regionId]}</h4>
        <div>
          {changeDateForamtToDot(startDate)} - {changeDateForamtToDot(endDate)}
        </div>
      </LinkContainer>
      {isEditMode && (
        <button type="button" onClick={handleOpen}>
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
    </Container>
  );
}

export default Card;
export const MemoCard = memo(Card);

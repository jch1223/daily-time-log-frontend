import React, { FocusEventHandler, useContext, useEffect, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import { MdAddCircle } from "react-icons/md";
import { useMutation } from "react-query";
import { v4 as uuid } from "uuid";

import { useAppDispatch, useAppSelector } from "../../app/store";
import getRandomColor from "../../utils/getRandomColor";
import {
  createMilestone,
  deleteMilestone,
  updateMilestoneSummary,
} from "../../utils/api/milestones";

import { addMilestone, removeMilestone, updateMilestone } from "./milestonesSlice";
import Error from "../../components/Error";
import MilestoneEditableBlock from "./MilestoneEditableBlock";

function Milestone() {
  const email = useAppSelector((state) => state.auth.email);
  const allMilestonesId = useAppSelector((state) => state.milestones.allMilestonesId);
  const byMilestonesId = useAppSelector((state) => state.milestones.byMilestonesId);
  const filteredMilestonesId = allMilestonesId.filter((id) => !byMilestonesId[id].isDeleted);
  const [isCreatedMilestone, setIsCreatedMilestone] = useState(false);
  const [isError, setIsError] = useState(false);

  const newColor = getRandomColor();

  const newMilestone = useRef<HTMLDivElement>(null);

  const { palette } = useContext(ThemeContext);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isCreatedMilestone) newMilestone.current.focus();
  }, [isCreatedMilestone]);

  const createMilestoneMutation = useMutation(createMilestone, {
    onSuccess: (result) => {
      dispatch(addMilestone(result.data));
    },
    onError: () => {
      setIsError(true);
    },
  });

  const deleteMilestoneMutation = useMutation(deleteMilestone, {
    onSuccess: (_, id) => {
      dispatch(removeMilestone(id));
    },
    onError: () => {
      setIsError(true);
    },
  });

  const updateMilestoneSummaryMutation = useMutation(updateMilestoneSummary, {
    onSuccess: ({ data }) => {
      dispatch(updateMilestone({ id: data.id, summary: data.summary }));
    },
    onError: () => {
      setIsError(true);
    },
  });

  const createMilestoneHandler = () => {
    setIsCreatedMilestone(true);
  };

  const onBlurUpdateMilestone = (id: string): FocusEventHandler<HTMLDivElement> => {
    return (e) => {
      const { textContent } = e.target;

      if (textContent === "") {
        return deleteMilestoneMutation.mutate(id);
      }

      if (byMilestonesId[id].summary !== textContent) {
        updateMilestoneSummaryMutation.mutate({ id, summary: textContent });
      }
    };
  };

  const onBlurCreateMilestone: FocusEventHandler<HTMLDivElement> = (e) => {
    const { textContent } = e.target;

    if (textContent === "") {
      return setIsCreatedMilestone(false);
    }

    if (email) {
      createMilestoneMutation.mutate({
        id: uuid(),
        userId: email,
        color: newColor,
        summary: textContent,
      });
      setIsCreatedMilestone(false);
    }
  };

  if (isError) {
    return <Error />;
  }

  return (
    <MilestoneWrap>
      <Title>
        <div>목표</div>
        <div>
          <MdAddCircle cursor="pointer" color={palette.blue} onClick={createMilestoneHandler} />
        </div>
      </Title>

      {!filteredMilestonesId.length && <div>등록된 목표가 없습니다</div>}
      <div>
        {filteredMilestonesId.map((id) => {
          return (
            <MilestoneEditableBlock
              key={id}
              playCircleColor={byMilestonesId[id].color}
              // onClickPlayCircle = {() => {}}
              onBlurEditableBlock={onBlurUpdateMilestone(id)}
              summary={byMilestonesId[id].summary}
            />
          );
        })}

        {isCreatedMilestone && (
          <MilestoneEditableBlock
            editableBlockRef={newMilestone}
            playCircleColor={newColor}
            onBlurEditableBlock={onBlurCreateMilestone}
          />
        )}
      </div>
    </MilestoneWrap>
  );
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.4rem;
`;

const MilestoneWrap = styled.div`
  width: 20%;
  padding: 15px;
  box-sizing: border-box;

  [contenteditable="true"]:empty:before {
    content: attr(placeholder);
    color: #c4c4c4;
  }
`;

export default Milestone;

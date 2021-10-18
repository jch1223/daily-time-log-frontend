import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdAddCircle, MdPlayCircleFilled } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { v4 as uuid } from "uuid";

import { useAppDispatch, useAppSelector } from "../../app/store";
import { createMilestone, updateMilestone, deleteMilestone, init } from "./milestonesSlice";

function Milestone() {
  const milestones = useAppSelector((state) => state.milestones);
  const filteredMilestones = milestones.filter((item) => !item.isDeleted);
  const [isFocus, setIsFocus] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(init());
  }, []);

  useEffect(() => {
    if (isFocus) ref.current?.focus();
  }, [isFocus]);

  const createMilestoneHandler = () => {
    dispatch(createMilestone());
    setIsFocus(true);
  };

  return (
    <MilestoneWrap className="width-50 border-right">
      <Title>
        <div>목표</div>
        <div className="add-circle">
          <MdAddCircle cursor="pointer" color="#1a73e8" onClick={createMilestoneHandler} />
        </div>
      </Title>

      <div>
        {filteredMilestones.map((item, index) => {
          return (
            <MilestoneContent key={item.id}>
              <MdPlayCircleFilled
                cursor="pointer"
                color="#1a73e8"
                size="35px"
                onClick={() => {
                  // createMilestoneMutation.mutate({
                  //   userId,
                  //   done: false,
                  //   summary: "title",
                  //   googleAccessToken,
                  // });
                  console.log("adf");
                }}
              />
              <EditableBlock
                ref={ref}
                key={item.id}
                placeholder="목표를 입력해주세요"
                contentEditable="true"
                suppressContentEditableWarning
                onBlur={(e) => {
                  const { textContent } = e.target;

                  if (textContent === "") {
                    dispatch(deleteMilestone(item.id));
                  }

                  dispatch(updateMilestone({ id: item.id, summary: textContent }));
                  setIsFocus(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.currentTarget.blur();
                  }
                }}
              >
                {item.summary}
              </EditableBlock>
            </MilestoneContent>
          );
        })}
      </div>

      {/* 
      {milestones.map((milestone: any) => {
        return (
          <div>
            <MdPlayCircleFilled />
            {milestone.summary}
            <button
              type="button"
              onClick={() => {
                // setIsShowModal(true);
                // createMilestoneMutation.mutate({
                //   userId,
                //   done: false,
                //   summary: "title",
                //   googleAccessToken,
                // });
              }}
            >
              수정
            </button>
            <button
              type="button"
              // onClick={() => {
              //   createMilestoneMutation.mutate({
              //     userId,
              //     done: false,
              //     summary: "title",
              //     googleAccessToken,
              //   });
              // }}
            >
              삭제
            </button>
          </div>
        );
      })} */}
    </MilestoneWrap>
  );
}

const EditableBlock = styled.div`
  width: 100%;
  padding: 10px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
`;

const MilestoneContent = styled.div`
  display: flex;
  align-items: center;

  svg {
    padding: 0 5px;
  }
`;

const MilestoneWrap = styled.div`
  width: 50%;
  padding: 20px;
  border-right: 1px solid #e4e4e4;

  [contenteditable="true"]:empty:before {
    content: attr(placeholder);
    color: #c4c4c4;
  }
`;

export default Milestone;

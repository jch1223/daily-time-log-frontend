import React, { useContext, useEffect, useRef, useState } from "react";
import styled, { ThemeContext } from "styled-components";
import dayjs from "dayjs";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../app/store";

import { loadCalendar } from "../features/calendar/calendarSlice";

import GoogleAuth from "../features/auth/GoogleAuth";
import Button from "../components/Button";
import { boxShadow } from "../assets/styles/utilsStyled";

function Header() {
  const displayedInfo = useAppSelector((state) => state.calendar.displayed);
  const name = useAppSelector((state) => state.auth.name);
  const imageUrl = useAppSelector((state) => state.auth.imageUrl);
  const schedulesData = useAppSelector((state) => state.schedules.schedulesData);

  const [showDetailProfile, setShowDetailProfile] = useState(false);

  const profile = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profile.current && !profile.current.contains(e.target as Node)) {
        setShowDetailProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onNextButtonClick = () => {
    dispatch(
      loadCalendar({
        dateInfo: { ...displayedInfo, month: displayedInfo.month + 1 },
        schedules: schedulesData,
      }),
    );
  };

  const onPrevButtonClick = () => {
    dispatch(
      loadCalendar({
        dateInfo: { ...displayedInfo, month: displayedInfo.month - 1 },
        schedules: schedulesData,
      }),
    );
  };

  return (
    <HeaderWrap>
      <div className="left">
        <HeaderTitle>DAILY TIME LOG</HeaderTitle>
      </div>

      <div className="middle">
        <Button size="medium" background={false} onClick={onPrevButtonClick}>
          <MdNavigateBefore color={theme.palette.black} size="2rem" />
        </Button>

        <div>{dayjs().set(displayedInfo).format("YYYY년 MM월 DD일")}</div>

        <Button size="medium" background={false} onClick={onNextButtonClick}>
          <MdNavigateNext color={theme.palette.black} size="2rem" />
        </Button>
      </div>

      <div className="right">
        <ProfileWrap
          ref={profile}
          onClick={() => {
            setShowDetailProfile(true);
          }}
        >
          <img src={imageUrl} alt="profile" />
          <ProfileInfo hidden={!showDetailProfile}>
            <div>{name}</div>
            <GoogleAuth />
          </ProfileInfo>
        </ProfileWrap>
      </div>
    </HeaderWrap>
  );
}

const ProfileInfo = styled.div`
  position: absolute;
  padding: 1rem;
  width: 200px;
  height: ${({ hidden }) => (hidden ? 0 : "300px")};
  right: 10px;
  background-color: ${({ theme }) => theme.color.backgroundColor};
  overflow: hidden;
  border-radius: 5px;
  z-index: 1;

  ${boxShadow}
`;

const ProfileWrap = styled.div`
  position: relative;

  img {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const HeaderTitle = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.color.title};
`;

const HeaderWrap = styled.header`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  min-height: ${({ theme }) => theme.size.headerHeight};
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  .left {
    flex: 1 0 auto;
    padding-left: 30px;
    padding-right: 30px;
  }
  .middle {
    display: flex;
    flex: 1 1 100%;
    font-size: 24px;
    align-items: center;
  }
  .right {
    flex: 0 0 auto;
  }
`;

export default Header;

import React, { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { fadeIn, fadeOut, slideDown, slideUp } from "../assets/styles/utilsStyled";

import Portal from "./Portal";

interface Props {
  rootId: string;
  isShowModal: boolean;
  onBackgroundClick: MouseEventHandler<HTMLDivElement>;
  children: ReactNode;
}

export default function Modal({ rootId, isShowModal, onBackgroundClick, children }: Props) {
  const [animate, setAnimate] = useState(false);
  const [localVisible, setLocalVisible] = useState(isShowModal);

  useEffect(() => {
    if (localVisible && !isShowModal) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 250);
    }
    setLocalVisible(isShowModal);
  }, [localVisible, isShowModal]);

  if (!localVisible && !animate) return null;

  return (
    <Portal id={rootId}>
      <Background disappear={!isShowModal} onClick={onBackgroundClick} />
      <ModalContent disappear={!isShowModal}>{children}</ModalContent>
    </Portal>
  );
}

const Background = styled.div<{ disappear: boolean }>`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;

  ${({ disappear }) =>
    disappear &&
    css`
      animation-name: ${fadeOut};
    `}
`;

const ModalContent = styled.div<{ disappear: boolean }>`
  background-color: #222222;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  max-width: 50%;
  height: 40%;
  margin: 20vh auto;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 20px 50px;
  border-radius: 0.6rem;
  box-shadow: 0px 5px 2px 0px rgb(0 0 0 / 20%), 2px 4px 4px 3px rgb(0 0 0 / 14%),
    2px 3px 7px 2px rgb(0 0 0 / 12%);

  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp}, ${fadeIn};
  animation-fill-mode: forwards;

  ${({ disappear }) =>
    disappear &&
    css`
      animation-name: ${slideDown}, ${fadeOut};
    `}
`;

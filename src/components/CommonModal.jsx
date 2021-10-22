import React from "react";
import styled from "styled-components";

import Portal from "./Portal";

export default function CommonModal({ id, style = {}, isShowModal, onBackgroundClick, children }) {
  return (
    isShowModal && (
      <Portal id={id} style={style}>
        <Background className="modal-background" onClick={onBackgroundClick} />
        <ModalContent>{children}</ModalContent>
      </Portal>
    )
  );
}

const Background = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
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
`;

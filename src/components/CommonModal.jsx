import React from "react";
import styled from "styled-components";

import Portal from "./Portal";

export default function CommonModal({ id, style = {}, isShowModal, onBackgroundClick, children }) {
  return (
    isShowModal && (
      <Portal id={id} style={style}>
        <>
          <Background className="modal-background" onClick={onBackgroundClick} />

          <ModalContent>{children}</ModalContent>
        </>
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
  display: flex;
  flex-direction: column;
  position: fixed;
  max-width: 500px;
  margin: 10% auto;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 20px 50px;
  border-radius: 0.3rem;
  background-color: #fff;
`;

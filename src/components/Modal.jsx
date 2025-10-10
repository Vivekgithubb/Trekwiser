import styled from "styled-components";
import { TfiClose } from "react-icons/tfi";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
// import { use } from "react";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all ease-in-out 0.2s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.5rem;
  right: 5rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 1.4rem;
    height: 1.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const modalContext = createContext();

function Modal({ children }) {
  const [openName, setopenName] = useState("");
  const close = () => setopenName("");
  // const open = setopenName;

  return (
    <modalContext.Provider value={{ open, close, openName, setopenName }}>
      {children}
    </modalContext.Provider>
  );
}

function Open({ children, open: opensWindowName }) {
  const { setopenName } = useContext(modalContext);
  return cloneElement(children, {
    onClick: () => setopenName(opensWindowName),
  });
}

function Window({ children, name, type }) {
  const { openName, close } = useContext(modalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal
        ref={ref}
        style={{
          width: "100vw",
          height: "100vh",
          marginTop: "50px",
          padding: "15px",
        }}
      >
        {type === "map" ? (
          <Button
            onClick={close}
            style={{
              position: "absolute",
              top: "-28px",
              right: "40px",
            }}
          >
            <TfiClose color="black" size={10} />
          </Button>
        ) : (
          <Button onClick={close} style={{ top: "0px", right: "25px" }}>
            <TfiClose color="green" size={10} />
          </Button>
        )}
        <div style={{ width: "100%", height: "100%" }}>
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
Modal.Open = Open;
Modal.Window = Window;

export default Modal;

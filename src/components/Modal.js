import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import Backdrop from "./Backdrop";
import React from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/uiSlice";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 200,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = () => {
  const {
    modalInfo: { open: modalIsOpen, message },
    error,
  } = useSelector((state) => state.UI);

  let hasError = error && modalIsOpen;
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(uiActions.setModal({ state: false, message: "" }));
  };

  return ReactDOM.createPortal(
    <AnimatePresence initial={false} exitBeforeEnter={true}>
      {modalIsOpen && (
        <Backdrop onClick={handleClose}>
          <ModalContent
            onClick={(e) => e.stopPropagation()}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            haserror={hasError}
          >
            {hasError ? (
              <h1 className="modal-heading">Oops...There was an error</h1>
            ) : (
              <h1 className="modal-heading">We have a message for you</h1>
            )}
            <p className="modal-text">{message}</p>
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="close-btn"
            >
              Close
            </motion.button>
          </ModalContent>
        </Backdrop>
      )}
    </AnimatePresence>,
    document.getElementById("modal")
  );
};

const ModalContent = styled(motion.div)`
  width: clamp(40%, 650px, 80%);
  height: min(min-content, 350px);
  margin: auto;
  padding: 2rem 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${({ haserror }) =>
    haserror
      ? `linear-gradient(
    90deg,
    rgba(200, 10, 0, 1) 0%,
    rgba(154, 5, 5, 1) 100%
  );`
      : "linear-gradient(90deg, rgba(67,143,29,1) 0%, rgba(9,101,31,1) 100%);"};
  .modal-text {
    color: white;
    font-size: clamp(1.1rem, 2vw, 2rem);
    margin-bottom: 1rem;
  }
  .modal-heading {
    font-size: clamp(2rem, 2.5vw, 5rem);
  }
  .close-btn {
    color: white;
    font-size: clamp(1rem, 1vw, 2rem);

    background: white;
    color: ${({ haserror }) =>
      haserror ? " rgba(208, 26, 5, 1)" : "rgba(67, 143, 29, 1)"};

    border-radius: 10px;

    border: none;
    outline: none;
    padding: 0.75rem 1.5rem;
  }
`;
// For Success

export default Modal;

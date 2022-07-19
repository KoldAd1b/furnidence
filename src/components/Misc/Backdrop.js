import { motion } from "framer-motion";
import styled from "styled-components";
import React from "react";

const Backdrop = ({ children, onClick }) => {
  return (
    <BackdropContent
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </BackdropContent>
  );
};

const BackdropContent = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-items: center;
  align-items: center;
`;
export default Backdrop;

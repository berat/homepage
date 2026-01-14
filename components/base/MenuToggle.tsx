import * as React from "react";
import { motion } from "motion/react";

export interface Props {
  isOpen: boolean;
}

const MenuToggle: React.FC<Props> = ({ isOpen }) => {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <motion.path
        d="M5 8H19"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        animate={isOpen ? { d: "M6 6L18 18" } : { d: "M5 8H19" }}
        transition={{ duration: 0.2 }}
      />
      <motion.path
        d="M5 16H19"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        animate={isOpen ? { d: "M6 18L18 6" } : { d: "M5 16H19" }}
        transition={{ duration: 0.2 }}
      />
    </svg>
  );
};

export default MenuToggle;

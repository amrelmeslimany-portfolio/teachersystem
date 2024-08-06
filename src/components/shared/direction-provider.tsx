"use client";

import React from "react";
import { DirectionProvider } from "@radix-ui/react-direction";

const CustomDirection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <DirectionProvider dir="rtl">{children}</DirectionProvider>;
};

export default CustomDirection;

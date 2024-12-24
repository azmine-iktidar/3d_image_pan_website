/* eslint-disable @typescript-eslint/no-empty-function */
"use client";

import React, { createContext, useContext, useState } from "react";

type InteractionContextType = {
  isInteracting: boolean;
  setIsInteracting: (value: boolean) => void;
};

const InteractionContext = createContext<InteractionContextType>({
  isInteracting: false,
  setIsInteracting: () => {},
});

export const InteractionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isInteracting, setIsInteracting] = useState(false);

  return (
    <InteractionContext.Provider value={{ isInteracting, setIsInteracting }}>
      {children}
    </InteractionContext.Provider>
  );
};

export const useInteraction = () => useContext(InteractionContext);

"use client";

import { createContext, useContext, useState } from "react";

type ResumeContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const ResumeContext = createContext<ResumeContextType>({
  open: false,
  setOpen: () => {},
});

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ResumeContext.Provider value={{ open, setOpen }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  return useContext(ResumeContext);
}

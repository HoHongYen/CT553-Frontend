import { createContext, useContext, useEffect, useState } from "react";

const ShowCartDrawerContext = createContext();

function ShowCartDrawerProvider({ children }) {
  const [open, setOpen] = useState(false);

  function closeCartDrawer() {
    setOpen(false);
  }

  function openCartDrawer() {
    setOpen(true);
  }

  return (
    <ShowCartDrawerContext.Provider
      value={{ open, closeCartDrawer, openCartDrawer }}
    >
      {children}
    </ShowCartDrawerContext.Provider>
  );
}

function useShowCartDrawer() {
  const context = useContext(ShowCartDrawerContext);
  if (context === undefined) {
    throw new Error(
      "useShowCartDrawer must be used within a ShowCartDrawerProvider"
    );
  }
  return context;
}

export { ShowCartDrawerProvider, useShowCartDrawer };

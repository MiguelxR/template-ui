import type { JSX } from "@emotion/react/jsx-runtime";
import { Route, Routes } from "react-router";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const RoutesWithNotFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default RoutesWithNotFound;

import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";

interface Props {
  children: React.ReactNode;
}
const ReactReduxProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
export default ReactReduxProvider;

import { fireEvent } from "@testing-library/react";
import { getProvider } from "../provider";

export function fireCloseWithESC() {
  fireEvent.keyDown(window, { key: "Esc", keyCode: 27 });
}

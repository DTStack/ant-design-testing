import { fireEvent } from "@testing-library/react";

export function fireCloseWithESC() {
  fireEvent.keyDown(window, { key: "Esc", keyCode: 27 });
}

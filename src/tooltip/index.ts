import { act, fireEvent } from "@testing-library/react";

export async function fireOpen(ele?: HTMLElement) {
  if (!ele) return;
  await act(async () => {
    fireEvent.mouseEnter(ele);
    await jest.runAllTimersAsync();
  });
}

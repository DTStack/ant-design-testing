import { message } from "antd";
import { act, waitFor } from "@testing-library/react";
import { fireClick } from "..";

describe("Test Message's fire functions", () => {
  test("test fireClick", async () => {
    const onClick = jest.fn();
    act(() => {
       message.info({
         onClick,
         duration: 0,
         content: "message info",
       });
    })
   
    await waitFor(() => {
       fireClick(document.body);
       expect(onClick).toHaveBeenCalled()
    })
  });
});

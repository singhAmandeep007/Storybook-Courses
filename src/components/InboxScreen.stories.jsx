import InboxScreen from "./InboxScreen";
import store from "../lib/store";

import { rest } from "msw";
// reusing stories
import { MockedState } from "./TaskList.stories";

import { Provider } from "react-redux";

import {
  fireEvent,
  within,
  waitFor,
  waitForElementToBeRemoved
} from "@storybook/testing-library";

export default {
  component: InboxScreen,
  title: "InboxScreen",
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  tags: ["autodocs"]
};

/**
 * by doing `export const Error = {}`
 * We can quickly spot an issue with the error story.
 * Instead of displaying the right state, it shows a list of tasks.
 * One way to sidestep this issue would be to provide a mocked version for each state, similar to what we did in the last chapter.
 * Instead, we'll use a well-known API mocking library msw alongside a Storybook addon to help us solve this issue.
 */

export const Default = {
  parameters: {
    msw: {
      handlers: [
        rest.get("*/todos?userId=1", (req, res, ctx) => {
          return res(ctx.json(MockedState.tasks));
        })
      ]
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Waits for the component to transition from the loading state
    await waitForElementToBeRemoved(await canvas.findByTestId("loading"));
    // Waits for the component to be updated based on the store
    await waitFor(async () => {
      // Simulates pinning the first task
      await fireEvent.click(canvas.getByLabelText("pinTask-1"));
      // Simulates pinning the third task
      await fireEvent.click(canvas.getByLabelText("pinTask-3"));
    });
  }
};

/**
 * error story is now working as intended.
 * MSW intercepted our remote API call and provided the appropriate response.
 */
export const Error = {
  parameters: {
    msw: {
      handlers: [
        rest.get("*/todos?userId=1", (req, res, ctx) => {
          return res(ctx.status(403));
        })
      ]
    }
  }
};

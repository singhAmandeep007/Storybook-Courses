import TaskList from "./TaskList";

// NOTE: By importing TaskStories, we are able to compose the arguments (args for short) in our stories with minimal effort.
import * as TaskStories from "./Task.stories";

import { Provider } from "react-redux";

import { configureStore, createSlice } from "@reduxjs/toolkit";

// A super-simple mock of the state of the store
export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: "1", title: "Task 1" },
    { ...TaskStories.Default.args.task, id: "2", title: "Task 2" },
    { ...TaskStories.Default.args.task, id: "3", title: "Task 3" },
    { ...TaskStories.Default.args.task, id: "4", title: "Task 4" },
    { ...TaskStories.Default.args.task, id: "5", title: "Task 5" },
    { ...TaskStories.Default.args.task, id: "6", title: "Task 6" }
  ],
  status: "idle",
  error: null
};

// A super-simple mock of a redux store
const Mockstore = ({ taskboxState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: "taskbox",
          initialState: taskboxState,
          reducers: {
            updateTaskState: (state, action) => {
              const { id, newTaskState } = action.payload;
              const taskId = state.tasks.findIndex((task) => task.id === id);
              if (taskId >= 0) {
                state.tasks[taskId].state = newTaskState;
              }
            }
          }
        }).reducer
      }
    })}
  >
    {children}
  </Provider>
);

export default {
  component: TaskList,
  title: "TaskList",
  // using a decorator key on the default export to add some padding around the rendered component.
  decorators: [(story) => <div style={{ padding: "3rem" }}>{story()}</div>],
  tags: ["autodocs"],
  // NOTE: it is a Storybook configuration field that prevents our mocked state to be treated as a story.
  // READ-MORE: https://storybook.js.org/docs/react/api/csf#non-story-exports
  // basically lets us export mixture of stories and non stories
  excludeStories: /.*MockedState$/ // 👈 Storybook ignores anything that contains MockedState
};

export const Default = {
  decorators: [
    (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>
  ]
};

export const WithPinnedTasks = {
  decorators: [
    (story) => {
      const pinnedtasks = [
        ...MockedState.tasks.slice(0, 5),
        { id: "6", title: "Task 6 (pinned)", state: "TASK_PINNED" }
      ];

      return (
        <Mockstore
          taskboxState={{
            ...MockedState,
            tasks: pinnedtasks
          }}
        >
          {story()}
        </Mockstore>
      );
    }
  ]
};

export const Loading = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...MockedState,
          status: "loading"
        }}
      >
        {story()}
      </Mockstore>
    )
  ]
};

export const Empty = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...MockedState,
          tasks: []
        }}
      >
        {story()}
      </Mockstore>
    )
  ]
};

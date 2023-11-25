
import Task from './Task';
/**
 * Task having three test states
 */
export default {
  component: Task,
  title: 'Task',
  tags: ['autodocs'],
};
/**
 * (CSF3)[https://storybook.js.org/docs/react/api/csf]
 * This format is designed to build out each of our test cases in a concise way. 
 * By exporting an object containing each component state, we can define our tests more intuitively 
 * and author and reuse stories more efficiently.
 */
export const Default = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    },
  },
};

export const Pinned = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_PINNED',
    },
  },
};

export const Archived = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_ARCHIVED',
    },
  },
};
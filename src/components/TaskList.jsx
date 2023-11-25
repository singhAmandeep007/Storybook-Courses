import React from "react";

import { useDispatch, useSelector } from 'react-redux';
import { updateTaskState } from '../lib/store';

import Task from "./Task";

/**
 * You might be thinking that the .list-items wrapper is overly simplistic in TaskList component.
 *  You're right – in most cases, we wouldn’t create a new component just to add a wrapper.
 * But the real complexity of the TaskList component is revealed in the edge cases withPinnedTasks, loading, and empty as presented in TaskList.stories.jsx
 */
export default function TaskList() {
  // extract tasks from redux store
  const tasks = useSelector((state) => {
    // reorder tasks [pinned, others]
    const tasksInOrder = [
      ...state.taskbox.tasks.filter((t) => t.state === 'TASK_PINNED'),
      ...state.taskbox.tasks.filter((t) => t.state !== 'TASK_PINNED'),
    ];
    // filter out archived
    const filteredTasks = tasksInOrder.filter(
      (t) => t.state === 'TASK_INBOX' || t.state === 'TASK_PINNED'
    );
    return filteredTasks;
  });

  // extract current status of fetching tasks
  const { status } = useSelector((state) => state.taskbox);

  const dispatch = useDispatch();

  // action wrapper
  const pinTask = (value) => {
    // We're dispatching the Pinned event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_PINNED' }));
  };
  // action wrapper
  const archiveTask = (value) => {
    // We're dispatching the Archive event back to our store
    dispatch(updateTaskState({ id: value, newTaskState: 'TASK_ARCHIVED' }));
  };

  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  // fetching tasks status
  if (status === 'loading') {
    return (
      <div className="list-items" data-testid="loading" key={"loading"}>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="list-items" key={"empty"} data-testid="empty">
        <div className="wrapper-message">
          <span className="icon-check" />
          <p className="title-message">You have no tasks</p>
          <p className="subtitle-message">Sit back and relax</p>
        </div>
      </div>
    );
  }

  // at this point status will be success
  return (
    <div className="list-items" data-testid="success" key={"success"}>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onPinTask={(task) => pinTask(task)}
        onArchiveTask={(task) => archiveTask(task)} />
      ))}
    </div>
  );
};

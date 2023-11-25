import React from "react";

/**
 * Task can have different states
 * TASK_INBOX,
 * TASK_PINNED,
 * TASK_ARCHIVED
 */
export default function Task({
  task: { id, title, state },
  onArchiveTask,
  onPinTask,
}) {
  return (
    <div className="list-item">
      <label htmlFor="title" aria-label={title}>
        <input type="text" value={title} readOnly={true} name="title" />
      </label>
    </div>
  );
}

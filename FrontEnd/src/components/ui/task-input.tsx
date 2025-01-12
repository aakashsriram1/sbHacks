import { Input } from "@/components/ui/input"

interface TaskInputProps {
  task: string
  onChangeTask: (task: string) => void
}

export function TaskInput({ task, onChangeTask }: TaskInputProps) {
  return (
    <div>
      <label htmlFor="task-input" className="block text-sm font-medium text-gray-700 mb-1">
        Choose a task
      </label>
      <Input
        id="task-input"
        type="text"
        value={task}
        onChange={(e) => onChangeTask(e.target.value)}
        placeholder="Enter your task"
      />
    </div>
  )
}


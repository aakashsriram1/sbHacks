import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div>
      <Progress value={progress} className="w-full h-4" />
      <p className="text-sm text-gray-600 mt-2">{progress}% complete</p>
    </div>
  )
}


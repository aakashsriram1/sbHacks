import { Input } from "@/components/ui/input"

interface StreakLengthInputProps {
  streakLength: string
  onChangeStreakLength: (streakLength: string) => void
}

export function StreakLengthInput({ streakLength, onChangeStreakLength }: StreakLengthInputProps) {
  return (
    <div>
      <label htmlFor="streak-length-input" className="block text-sm font-medium text-gray-700 mb-1">
        Streak Length (days)
      </label>
      <Input
        id="streak-length-input"
        type="number"
        min="1"
        value={streakLength}
        onChange={(e) => onChangeStreakLength(e.target.value)}
        placeholder="Enter streak length"
      />
    </div>
  )
}


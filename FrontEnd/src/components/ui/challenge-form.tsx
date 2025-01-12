import { useState } from "react"
import { TaskInput } from "./task-input"
import { StreakLengthInput } from "./streak-length-input"
import { MoneyInput } from "./money-input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { X } from "lucide-react"

interface ChallengeFormProps {
  onClose: () => void
}

export function ChallengeForm({ onClose }: ChallengeFormProps) {
  const [task, setTask] = useState<string>("''")
  const [streakLength, setStreakLength] = useState<string>("''")
  const [moneyAmount, setMoneyAmount] = useState<number>(0)

  const handleSubmit = () => {
    console.log("'Submitted:'", { task, streakLength, moneyAmount })
    // Here you would typically send this data to your backend
    onClose()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Set Your Challenge
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
        <CardDescription>Choose a task, streak length, and stake amount</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TaskInput task={task} onChangeTask={setTask} />
        <StreakLengthInput streakLength={streakLength} onChangeStreakLength={setStreakLength} />
        <MoneyInput amount={moneyAmount} onChangeAmount={setMoneyAmount} />
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={!task || !streakLength || moneyAmount <= 0}>
          Start Challenge
        </Button>
      </CardFooter>
    </Card>
  )
}


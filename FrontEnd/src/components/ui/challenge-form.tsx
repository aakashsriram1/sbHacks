import { useState } from "react";
import { TaskInput } from "./task-input";
import { StreakLengthInput } from "./streak-length-input";
import { MoneyInput } from "./money-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { X } from "lucide-react";

interface ChallengeFormProps {
  onSubmit: (formData: {
    task: string;
    streakLength: string;
    moneyAmount: number;
  }) => void;
  onClose: () => void;
}

export function ChallengeForm({ onSubmit, onClose }: ChallengeFormProps) {
  const [task, setTask] = useState<string>("");
  const [streakLength, setStreakLength] = useState<string>("");
  const [moneyAmount, setMoneyAmount] = useState<number>(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleSubmit = () => {
    // Validate Inputs
    if (!task.trim()) {
      alert("Please enter a valid task.");
      return;
    }

    if (parseInt(streakLength, 10) <= 0) {
      alert("Streak length must be greater than 0.");
      return;
    }

    if (moneyAmount < 0) {
      alert("Money amount cannot be negative.");
      return;
    }

    if (moneyAmount > 0) {
      // Show confirmation modal if moneyAmount > 0
      setShowConfirmationModal(true);
      return;
    }

    // Call onSubmit directly if no money is involved
    onSubmit({
      task,
      streakLength,
      moneyAmount,
    });
  };

  const handleConfirm = () => {
    // Close the confirmation modal
    setShowConfirmationModal(false);

    // Call onSubmit after confirmation
    onSubmit({
      task,
      streakLength,
      moneyAmount,
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Set Your Challenge
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription>
            Choose a task, streak length, and stake amount
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TaskInput task={task} onChangeTask={setTask} />
          <StreakLengthInput
            streakLength={streakLength}
            onChangeStreakLength={setStreakLength}
          />
          <MoneyInput amount={moneyAmount} onChangeAmount={setMoneyAmount} />
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={!task.trim() || !streakLength.trim() || moneyAmount < 0}
          >
            Start Challenge
          </Button>
        </CardFooter>
      </Card>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
            <h2 className="text-lg font-bold mb-4">Confirm Your Challenge</h2>
            <p className="mb-4">
              You are about to commit ${moneyAmount.toFixed(2)} to this
              challenge. Do you agree to proceed?
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowConfirmationModal(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleConfirm}>Confirm</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

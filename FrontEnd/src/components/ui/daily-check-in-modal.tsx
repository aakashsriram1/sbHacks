// File: daily-check-in-modal.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { X } from "lucide-react";

interface DailyCheckInModalProps {
  visible: boolean;
  streakName: string; 
  onClose: () => void;
  onSubmit: (answers: any) => void;
}

export function DailyCheckInModal({
  visible,
  streakName,
  onClose,
  onSubmit,
}: DailyCheckInModalProps) {
  // For "LeetCode"
  const [leetcodeProblemName, setLeetcodeProblemName] = useState("");
  const [leetcodeAlgorithm, setLeetcodeAlgorithm] = useState("");
  const [leetcodeComplexity, setLeetcodeComplexity] = useState("");

  // For "Go to Gym"
  const [gymWorkout, setGymWorkout] = useState("");
  const [gymDuration, setGymDuration] = useState("");

  // If modal not visible, return nothing
  if (!visible) return null;

  // Decide which questions to show
  const isLeetCode = streakName.toLowerCase() === "leetcode";
  const isGym = streakName.toLowerCase() === "go to gym";

  const handleSubmit = () => {
    // Gather the answers depending on the task
    if (isLeetCode) {
      onSubmit({
        problemName: leetcodeProblemName,
        algorithmDescription: leetcodeAlgorithm,
        complexity: leetcodeComplexity,
      });
    } else if (isGym) {
      onSubmit({
        workout: gymWorkout,
        duration: gymDuration,
      });
    } else {
      // If there's another task, or you want a fallback
      onSubmit({});
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="relative w-full max-w-md">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Daily Check–In</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-4">
          {isLeetCode && (
            <>
              <label className="block">
                <span className="text-sm font-medium">
                  1) Name of the problem
                </span>
                <input
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                  value={leetcodeProblemName}
                  onChange={(e) => setLeetcodeProblemName(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">
                  2) Describe your algorithm
                </span>
                <textarea
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                  rows={3}
                  value={leetcodeAlgorithm}
                  onChange={(e) => setLeetcodeAlgorithm(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">
                  3) What is the time & space complexity?
                </span>
                <textarea
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                  rows={2}
                  value={leetcodeComplexity}
                  onChange={(e) => setLeetcodeComplexity(e.target.value)}
                />
              </label>
            </>
          )}

          {isGym && (
            <>
              <label className="block">
                <span className="text-sm font-medium">
                  1) What workout did you do?
                </span>
                <input
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                  value={gymWorkout}
                  onChange={(e) => setGymWorkout(e.target.value)}
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium">
                  2) How long were you there?
                </span>
                <input
                  className="block w-full mt-1 p-2 border border-gray-300 rounded"
                  value={gymDuration}
                  onChange={(e) => setGymDuration(e.target.value)}
                />
              </label>
            </>
          )}
        </CardContent>

        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

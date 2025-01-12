"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress";
import { ChallengeForm } from "@/components/ui/challenge-form";
import { ProfileDisplay } from "@/components/ui/profile-display";
import { SessionProvider } from "next-auth/react";

// Import the DailyCheckInModal
import { DailyCheckInModal } from "@/components/ui/daily-check-in-modal";

interface Streak {
  id: number;
  name: string;         // e.g. "LeetCode" or "Go to Gym"
  totalDays: number;    
  completedDays: number;
  moneyAmount: number;  
}

const DashboardPage = ({ session }) => {
  return (
    <SessionProvider session={session}>
      <Dashboard />
    </SessionProvider>
  );
};

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [showChallengeForm, setShowChallengeForm] = useState(false);

  // For money-stake confirmation
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [pendingChallenge, setPendingChallenge] = useState<Streak | null>(null);

  // For daily check-in
  const [checkInStreak, setCheckInStreak] = useState<Streak | null>(null);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Please log in to access your dashboard.</p>;
  }

  // 1. Called when the user fills out the ChallengeForm
  const handleChallengeSubmit = (formData: {
    task: string;
    streakLength: string;
    moneyAmount: number;
  }) => {
    const task = formData.task.trim();
    const totalDays = parseInt(formData.streakLength, 10);

    if (task && !isNaN(totalDays) && totalDays > 0) {
      const newChallenge: Streak = {
        id: streaks.length + 1,
        name: task,
        totalDays,
        completedDays: 0,
        moneyAmount: formData.moneyAmount,
      };

      // If there's a stake, show confirmation
      if (formData.moneyAmount > 0) {
        setPendingChallenge(newChallenge);
        setShowConfirmationModal(true);
      } else {
        // Otherwise, immediately add streak
        setStreaks((prev) => [...prev, newChallenge]);
        setShowChallengeForm(false);
      }
    }
  };

  // 2. Confirmation modal handlers
  const confirmChallenge = () => {
    if (pendingChallenge) {
      setStreaks((prev) => [...prev, pendingChallenge]);
      setPendingChallenge(null);
    }
    setShowConfirmationModal(false);
    setShowChallengeForm(false);
  };

  const cancelChallenge = () => {
    setPendingChallenge(null);
    setShowConfirmationModal(false);
  };

  // 3. Daily Check-In: open the modal
  const openDailyCheckIn = (streak: Streak) => {
    setCheckInStreak(streak);
    setShowCheckInModal(true);
  };

  // 4. Daily Check-In: close the modal
  const closeDailyCheckIn = () => {
    setCheckInStreak(null);
    setShowCheckInModal(false);
  };

  // 5. Daily Check-In: user submitted answers
  const handleCheckInSubmit = (answers: any) => {
    console.log("Daily check-in answers:", answers);

    // Increment the completedDays for that streak
    if (checkInStreak) {
      setStreaks((prev) =>
        prev.map((s) =>
          s.id === checkInStreak.id
            ? { ...s, completedDays: s.completedDays + 1 }
            : s
        )
      );
    }

    closeDailyCheckIn();
  };

  // 6. Logout
  const handleLogout = () => {
    document.cookie =
      "next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#D2DCFF] flex flex-col">
      {/* Header */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-black px-4 py-2 rounded-lg font-medium"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Welcome, {session.user?.name}!</h2>

        {/* Example Task Progress (optional) */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Task Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressBar progress={75} />
          </CardContent>
        </Card>

        {/* Challenge Form & Streaks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Left column: Challenge form or button */}
          <div className="col-span-2 space-y-4">
            {showChallengeForm ? (
              <ChallengeForm
                onSubmit={handleChallengeSubmit}
                onClose={() => setShowChallengeForm(false)}
              />
            ) : (
              <Button
                onClick={() => setShowChallengeForm(true)}
                className="w-full h-20 text-lg"
              >
                Start a New Challenge
              </Button>
            )}

            {/* Existing streaks */}
            {streaks.map((streak) => (
              <div key={streak.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold mb-2">{streak.name}</h3>
                <p className="text-gray-700">
                  {streak.completedDays} / {streak.totalDays} days
                </p>
                <p className="text-gray-700">Stake: ${streak.moneyAmount}</p>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mt-2 mb-4">
                  <motion.div
                    className="bg-blue-500 h-4 rounded-full"
                    style={{
                      width:
                        streak.totalDays > 0
                          ? `${(streak.completedDays / streak.totalDays) * 100}%`
                          : "0%",
                    }}
                    initial={{ width: 0 }}
                    animate={{
                      width:
                        streak.totalDays > 0
                          ? `${(streak.completedDays / streak.totalDays) * 100}%`
                          : "0%",
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Daily Check–In Button */}
                <Button
                  disabled={streak.completedDays >= streak.totalDays}
                  onClick={() => openDailyCheckIn(streak)}
                >
                  {streak.completedDays >= streak.totalDays
                    ? "Completed"
                    : "Daily Check–In"}
                </Button>
              </div>
            ))}
          </div>

          {/* Right column: Profile display */}
          <ProfileDisplay
            profile={{
              name: session.user?.name || "No Name",
              email: session.user?.email || "No Email",
              avatar: session.user?.image || "/placeholder.svg",
            }}
          />
        </div>
      </main>

      {/* Confirmation Modal (for money stake) */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
            <h2 className="text-lg font-bold mb-4">Confirm Your Challenge</h2>
            <p className="mb-4">
              You are about to commit $
              {pendingChallenge?.moneyAmount} to this challenge. 
              Do you agree to proceed?
            </p>
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={cancelChallenge}>
                Cancel
              </Button>
              <Button onClick={confirmChallenge}>Confirm</Button>
            </div>
          </div>
        </div>
      )}

      {/* Daily Check–In Modal */}
      {checkInStreak && (
        <DailyCheckInModal
          visible={showCheckInModal}
          streakName={checkInStreak.name}
          onClose={closeDailyCheckIn}
          onSubmit={handleCheckInSubmit}
        />
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-4">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} LockedIn AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;

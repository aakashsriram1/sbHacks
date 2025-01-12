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

const DashboardPage = ({ session }) => {
  return (
    <SessionProvider session={session}>
      <Dashboard />
    </SessionProvider>
  );
};

const Dashboard = () => {
  const { data: session, status } = useSession();

  const [streaks, setStreaks] = useState<{ id: number; name: string; progress: number }[]>([]);
  const [newStreakName, setNewStreakName] = useState("");
  const [showChallengeForm, setShowChallengeForm] = useState(false);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return <p>Please log in to access your dashboard.</p>;
  }

  const addStreak = () => {
    if (newStreakName.trim() !== "") {
      setStreaks([...streaks, { id: streaks.length + 1, name: newStreakName, progress: 0 }]);
      setNewStreakName("");
    }
  };

  const handleLogout = () => {
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

        {/* Task Progress */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Task Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressBar progress={75} />
          </CardContent>
        </Card>

        {/* Streak Management */}
        <div className="mb-4">
          <input
            type="text"
            value={newStreakName}
            onChange={(e) => setNewStreakName(e.target.value)}
            placeholder="New Streak Name"
            className="border border-gray-300 px-4 py-2 rounded-lg mr-2"
          />
          <button onClick={addStreak} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Add Streak
          </button>
        </div>
        <div className="space-y-4">
          {streaks.map((streak) => (
            <div key={streak.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">{streak.name}</h3>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <motion.div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${streak.progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${streak.progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Challenge Form and Profile Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="col-span-2">
            {showChallengeForm ? (
              <ChallengeForm onClose={() => setShowChallengeForm(false)} />
            ) : (
              <Button
                onClick={() => setShowChallengeForm(true)}
                className="w-full h-20 text-lg"
              >
                Set Your Challenge
              </Button>
            )}
          </div>
          <ProfileDisplay
            profile={{
              name: session.user?.name || "No Name",
              email: session.user?.email || "No Email",
              avatar: session.user?.image || "/placeholder.svg",
            }}
          />
        </div>
      </main>

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

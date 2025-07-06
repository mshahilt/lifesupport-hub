"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UpcomingClassCard } from "./components/UpcomingClassCard";
import { ActiveLessonsList } from "./components/ActiveLessonsList";
import { StudentAnalyticsChart } from "./components/StudentAnalyticsChart";
import { upcomingSession, activeLessons, studentAnalytics } from "@/constants/sample/dashboard";

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);

  const handleStartClass = () => {
    console.log("Starting class...");
    // Navigate to live session or show modal
  };

  const handleScheduleClass = () => {
    console.log("Scheduling class...");
    setShowModal(true);
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <UpcomingClassCard
          {...upcomingSession}
          onStart={handleStartClass}
          onSchedule={handleScheduleClass}
          image="/assets/images/upcoming-section.png"
        />

        {/* Active Lessons and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActiveLessonsList lessons={activeLessons} />
          </div>
          <div>
            <StudentAnalyticsChart {...studentAnalytics} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

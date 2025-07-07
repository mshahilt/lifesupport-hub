"use client";

import React, { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { UpcomingClassCard } from "./components/UpcomingClassCard";
import { ActiveLessonsList } from "./components/ActiveLessonsList";
import { StudentAnalyticsChart } from "./components/StudentAnalyticsChart";
import { sampleUpcomingSession, activeLessons, studentAnalytics } from "@/constants/sample/dashboard";
import useLive from '@/hooks/useLive';
import { LiveSession } from "@/types";

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);
  const {liveSessions} = useLive();
  const [upcomingSession, setUpcomingSession] = useState<LiveSession>();
  
  useEffect(() => {
    console.log("live lessons :", liveSessions)
  const upcoming = liveSessions.find((session) => session.status === "upcoming");
  setUpcomingSession(upcoming);
}, [liveSessions]);

  const handleStartClass = () => {
    console.log("Starting class...");
  };

  const handleScheduleClass = () => {
    console.log("Scheduling class...");
    setShowModal(true);
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {upcomingSession ?(
          <UpcomingClassCard
            {...upcomingSession}
            onStart={handleStartClass}
            onSchedule={handleScheduleClass}
            image="/assets/images/upcoming-section.png"
          />
        ):(
          <UpcomingClassCard
            {...sampleUpcomingSession}
            onStart={handleStartClass}
            onSchedule={handleScheduleClass}
            image="/assets/images/upcoming-section.png"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActiveLessonsList lessons={liveSessions} />
          </div>
          <div>
            <StudentAnalyticsChart {...studentAnalytics} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

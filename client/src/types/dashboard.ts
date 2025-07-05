import { ActiveLesson, LiveSession, StudentAnalytics } from ".";

export interface DashboardData {
    upcomingSessions: LiveSession;
    activeLessons: ActiveLesson[];
    studentAnalytics: StudentAnalytics;
}
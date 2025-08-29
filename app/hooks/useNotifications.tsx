"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export function useNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Refresh immediately when other parts of the app update notifications
  useEffect(() => {
    const handler = () => fetchUnreadCount();
    window.addEventListener("notifications:updated", handler);
    return () => window.removeEventListener("notifications:updated", handler);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const response = await api.get("/notifications?unread_only=true");
      setUnreadCount(response.data.length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  return { unreadCount, refresh: fetchUnreadCount };
}

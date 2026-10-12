"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import { dashboardContent } from "@/lib/content/dashboard";

export interface CurrentCreator {
  displayName: string;
  username: string;
  initial: string;
  avatarUrl: string | null;
  email: string | null;
  isPro: boolean;
}

/**
 * Unified Creator Identity Hook
 * Consistently resolves creator display name, username handle, initial, and avatar
 * across sidebar, header, and dashboard views.
 */
export function useCurrentCreator(): CurrentCreator {
  const { user, profile } = useAuth();

  const displayName =
    profile?.display_name?.trim() ||
    user?.displayName?.trim() ||
    dashboardContent.identity.defaultDisplayName;

  const username =
    profile?.username?.trim() ||
    user?.email?.split("@")[0] ||
    dashboardContent.identity.defaultUsername;

  const initial = (displayName.charAt(0) || "C").toUpperCase();

  const avatarUrl = profile?.avatar_url || user?.photoURL || null;

  return {
    displayName,
    username,
    initial,
    avatarUrl,
    email: profile?.email || user?.email || null,
    isPro: true,
  };
}

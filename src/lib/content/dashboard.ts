/**
 * Central Content Dictionary for Playxim Creator Dashboard
 * All user-facing strings are defined here to eliminate hardcoded copy.
 */

export const dashboardContent = {
  navigation: {
    overview: "Overview",
    content: "Content",
    folders: "Folders",
    playlists: "Playlists",
    uploadCenter: "Upload Center",
    analytics: "Analytics",
    links: "Share Links",
    earnings: "Earnings",
    branding: "Branding",
    storage: "Storage",
    settings: "Settings",
    signOut: "Sign Out",
  },
  header: {
    quickActions: "Quick actions...",
    newUpload: "New Upload",
    notifications: "Notifications",
    toggleThemeDark: "Switch to dark mode",
    toggleThemeLight: "Switch to light mode",
    dashboardBreadcrumb: "Dashboard",
  },
  overview: {
    title: "Creator Overview",
    getGreeting: (displayName: string) =>
      `Welcome back, ${displayName}. Monitor your content pipeline, audience views, and accrued revenue.`,
    metrics: {
      storageUsed: {
        label: "Storage Used",
        policyLabel: "Quota policy:",
        policyValue: "Unlimited Tier",
      },
      totalStreams: {
        label: "Total Streams",
        deltaText: "+14.2% this week",
      },
      accruedEarnings: {
        label: "Accrued Earnings",
        getPayoutStatusText: (nextDateFormatted: string, isReached: boolean) =>
          `Next payout Fri, ${nextDateFormatted} · Min. $5 ${isReached ? "reached" : "not reached"}`,
      },
      hostedItems: {
        label: "Hosted Items",
        detailText: "Across 32 folders & 6 playlists",
      },
    },
    quickActions: {
      uploadFiles: {
        title: "Upload Files",
        description: "Videos & archives",
      },
      newFolder: {
        title: "New Folder",
        description: "Organize catalog",
      },
      manageLinks: {
        title: "Manage Links",
        description: "Security & access",
      },
      viewLedger: {
        title: "View Ledger",
        description: "Payout history",
      },
    },
    recentContent: {
      title: "Recent Content",
      subtitle: "Files uploaded in your creator workspace",
      viewAll: "View All Files",
    },
  },
  storageWidget: {
    title: "Storage Used",
    policy: "Policy: Unlimited",
    details: "Details",
    streamVideo: "Cloudflare Stream",
    r2Archive: "Cloudflare R2",
  },
  identity: {
    defaultDisplayName: "Creator",
    defaultUsername: "creator",
    brandPro: "PRO",
  },
} as const;

import { Email } from "@/hooks/useInboxStore";

export const mockEmails: Email[] = [
  {
    id: "1",
    sender: {
      name: "Alice Smith",
      email: "alice@example.com",
      avatar: "/avatars/alice.jpg",
    },
    subject: "Project Update: Q4 Goals",
    preview: "Hi team, just wanted to share the latest progress on Q4 goals...",
    date: "2023-10-27T10:00:00Z",
    read: false,
    labels: ["work", "important"],
    body: "Image Legion logo ( legion.cc ) *************************New deal listed on Legion*************************Makina is the DeFi Execution Engine that provides superior infrastructure for onchain asset management.Projectakina ( https://makina.finance/ )ale Date25 November 2025Previous BackersDialectic, cyber.Fund, Bodhi Ventures, Interop Ventures, Steakhouse Financial, Hypernative Labs, KilnEnable Reminder ( https://app.legion.cc/app/invest/makina/details )Stronger together - Team Legion.age",
    aiAnalysis: {
      type: "meeting",
      summary: "Alice shared Q4 goal progress. Everything is on track.",
      suggestedActions: ["Reply", "Schedule Review"],
      draftReply:
        "Thanks for the update, Alice. Great to hear we are on track.",
    },
  },
  {
    id: "2",
    sender: {
      name: "Bob Jones",
      email: "bob@example.com",
    },
    subject: "Lunch tomorrow?",
    preview: "Hey, are you free for lunch tomorrow at 12?",
    date: "2023-10-26T14:30:00Z",
    read: true,
    labels: ["personal"],
    body: "Hey,\n\nAre you free for lunch tomorrow at 12? I was thinking of trying that new Italian place.\n\n- Bob",
    aiAnalysis: {
      type: "inquiry",
      summary: "Bob wants to have lunch tomorrow at 12.",
      suggestedActions: ["Accept", "Decline", "Propose new time"],
      draftReply: "Sure, 12 works for me. See you there!",
    },
  },
  {
    id: "3",
    sender: {
      name: "Support Team",
      email: "support@service.com",
    },
    subject: "Ticket #12345 Resolved",
    preview: "Your support ticket has been marked as resolved.",
    date: "2023-10-25T09:15:00Z",
    read: true,
    labels: ["support"],
    body: "Hello,\n\nYour support ticket #12345 regarding 'Login Issue' has been marked as resolved. If you continue to experience issues, please reply to this email.\n\nRegards,\nSupport Team",
    aiAnalysis: {
      type: "other",
      summary: "Support ticket resolved.",
      suggestedActions: ["Archive"],
    },
  },
  {
    id: "4",
    sender: {
      name: "Marketing",
      email: "marketing@company.com",
    },
    subject: "New Feature Announcement",
    preview: "We are excited to announce our latest feature...",
    date: "2023-10-24T16:45:00Z",
    read: false,
    labels: ["newsletter"],
    body: "We are excited to announce our latest feature! Check out our blog for more details.",
    aiAnalysis: {
      type: "other",
      summary: "New feature announcement.",
      suggestedActions: ["Read Blog"],
    },
  },
];

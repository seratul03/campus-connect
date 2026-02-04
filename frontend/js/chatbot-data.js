/* =====================================================
   Campus Career Assistant – Static Chatbot Brain
   Version: 1.0
   Type: Phrase-based, collision-free
===================================================== */

const CHATBOT_FAQS = [
  // ───────────────── Platform Basics ─────────────────
  {
    intent: "platform_about",
    keywords: [
      "about this platform",
      "what is this platform",
      "platform purpose",
    ],
    answer:
      "This is an AI-powered internship and career assistance platform that helps students discover, apply for, and track internships efficiently.",
  },
  {
    intent: "platform_users",
    keywords: [
      "who can use this platform",
      "eligible users",
      "who is this for",
    ],
    answer:
      "Any student or recent graduate looking for internships or early career opportunities can use this platform.",
  },
  {
    intent: "platform_free",
    keywords: ["is this platform free", "free to use", "any charges involved"],
    answer:
      "Yes, this platform is completely free for students. There are no registration or usage charges.",
  },
  {
    intent: "account_required",
    keywords: [
      "account required to apply",
      "need to register",
      "signup mandatory",
    ],
    answer:
      "Yes, you must create an account to apply for internships and track your application status.",
  },
  {
    intent: "internship_domains",
    keywords: [
      "available internship domains",
      "types of internships offered",
      "internship categories",
    ],
    answer:
      "Internships are available across AI, Machine Learning, Web Development, Data Science, Software Engineering, and related domains.",
  },

  // ───────────────── Eligibility & Profile ─────────────────
  {
    intent: "ai_only_students",
    keywords: [
      "only for ai students",
      "ai students only",
      "non ai students allowed",
    ],
    answer:
      "No, the platform is open to students from multiple technical and non-technical backgrounds.",
  },
  {
    intent: "beginner_friendly",
    keywords: [
      "beginner friendly internships",
      "freshers allowed",
      "no experience required",
    ],
    answer:
      "Yes, many internships are beginner-friendly and designed for students with minimal experience.",
  },
  {
    intent: "official_platform",
    keywords: [
      "official internship platform",
      "is this legit",
      "trusted platform",
    ],
    answer:
      "Yes, this is a structured and legitimate internship assistance platform for students.",
  },
  {
    intent: "platform_updates",
    keywords: [
      "how often updated",
      "new internships added",
      "platform updates",
    ],
    answer:
      "The platform is regularly updated with new internships and features.",
  },
  {
    intent: "mobile_support",
    keywords: ["mobile friendly website", "works on phone", "mobile support"],
    answer:
      "Yes, the platform is fully responsive and works smoothly on mobile devices.",
  },

  // ───────────────── Account & Profile ─────────────────
  {
    intent: "create_account",
    keywords: [
      "how to create account",
      "signup process",
      "register new account",
    ],
    answer:
      "You can create an account by signing up with your email and completing your basic profile details.",
  },
  {
    intent: "profile_details",
    keywords: [
      "required profile details",
      "profile information needed",
      "what to fill in profile",
    ],
    answer:
      "Your profile includes personal details, education, skills, and academic information.",
  },
  {
    intent: "edit_profile",
    keywords: [
      "edit profile later",
      "update profile information",
      "change profile details",
    ],
    answer:
      "Yes, you can update or edit your profile anytime from your dashboard.",
  },
  {
    intent: "profile_incomplete",
    keywords: [
      "profile marked incomplete",
      "why profile incomplete",
      "complete my profile",
    ],
    answer:
      "Some required fields may be missing. Completing your profile improves job recommendations.",
  },
  {
    intent: "data_security",
    keywords: ["is my data safe", "privacy protection", "data security"],
    answer:
      "Yes, your personal data is securely stored and shared only with recruiters when you apply.",
  },
  {
    intent: "after_graduation",
    keywords: [
      "use after graduation",
      "graduates allowed",
      "post graduation access",
    ],
    answer: "Yes, recent graduates can continue using the platform.",
  },
  {
    intent: "wrong_profile_details",
    keywords: [
      "entered wrong details",
      "incorrect profile information",
      "mistake in profile",
    ],
    answer: "You can correct any incorrect details by editing your profile.",
  },
  {
    intent: "delete_account",
    keywords: [
      "delete my account",
      "remove account permanently",
      "close my account",
    ],
    answer: "You can request account deletion through the support section.",
  },

  // ───────────────── Applying to Internships ─────────────────
  {
    intent: "apply_process",
    keywords: ["how to apply", "application process", "steps to apply"],
    answer: "Select an internship and click the apply button after logging in.",
  },
  {
    intent: "multiple_applications",
    keywords: [
      "how many can i apply",
      "apply multiple internships",
      "number of applications",
    ],
    answer: "You can apply for multiple internships at the same time.",
  },
  {
    intent: "application_confirmation",
    keywords: [
      "application submitted successfully",
      "submission confirmation",
      "application success",
    ],
    answer:
      "You will see a confirmation message and status update in your dashboard.",
  },
  {
    intent: "after_applying",
    keywords: [
      "what happens after applying",
      "next step after apply",
      "post application process",
    ],
    answer: "Your profile is sent to the recruiter for review after applying.",
  },
  {
    intent: "recruiter_visibility",
    keywords: [
      "how recruiters see profile",
      "profile visibility to recruiters",
      "who can see my profile",
    ],
    answer:
      "Recruiters can view your profile only after you apply for their internship.",
  },
  {
    intent: "paid_internships",
    keywords: [
      "are internships paid",
      "stipend details",
      "paid or unpaid internships",
    ],
    answer:
      "Both paid and unpaid internships are available depending on the employer.",
  },
  {
    intent: "internship_duration",
    keywords: [
      "internship duration",
      "how long internships last",
      "internship length",
    ],
    answer:
      "Internship durations typically range from a few weeks to several months.",
  },
  {
    intent: "withdraw_application",
    keywords: [
      "withdraw application",
      "cancel applied internship",
      "remove application",
    ],
    answer:
      "You can withdraw your application before it is reviewed by the recruiter.",
  },
  {
    intent: "cannot_apply",
    keywords: [
      "unable to apply",
      "apply button disabled",
      "cannot submit application",
    ],
    answer:
      "This usually happens if eligibility criteria are not met or your profile is incomplete.",
  },
  {
    intent: "remote_internships",
    keywords: [
      "remote internships available",
      "work from home internships",
      "onsite or remote",
    ],
    answer:
      "Both remote and on-site internships are available on the platform.",
  },
  {
    intent: "certificate_provided",
    keywords: [
      "internship certificate",
      "certificate after completion",
      "will i get certificate",
    ],
    answer: "Some internships provide certificates upon successful completion.",
  },
  {
    intent: "placement_guarantee",
    keywords: ["placement guaranteed", "job guarantee", "assured placement"],
    answer:
      "No, selection and placement depend entirely on recruiter decisions.",
  },

  // ───────────────── AI & System ─────────────────
  {
    intent: "ai_recommendations",
    keywords: [
      "how ai recommends internships",
      "ai based suggestions",
      "job recommendation system",
    ],
    answer:
      "AI analyzes your skills, profile, and activity to recommend relevant internships.",
  },
  {
    intent: "recommendation_reason",
    keywords: [
      "why am i seeing this job",
      "recommended internships reason",
      "job suggestion reason",
    ],
    answer: "These internships match your profile, skills, and preferences.",
  },
  {
    intent: "skill_analysis",
    keywords: [
      "does system analyze skills",
      "skill based matching",
      "skills evaluation",
    ],
    answer: "Yes, skills play a major role in internship recommendations.",
  },
  {
    intent: "ai_accuracy",
    keywords: [
      "are ai suggestions accurate",
      "recommendation accuracy",
      "ai reliability",
    ],
    answer:
      "Recommendations are highly relevant but final selection depends on recruiters.",
  },
  {
    intent: "chatbot_type",
    keywords: ["is chatbot ai", "chatbot intelligence", "how chatbot works"],
    answer:
      "This chatbot uses predefined responses to assist users quickly and accurately.",
  },
  {
    intent: "auto_apply",
    keywords: [
      "can chatbot apply for me",
      "automatic application",
      "apply automatically",
    ],
    answer: "No, applications must be submitted manually by users.",
  },
  {
    intent: "selection_chances",
    keywords: [
      "increase selection chances",
      "improve chances",
      "get shortlisted",
    ],
    answer:
      "A complete and strong profile improves visibility, but selection is recruiter-driven.",
  },
  {
    intent: "activity_tracking",
    keywords: [
      "does system track activity",
      "user activity tracking",
      "activity usage",
    ],
    answer:
      "Activity is used only to improve recommendations and platform experience.",
  },

  // ───────────────── Status & Support ─────────────────
  {
    intent: "application_status",
    keywords: [
      "check application status",
      "track my applications",
      "application progress",
    ],
    answer:
      "You can check your application status in the My Applications section of the dashboard.",
  },
  {
    intent: "under_review",
    keywords: [
      "what does under review mean",
      "application under review",
      "status under review",
    ],
    answer:
      "It means your application is currently being evaluated by the recruiter.",
  },
  {
    intent: "shortlisted",
    keywords: [
      "what does shortlisted mean",
      "shortlisting stage",
      "shortlisted status",
    ],
    answer:
      "Shortlisted means you have been selected for the next stage of the process.",
  },
  {
    intent: "notifications",
    keywords: [
      "will i get notified",
      "application notifications",
      "status alerts",
    ],
    answer:
      "Yes, important updates are shown as notifications on your dashboard.",
  },
  {
    intent: "recruiter_messages",
    keywords: [
      "where to see messages",
      "recruiter messages",
      "communication section",
    ],
    answer:
      "Recruiter messages appear in the notifications or messages section.",
  },
  {
    intent: "no_recruiter_response",
    keywords: [
      "recruiter not responding",
      "no reply from recruiter",
      "no response received",
    ],
    answer:
      "You can continue applying to other internships while waiting for responses.",
  },
  {
    intent: "technical_issue",
    keywords: [
      "facing technical issue",
      "error while using platform",
      "something went wrong",
    ],
    answer: "Please refresh the page or contact support if the issue persists.",
  },
  {
    intent: "site_not_loading",
    keywords: ["website not loading", "page not opening", "site down"],
    answer: "Check your internet connection or try again later.",
  },
  {
    intent: "forgot_credentials",
    keywords: ["forgot login details", "forgot password", "cannot login"],
    answer: "Use the forgot password option to reset your login credentials.",
  },
  {
    intent: "support_contact",
    keywords: ["contact support", "need help", "customer support"],
    answer:
      "You can reach out to the support team through the help or contact section.",
  },
];

const FALLBACK_RESPONSE =
  "Sorry, I couldn’t understand that. Please try rephrasing your question or check the help section.";

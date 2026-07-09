import React from "react";
import HomePage from "../pages/HomePage";
import PricingPage from "../pages/PricingPage";
import SolutionMatchPage from "../pages/SolutionMatchPage";
import ContactPage from "../pages/ContactPage";
import FAQPage from "../pages/FAQPage";
import AcquisitionProcessPage from "../pages/AcquisitionProcessPage";
import WhatYouReceivePage from "../pages/WhatYouReceivePage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import TransactionProtectionPage from "../pages/TransactionProtectionPage";
import DashboardPage from "../pages/DashboardPage";
import ExportCenterPage from "../pages/ExportCenterPage";
import PrivacyPage from "../pages/legal/PrivacyPage";
import TermsPage from "../pages/legal/TermsPage";
import DisclaimerPage from "../pages/legal/DisclaimerPage";

export interface RouteConfig {
  path: string;
  element: React.ComponentType;
  protected?: boolean;
}

export const appRoutes: RouteConfig[] = [
  { path: "/", element: HomePage },
  { path: "/pricing", element: PricingPage },
  { path: "/solution-match", element: SolutionMatchPage },
  { path: "/contact", element: ContactPage },
  { path: "/faq", element: FAQPage },
  { path: "/acquisition-process", element: AcquisitionProcessPage },
  { path: "/what-you-receive", element: WhatYouReceivePage },
  { path: "/login", element: LoginPage },
  { path: "/forgot-password", element: ForgotPasswordPage },
  { path: "/reset-password", element: ResetPasswordPage },
  { path: "/transaction-protection", element: TransactionProtectionPage },
  { path: "/dashboard", element: DashboardPage, protected: true },
  { path: "/export-center", element: ExportCenterPage, protected: true },
  { path: "/legal/privacy", element: PrivacyPage },
  { path: "/legal/terms", element: TermsPage },
  { path: "/legal/disclaimer", element: DisclaimerPage },
];
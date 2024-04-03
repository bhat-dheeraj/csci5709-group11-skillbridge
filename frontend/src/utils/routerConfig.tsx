import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../pages/not-found-page/NotFoundPage";
import LandingPage from "../pages/landing-page/LandingPage";
import FaqPage from "../pages/faq-page/FaqPage";
import SignIn from "../components/SignIn/SignIn";
import { NavigationItem } from "../models/NavigationItem.model";
import SignUp from "../components/SignUp/SignUp";
import ContactUsPage from "../pages/contact-us/ContactUsPage";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import ApplyMentor from "../pages/mentorship/ApplyMentor";
import FindMentor from "../pages/mentorship/FindMentor";
import RateMentor from "../pages/mentorship/RateMentor";
import MentorProfile from "../pages/mentorship/MentorProfile";
import PaymentPage from "../pages/payment-page/PaymentPage";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import ProfilePage from "../pages/profile-page/ProfilePage";
import DiscussionsPage from "../pages/discussions/discussions";
import DiscussionView from "../pages/discussions/discussionView";
import NewDiscussion from "../pages/discussions/newDiscussion";
import PaymentCardsPage from "../pages/payments-cards-page/PaymentsCardsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <LandingPage /> },
      {
        path: "/faqs",
        element: <FaqPage />,
      },
      {
        path: "/contact-us",
        element: <ContactUsPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/pay", element: <PaymentPage /> },
          {
            path: "/profile",
            element: <ProfilePage uid={""} />,
          },
          {
            path: "/discussions",
            element: <DiscussionsPage />,
          },
          {
            path: "/discussions/:discussionId",
            element: <DiscussionView />,
          },
          {
            path: "/discussions/new",
            element: <NewDiscussion />,
          },
          { path: "/payments", element: <PaymentCardsPage /> },
          {
            path: "/mentors",
            element: <FindMentor />,
          },
          {
            path: "/applymentor",
            element: <ApplyMentor />,
          },
          {
            path: "/mentorprofile/:id?",
            element: <MentorProfile />,
          },
          {
            path: "/ratementor",
            element: <RateMentor />,
          },
        ],
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

export const navigationItems: NavigationItem[] = [
  { path: "mentors", label: "Mentorship", isProtected: true },
  { path: "contact-us", label: "Contact Us", isProtected: false },
  { path: "faqs", label: "FAQs", isProtected: false },
];

import type { Metadata } from "next";
import { AboutView } from "./AboutView";
import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description: "최예인의 학력, 경력, 수상, 활동과 연락처",
};

export default function AboutPage() {
  return <AboutView />;
}

import type { Metadata } from "next";
import { ProjectBoard } from "./ProjectBoard";
import "./project.css";

export const metadata: Metadata = {
  title: "Project",
  description: "만든 것과 받은 상을 종류별 폴더에 모아 두었어요.",
};

export default function ProjectPage() {
  return <ProjectBoard />;
}

import type { Metadata } from "next";
import { WorkShelf } from "./WorkShelf";
import "./work.css";

export const metadata: Metadata = {
  title: "Work",
  description: "TA, 강사, 봉사, 동아리, 아르바이트 활동을 책장에 모았어요.",
};

export default function WorkPage() {
  return <WorkShelf />;
}

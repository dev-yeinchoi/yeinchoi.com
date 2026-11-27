import type { Metadata } from "next";
import { DesignSystemDoc } from "./DesignSystemDoc";
import "./design-system.css";

export const metadata: Metadata = {
  title: "Design System",
  description: "yeinchoi.com에서 공통으로 쓰는 색, 글자, 모양, 움직임, 컴포넌트",
};

export default function DesignSystemPage() {
  return <DesignSystemDoc />;
}

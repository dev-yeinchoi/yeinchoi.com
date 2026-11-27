import type { Metadata } from "next";
import { GalleryGlobe } from "./GalleryGlobe";
import "./gallery.css";

export const metadata: Metadata = {
  title: "Gallery",
  description: "카메라를 들었던 곳들을 지구본 위에 모았어요.",
};

export default function GalleryPage() {
  return <GalleryGlobe />;
}

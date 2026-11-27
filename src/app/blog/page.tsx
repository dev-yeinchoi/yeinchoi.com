import type { Metadata } from "next";
import { getPostMetas } from "@/lib/blog";
import { BlogList } from "./BlogList";
import "./blog.css";

export const metadata: Metadata = {
  title: "Blog",
  description: "공부하고 경험한 것을 기록합니다.",
};

export default function BlogPage() {
  const posts = getPostMetas();
  return (
    <div className="b-container b-list-page">
      <section className="b-head">
        <h1 className="t-title1">Blog</h1>
        <p className="t-body2r">공부하고 경험한 것을 기록합니다.</p>
      </section>
      <BlogList posts={posts} />
    </div>
  );
}

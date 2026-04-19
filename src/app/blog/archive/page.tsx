import { redirect } from "next/navigation";

export default function BlogArchiveRedirectPage() {
  redirect("/blog/all-posts");
}

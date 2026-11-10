import { Suspense } from "react";
import { Metadata } from "next";
import { site } from "@/lib/site";
import { WorksArchiveShelf } from "@/components/WorksArchiveShelf";

export const metadata: Metadata = {
  title: `Works Archive — ${site.name}`,
  description: "Archival shelf of selected projects, brand systems, interfaces, and art direction.",
};

export default function WorksPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#e7e5df]" />}>
      <WorksArchiveShelf />
    </Suspense>
  );
}

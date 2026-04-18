"use client";

import PortfolioPreview from "@/components/PortfolioPreview";
import PublishButton from "@/components/PublishButton";

export default function DashboardPreview() {
  return (
    <div className="bg-gray-950">
      <PortfolioPreview />
      <PublishButton />
    </div>
  );
}
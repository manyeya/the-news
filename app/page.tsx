"use client"
import ArticleSection from "@/components/article-preview/ArticlePreviewSection";
import FeaturedSection from "@/components/FeaturedSection";
import VideoSection from "@/components/video/VideoSection";
import QuickBites from "@/components/QuickBites";
import FeaturedCard from "@/components/FeaturedCard";

export default function Home() {
  return (
    <div className="space-y-12 mx-auto max-w-screen-xl">
      <div className="border-b grid grid-cols-1 md:grid-cols-2 h-full md:h-[600px] md:max-h-[1200px] gap-4">
        <FeaturedCard size="large" description="Global stocks retreated, erasing gains for the week as a glum set of European corporate earnings compounded investor nervousness before a major speech from U.S. President Donald Trump. Gold extended its rally as the dollar edged lower." title={"What One Photo Tells Us About North Korea’s Nuclear Program"} imageUrl={"/zero.png"} />
        <div className="grid grid-cols-1 h-full md:grid-cols-2 gap-4">
          <ArticleSection title="Top Stories" category="General" sectionVariant="yellow" />
          <QuickBites articles={[
            {
              title: "Stocks Sell Off, Gold Rises Markets Wrap",
              content: "Global stocks retreated, erasing gains for the week as a glum set of European corporate earnings compounded investor nervousness before a major speech from U.S. President Donald Trump. Gold extended its rally as the dollar edged lower."
            },
            {
              title: "Another Day in the Market: What You Need to Know",
              content: "Investors remain cautious, focusing on economic data releases and potential policy changes."
            }
          ]} />
        </div>
      </div>
      <FeaturedSection />
      <div className="border-b grid grid-cols-1 md:grid-cols-5 md:h-[600px] md:max-h-[1200px] gap-4">
        <ArticleSection pageSize={5} title="Entertainment" category="Entertainment" sectionVariant="yellow" />
        <ArticleSection pageSize={2} className="col-span-2 border-x px-2" title="General" category="General" sectionVariant="blue" cardVariant="compact" showSectionHeading={false} />
        <ArticleSection pageSize={5} title="Technology" category="Technology" sectionVariant="yellow" />
        <ArticleSection pageSize={2} title="Sports" category="Sports" sectionVariant="gray" cardVariant="compact" />
      </div>
      <div className="border-b grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-3">
          <VideoSection />
        </div>
        <ArticleSection pageSize={5} title="Science" category="Science" sectionVariant="yellow" />
      </div>
    </div>
  );
}
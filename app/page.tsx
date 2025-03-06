"use client"
import ArticleSection from "@/components/article-preview/ArticlePreviewSection";
import VideoSection from "@/components/video/VideoSection";
import QuickBites from "@/components/QuickBites";
import FeaturedCard from "@/components/FeaturedCard";
import FeaturedSection from "@/components/FeaturedSection";

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-xl">


      <div className="px-4 space-y-12">
        {/* Lead Story Section */}
        <div className="border-b border-gray-200 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Story - 50% */}
            <div className="lg:col-span-6">
              <FeaturedCard
                size="large"
                description="Global stocks retreated, erasing gains for the week as a glum set of European corporate earnings compounded investor nervousness before a major speech from U.S. President Donald Trump. Gold extended its rally as the dollar edged lower."
                title="What One Photo Tells Us About North Korea's Nuclear Program"
                imageUrl="/zero.png"
              />
            </div>

            {/* Secondary Stories - 25% */}
            <div className="lg:col-span-3 border-l border-gray-200 lg:pl-8">
              <ArticleSection
                title="Top Stories"
                category="General"
                sectionVariant="yellow"
                pageSize={8}
                cardVariant="text-only"
              />
            </div>

            {/* Latest News - 25% */}
            <div className="lg:col-span-3 border-l border-gray-200 lg:pl-8">
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
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <FeaturedSection />
        </div>

        {/* Secondary Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 border-b border-gray-200">
          <div className="lg:col-span-3">
            <ArticleSection
              pageSize={4}
              title="Entertainment"
              category="Entertainment"
              sectionVariant="yellow"
              cardVariant="compact"
            />
          </div>
          <div className="lg:col-span-6 border-l border-r border-gray-200 px-8">
            <ArticleSection
              pageSize={5}
              title="Latest News"
              category="General"
              sectionVariant="blue"
              cardVariant="full"
            />
          </div>
          <div className="lg:col-span-3">
            <ArticleSection
              pageSize={10}
              title="Technology"
              category="Technology"
              sectionVariant="yellow"
              cardVariant="text-only"
            />
          </div>
        </div>

        {/* Additional Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8">
          <div className="lg:col-span-9">
            <VideoSection />
          </div>
          <div className="lg:col-span-3 border-l border-gray-200 lg:pl-8">
            <ArticleSection
              pageSize={4}
              title="Science"
              category="Science"
              sectionVariant="yellow"
              cardVariant="compact"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

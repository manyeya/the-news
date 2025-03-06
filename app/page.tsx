"use client"
import ArticlePreviewSection from "@/components/article-preview/ArticlePreviewSection";
import VideoSection from "@/components/video/VideoSection";
import QuickBites from "@/components/QuickBites";
import MainSection from "@/components/MainSection";
import FeaturedSection from "@/components/featured/FeaturedSection";
import GridSection from "@/components/article-preview/GridSection";

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-xl">

      <div className="space-y-12">
        {/* Lead Story Section */}
        <div className="border-b  py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Story - 50% */}
            <div className="lg:col-span-6">
              <MainSection />
            </div>

            {/* Secondary Stories - 25% */}
            <div className="lg:col-span-3 border-l  lg:pl-8">
              <ArticlePreviewSection
                title="Top Stories"
                category="General"
                sectionVariant="yellow"
                pageSize={8}
                cardVariant="text-only"
              />
            </div>

            {/* Latest News - 25% */}
            <div className="lg:col-span-3 border-l  lg:pl-8">
              <QuickBites />
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
            <ArticlePreviewSection
              pageSize={5}
              title="Entertainment"
              category="Entertainment"
              sectionVariant="yellow"
              cardVariant="compact"
            />
          </div>
          <div className="lg:col-span-6 border-l border-r border-gray-200">
            <ArticlePreviewSection
              pageSize={4}
              title="Latest News"
              category="General"
              sectionVariant="gray"
              cardVariant="full"
            />
          </div>
          <div className="lg:col-span-3">
            <ArticlePreviewSection
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
            <div className="mt-8">
              <GridSection columns={4} rows={2} />
            </div>
          </div>
          <div className="lg:col-span-3 border-l border-gray-200 lg:pl-8">
            <ArticlePreviewSection
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

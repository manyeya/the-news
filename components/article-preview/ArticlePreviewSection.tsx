import { useTopHeadlines } from "@/lib/services/news/hooks/useNews";
import ArticlePreviewCard, { ArticleCardVariant } from "./ArticlePreviewCard";
import { Skeleton } from "@/components/ui/skeleton";
import { SectionHeading } from "@/components/ui/section-heading";
import { NewsCategory } from "@/lib/services/news/types";
import { clean, cn } from "@/lib/utils";

interface ArticleSectionProps {
  pageSize?: number;
  category: keyof typeof NewsCategory;
  title: string;
  sectionVariant?: "yellow" | "gray" | "blue"
  cardVariant?: ArticleCardVariant;
  showSectionHeading?: boolean;
  className?: string;

}

export default function ArticlePreviewSection({ category = "General", title, sectionVariant, cardVariant, showSectionHeading = true, className, pageSize }: ArticleSectionProps) {
  const { data, isLoading, isError } = useTopHeadlines({ country: "us", pageSize: pageSize || 7, category: category });

  if (isLoading) {
    return (
      <div className={cn("w-full h-[600px] flex flex-col", className)}>
        <div className="sticky top-0 z-10">
          {showSectionHeading && <SectionHeading title={title} variant={sectionVariant || "yellow"} />}
        </div>
        <div className="space-y-4 overflow-y-auto flex-1">
          {Array(5).fill(0).map((_, index) => (
            <div key={index} className="py-2">
              <Skeleton className="h-5 w-3/4 mb-1" />
              {index < 4 && <div className="h-px border-t mt-4" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn("w-full h-[600px] flex flex-col", className)}>
        <div className="sticky top-0 z-10">
          {showSectionHeading && <SectionHeading title={title} variant={sectionVariant || "yellow"} />}
        </div>
        <div className="bg-red-50 dark:bg-red-950/10 p-6 overflow-y-auto flex-1">
          <div className="text-red-800 text-center">
            <p className="font-semibold">Unable to load top stories</p>
            <p className="text-sm mt-1">Please check your internet connection and try again</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-[600px] flex flex-col", className)}>
      {showSectionHeading && <div className="sticky top-0 z-10 border-b">
        <SectionHeading title={title} variant={sectionVariant || "yellow"} />
      </div>}
      <div className="space-y-4 h-full overflow-y-auto custom-scrollbar pt-4 snap-y snap-proximity">
        {data?.articles?.map((story, index) => (
          <div className="snap-start" key={index}>
            <ArticlePreviewCard showImage={(index + 1) % 2 === 0} description={story.description} imageUrl={story.urlToImage} variant={cardVariant || "text-only"} title={clean(story.title)} href={story.url} underLine={index < data.articles.length - 1} />
          </div>
        ))}
      </div>
    </div>
  );
}

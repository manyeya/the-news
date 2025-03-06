import { useTopHeadlines } from "@/lib/services/news/hooks/useNews";
import ArticlePreviewCard, { ArticleCardVariant } from "./ArticlePreviewCard";
import { SectionHeading } from "@/components/ui/section-heading";
import { NewsCategory } from "@/lib/services/news/types";
import { clean, cn, generateArticleUrl } from "@/lib/utils";
import { ArticlePreviewSkeleton } from "./ArticlePreviewSkeleton";

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
      <div className={cn("w-full flex flex-col", className)}>
        <div className="mb-6">
          {showSectionHeading && (
            <div className="">
              <SectionHeading 
                title={title.toUpperCase()} 
                variant={sectionVariant || "yellow"} 
              />
            </div>
          )}
        </div>
        <div className="space-y-6">
          {Array(pageSize || 4).fill(0).map((_, index) => (
            <div key={index}>
              <ArticlePreviewSkeleton 
                variant={cardVariant} 
                showImage={(index + 1) % 2 === 0} 
              />
              {index < (pageSize || 4) - 1 && (
                <div className="pt-6 mt-6 border-t " />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={cn("w-full flex flex-col", className)}>
        <div className="mb-6">
          {showSectionHeading && (
              <SectionHeading 
                title={title.toUpperCase()} 
                variant={sectionVariant || "yellow"} 
              />
  
          )}
        </div>
        <div className=" p-6">
          <div className="text-red-800 text-center">
            <p className="font-serif text-lg">Unable to load {title}</p>
            <p className="font-sans text-sm mt-2">Please check your internet connection and try again</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full flex flex-col", className)}>
      {showSectionHeading && (
        <div className="mb-6 border-gray-200">
          <SectionHeading 
            title={title.toUpperCase()} 
            variant={sectionVariant || "yellow"} 
          />
        </div>
      )}
      <div className="space-y-">
        {data?.articles?.map((story, index) => (
          <div key={index}>
            <ArticlePreviewCard 
              showImage={(index + 1) % 2 === 0} 
              description={story.description} 
              imageUrl={story.urlToImage} 
              variant={cardVariant || "text-only"} 
              title={clean(story.title)} 
              href={generateArticleUrl(story, category)}
              underLine={index < data.articles.length - 1} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

import { Play } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState } from "react"
import VideoPlayer from "../Player/VideoPlayer"

interface VideoProps {
    title: string
    source: string
    thumbnail: string
    href: string
    className?: string
}

export default function VideoCard({ video, isMain = false }: { video: VideoProps; isMain?: boolean }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className={cn("w-full", video.className)}>
            <div className={cn(
                "relative overflow-hidden rounded-sm shadow-sm",
                isMain ? "aspect-[16/9]" : "aspect-video"
            )}>
                {!isModalOpen ? (
                    <button onClick={() => setIsModalOpen(true)} className="group relative block w-full h-full">
                        <Image
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            fill
                            sizes={isMain ? "100vw" : "(max-width: 768px) 100vw, 33vw"}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="rounded-full bg-black/60 group-hover:bg-black/80 transition-colors">
                                <Play className={cn(
                                    "text-white",
                                    isMain ? "w-6 h-6 m-2" : "w-4 h-4 m-1.5"
                                )} fill="white" />
                            </div>
                        </div>
                        <div className={cn(
                            "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pl-3",
                            isMain ? "p-6" : "py-2 pr-2"
                        )}>
                            <h2 className={cn(
                                "font-sans leading-tight text-white mb-1.5 text-left line-clamp-2 pl-0",
                                isMain ? "text-xl md:text-2xl" : "text-xs"
                            )}>
                                {video.title}
                            </h2>
                            <div className="w-full flex items-start">
                                <span className={cn(
                                    "font-sans text-white/90",
                                    isMain ? "text-[0.7rem]" : "text-[0.6rem]"
                                )}>
                                    {video.source}
                                </span>
                            </div>
                        </div>
                    </button>
                ) : (
                    <VideoPlayer
                        url={video.href}
                        id={video.href}
                        title={video.title}
                    />
                )}
            </div>
        </div>
    )
}

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
                            <div className="rounded-full bg-black/60 p-3 group-hover:bg-black/80 transition-colors">
                                <Play className="w-6 h-6 text-white" fill="white" />
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                            <h2 className={cn(
                                "font-serif leading-tight text-white mb-3",
                                isMain ? "text-2xl md:text-[2rem]" : "text-lg"
                            )}>
                                {video.title}
                            </h2>
                            <div className="flex items-center text-white/90">
                                <span className={cn(
                                    "font-sans",
                                    isMain ? "text-sm" : "text-xs"
                                )}>
                                    {video.source}
                                </span>
                                <span className="mx-2 text-white/60">•</span>
                                <span className={cn(
                                    "font-sans text-white/60",
                                    isMain ? "text-sm" : "text-xs"
                                )}>
                                    4:23
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

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
            <div className={cn("relative overflow-hidden", isMain ? "aspect-[16/9]" : "aspect-video")}>
                {!isModalOpen ? (
                    <button onClick={() => setIsModalOpen(true)} className="group relative block w-full h-full">
                        <Image
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="object-cover"
                            fill
                            sizes={isMain ? "100vw" : "(max-width: 768px) 100vw, 33vw"}
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="rounded-full bg-black/50 p-3 group-hover:bg-black/70 transition-colors">
                                <Play className="w-6 h-6 text-white" fill="white" />
                            </div>
                        </div>
                        {isMain && (
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                <h2 className="text-white text-2xl font-medium mb-2">{video.title}</h2>
                                <div className="text-white/80 text-sm">
                                    {video.source}
                                </div>
                            </div>
                        )}
                        {!isMain && (
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                <h3 className="text-white text-sm font-medium mb-1">{video.title}</h3>
                                <div className="text-white/80 text-xs">
                                    {video.source}
                                </div>
                            </div>
                        )}
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

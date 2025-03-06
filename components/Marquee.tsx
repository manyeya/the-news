import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

interface MarqueeProps {
    titles: string[];
    speed?: number;
}

function Marquee({ titles, speed = 20 }: MarqueeProps) {
    return (
        <div className="overflow-hidden h-full w-full relative flex items-center ">
            <motion.div
                className="whitespace-nowrap flex items-center space-x-8 px-4 absolute"
                animate={{
                    x: ["0%", "-50%"]
                }}
                transition={{
                    duration: speed * 3,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {[...titles, ...titles].map((title, index) => (
                    <Link href="#"
                        key={index}
                        className="text-lg font-serif border-l pl-8 hover:underline"
                    >
                        {title}
                    </Link>
                ))}
            </motion.div>
        </div>
    );
}

export default Marquee;

"use client"

import { motion } from "framer-motion"

const letters = "THE NEWS".split("")

export default function Loading() {
  return (
    <motion.div 
      className="fixed inset-0 bg-background z-50 flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative">
        {/* Main text animation */}
        <div className="relative">
          <motion.div 
            className="text-8xl font-serif flex overflow-hidden relative"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: 0.2
          }}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                className="relative inline-block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    delay: i * 0.1
                  }
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>

          {/* Gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background"
            animate={{
              opacity: [0, 0.5, 0],
              y: [0, 100, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Animated lines */}
        <div className="mt-8 space-y-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="h-[1px] bg-brand-blue/20"
              initial={{ scaleX: 0 }}
              animate={{ 
                scaleX: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{
                originX: index === 0 ? 0 : 1
              }}
            />
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          className="mt-8 text-sm text-brand-blue/70 font-sans tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading your news
        </motion.div>
      </div>
    </motion.div>
  )
}

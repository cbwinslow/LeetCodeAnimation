"use client"

import { useState } from "react"
import Image from "next/image"
import { Loader2 } from "lucide-react"

interface OptimizedGifProps {
  src: string
  alt: string
  className?: string
}

export function OptimizedGif({ src, alt, className = "" }: OptimizedGifProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        </div>
      )}
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className={`rounded-lg ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
          unoptimized // GIFs need unoptimized flag
        />
      ) : (
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-8 text-center">
          <p className="text-zinc-500">Animation not available</p>
        </div>
      )}
    </div>
  )
}

// components/Popcorn.tsx
import { useState } from 'react'
import Image from 'next/image'

interface Explosion {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
}

interface PopcornProps {
  src: string
  alt: string
}

const Popcorn: React.FC<PopcornProps> = ({ src, alt }) => {
  const [explosions, setExplosions] = useState<Explosion[]>([])

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newExplosion: Explosion = {
      id: Date.now(),
      x,
      y,
      rotation: Math.random() * 360,
      scale: 1 + Math.random(),
    }
    setExplosions((prev) => [...prev, newExplosion])

    // 애니메이션 종료 후 제거
    setTimeout(() => {
      setExplosions((prev) => prev.filter((exp) => exp.id !== newExplosion.id))
    }, 1000) // 애니메이션 지속 시간과 일치해야 함
  }

  return (
    <div
      className="relative h-screen w-full cursor-pointer bg-black"
      onClick={handleClick}
    >
      {explosions.map((exp) => (
        <div
          key={exp.id}
          className="absolute"
          style={{ top: exp.y, left: exp.x }}
        >
          <Image
            src={src}
            alt={alt}
            width={50}
            height={50}
            className="animate-explode animate-rotate"
            style={{
              transform: `rotate(${exp.rotation}deg) scale(${exp.scale})`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default Popcorn

import { useEffect, useState, useMemo } from "react";
import { popcorn_eye_Img, popcornImg } from "./PopcornImg";
import Image from "next/image";

interface FallingImage {
  id: number;
  src: string;
  x: number;
  delay: number;
  duration: number;
  finalY: number;
}

interface PopcornProps {
  origin: { x: number; y: number };
}

export const Popcorn = ({ origin }: PopcornProps) => {
  const popcornArray = useMemo(() => [...popcornImg, ...popcorn_eye_Img], []);

  const [fallingImages, setFallingImages] = useState<FallingImage[]>([]);

  useEffect(() => {
    const images = Array.from({ length: 10 }, (_, index) => {
      const randomImage = popcornArray[Math.floor(Math.random() * popcornArray.length)];
      const randomX = (Math.random() - 0.5) * 100; // 시작 위치에서의 X 좌표 오프셋
      const randomDelay = Math.random() * 0.5; // 애니메이션 시작 지연 시간
      const randomDuration = 2 + Math.random() * 3; // 애니메이션 지속 시간 (2초 ~ 5초)
      const finalY = 500 + Math.random() * 20; // 바닥에서의 최종 Y 위치
      return {
        id: index,
        src: randomImage,
        x: randomX,
        delay: randomDelay,
        duration: randomDuration,
        finalY,
      };
    });
    setFallingImages(images);
  }, [popcornArray]);

  return (
    <div className="fixed pointer-events-none" style={{ left: origin.x, top: origin.y }}>
      {fallingImages.map((image) => (
        <Image
          key={image.id}
          src={image.src}
          alt="popcorn"
          width={50}
          height={50}
          className={` animate-fall`}
          style={{
            '--finalY': `${image.finalY}px`, // custom CSS variable
            left: `${image.x}px`,
            top: `0px`,
            animationDuration: `${image.duration}s`,
            animationDelay: `${image.delay}s`,
            animationFillMode: 'forwards',
          } as React.CSSProperties} // Explicitly cast style to React.CSSProperties
        />
      ))}
    </div>
  );
};

'use client'

import Matter from 'matter-js'
import { useEffect, useRef } from 'react'

// 사용할 이미지 경로들
const imagePaths = [
  '/image/santa_popcorn1.svg',
  '/image/santa_popcorn2.svg',
  '/image/santa_popcorn3.svg',
  '/image/santa_popcorn4.svg',
]

// 타입 확장: sprite에 opacity 속성 추가
interface ExtendedSprite extends Matter.IBodyRenderOptionsSprite {
  opacity?: number
}

const SnowfallCanvas = ({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Matter.Engine>()
  const renderRef = useRef<Matter.Render>()
  const worldRef = useRef<Matter.World>()
  const runnerRef = useRef<Matter.Runner>()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Matter.js 엔진 및 월드 생성
    const engine = Matter.Engine.create()
    engine.gravity.y = 0.1 // 중력 값을 작게 설정
    const world = engine.world
    worldRef.current = world
    engineRef.current = engine

    // Matter.js 렌더러 설정
    const render = Matter.Render.create({
      canvas,
      engine,
      options: {
        width: container.clientWidth,
        height: container.clientHeight,
        wireframes: false,
        background: 'transparent',
      },
    })
    renderRef.current = render
    Matter.Render.run(render)

    // Matter.js 러너 생성
    const runner = Matter.Runner.create()
    runnerRef.current = runner
    Matter.Runner.run(runner, engine)

    // 캔버스 크기 조정
    const resizeCanvas = () => {
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
        render.options.width = container.clientWidth
        render.options.height = container.clientHeight
      }
    }
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    // 이미지 로드
    const loadImages = (paths: string[]) => {
      return Promise.all(
        paths.map(
          (path) =>
            new Promise<HTMLImageElement>((resolve, reject) => {
              const img = new Image()
              img.src = path
              img.onload = () => resolve(img)
              img.onerror = () =>
                reject(new Error(`Failed to load image: ${path}`))
            }),
        ),
      )
    }

    // 이미지 추가 함수
    const addSnowflake = (images: HTMLImageElement[]) => {
      const randomImage = images[Math.floor(Math.random() * images.length)]
      const x = Math.random() * container.clientWidth
      const rotation =
        (Math.random() * 15 + 30) * (Math.random() < 0.5 ? -1 : 1)
      const size = Math.random() * 20 + 30 // 눈 크기: 30~50px

      const snowflake = Matter.Bodies.rectangle(x, -50, size, size, {
        angle: (rotation * Math.PI) / 180,
        render: {
          sprite: {
            texture: randomImage.src,
            xScale: size / randomImage.width,
            yScale: size / randomImage.height,
            opacity: 1, // 초기 투명도 설정
          } as ExtendedSprite,
        },
      })

      Matter.World.add(world, snowflake)
    }

    // 눈 생성 간격 제어 함수
    const startSnowflakeInterval = (images: HTMLImageElement[]) => {
      if (intervalRef.current) return // 이미 인터벌이 설정되어 있으면 중복 설정 방지
      intervalRef.current = setInterval(() => addSnowflake(images), 1000) // 1000ms 간격
    }

    const stopSnowflakeInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    // 페이지 가시성 변경 시 눈 생성 간격 제어
    const handleVisibilityChange = (images: HTMLImageElement[]) => {
      if (document.hidden) {
        stopSnowflakeInterval()
      } else {
        startSnowflakeInterval(images)
      }
    }

    // 이미지 로드 후 주기적으로 눈 추가 및 가시성 이벤트 설정
    loadImages(imagePaths)
      .then((images) => {
        startSnowflakeInterval(images)
        document.addEventListener('visibilitychange', () =>
          handleVisibilityChange(images),
        )
      })
      .catch((error) => {
        console.error(error)
      })

    // opacity 및 제거를 메인 업데이트 루프에서 처리
    Matter.Events.on(engine, 'beforeUpdate', () => {
      const maxY = container.clientHeight
      const fadeOutY = maxY * 0.5

      world.bodies.forEach((body) => {
        if (body.position.y > fadeOutY) {
          const sprite = body.render.sprite as ExtendedSprite
          if (sprite && sprite.opacity !== undefined) {
            const opacity = Math.max(
              0,
              1 - (body.position.y - fadeOutY) / (maxY - fadeOutY),
            )
            sprite.opacity = opacity
          }
        }
        if (body.position.y > maxY) {
          Matter.World.remove(world, body)
        }
      })
    })

    // 클린업
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      document.removeEventListener('visibilitychange', () => {})
      Matter.Render.stop(render)
      Matter.Runner.stop(runner)
      Matter.World.clear(world, false)
      Matter.Engine.clear(engine)
      stopSnowflakeInterval()
    }
  }, [containerRef])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute left-0 top-0 z-0 h-full w-full"
    />
  )
}

export default SnowfallCanvas

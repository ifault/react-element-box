import { ReactElement, useEffect, useState } from 'react'
export interface ElementBoxResult {
    elementBox: ReactElement | null
    hoverElement: Element | null
}

export interface UseElementBoxOptions {
    enabled?: boolean
    style?: {
        strokeColor: string
        strokeWidth: number
        dashed: boolean
    }
    defaultMaskColor?: string
}

const useElementBox = ({
    enabled = true,
    style = {
        strokeColor: '#6171fe',
        strokeWidth: 2,
        dashed: true,
    },
    defaultMaskColor = 'rgba(144, 238, 144, 0.1)',
}: UseElementBoxOptions): ElementBoxResult => {
    const [rect, setRect] = useState<DOMRect | null>(null)
    const [hoverElement, setHoverElement] = useState<Element | null>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const target = document.elementFromPoint(e.clientX, e.clientY)
            if (target instanceof Element && target !== hoverElement) {
                setRect(target.getBoundingClientRect())
                setHoverElement(target)
            }
        }

        if (enabled) {
            document.addEventListener('mousemove', handleMouseMove)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
        }
    }, [enabled, hoverElement]) // Dependency on hoverElement added

    const maskColor = enabled && rect ? defaultMaskColor : 'transparent'

    const addLine = (
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        key: string
    ) => (
        <line
            key={key}
            stroke={style.strokeColor}
            strokeWidth={style.strokeWidth}
            strokeDasharray={style.dashed ? '10,10' : 'none'}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
        />
    )

    const elementBox =
        enabled && rect ? (
            <svg
                id="demo-test"
                className="overlay"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 99,
                }}
            >
                <>
                    <rect
                        x={rect.left}
                        y={rect.top}
                        width={rect.width}
                        height={rect.height}
                        fill={maskColor}
                    />
                    {[
                        [0, rect.top, window.innerWidth, rect.top],
                        [0, rect.bottom, window.innerWidth, rect.bottom],
                        [rect.left, 0, rect.left, window.innerHeight],
                        [rect.right, 0, rect.right, window.innerHeight],
                    ].map(([x1, y1, x2, y2], index) =>
                        addLine(x1, y1, x2, y2, `${index}`)
                    )}
                </>
            </svg>
        ) : null

    return { elementBox, hoverElement }
}

export default useElementBox

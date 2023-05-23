import { ClassNames } from '@emotion/react'
import { animate } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

interface CounterProps {
  ClassName?: string
  CounterText: string
  from: number
  to: number
}

function Contador({ from, to, ClassName, CounterText }: any) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controls = animate(from, to, {
      duration: 1.5,
      onUpdate(value) {
        if (!ref.current) return
        ref.current.textContent = value.toFixed(0)
      },
    })
    return () => controls.stop()
  }, [from, to])

  return (
    <div className="flex flex-col">
      <div ref={ref} className={` font-bold ${ClassName}`} />

      <p className="text-sm text-gray-600 font-bold">{CounterText}</p>
    </div>
  )
}

export default function Counter({
  from,
  to,
  ClassName,
  CounterText,
}: CounterProps) {
  return (
    <Contador
      from={from}
      to={to}
      ClassName={ClassName}
      CounterText={CounterText}
    />
  )
}

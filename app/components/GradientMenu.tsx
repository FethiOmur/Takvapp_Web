"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { GiCrossedSwords } from 'react-icons/gi'
import { FaBalanceScale } from 'react-icons/fa'

const menuItems = [
  { title: 'Battle', icon: <GiCrossedSwords />, gradientFrom: '#a955ff', gradientTo: '#ea51ff' },
  { title: 'Comparison', icon: <FaBalanceScale />, gradientFrom: '#56CCF2', gradientTo: '#2F80ED' },
]

export default function GradientMenu() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="flex justify-center items-center">
      <ul className="flex gap-6">
        {menuItems.map(({ title, icon, gradientFrom, gradientTo }, idx) => {
          const isActive = activeIndex === idx
          return (
            <li
              key={idx}
              role="button"
              tabIndex={0}
              onClick={() => setActiveIndex(isActive ? null : idx)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveIndex(isActive ? null : idx)
              }}
              style={{ ['--gradient-from' as any]: gradientFrom, ['--gradient-to' as any]: gradientTo, willChange: 'width', contain: 'content' }}
              className={cn(
                'relative h-[60px] rounded-full flex items-center justify-center overflow-hidden group cursor-pointer',
                // Daha akıcı genişleme (daha uzun süre + ease-out cubic)
                'transition-[width,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] px-4',
                // Filled pill look stays
                'bg-neutral-900/70 border border-white/10 backdrop-blur-sm shadow-sm hover:shadow-md',
                isActive ? 'w-[200px]' : 'w-[60px] hover:w-[200px]'
              )}
            >
              <span
                className={cn(
                  'absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] transform-gpu',
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                )}
              />
              <span
                className={cn(
                  'absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[10px] -z-10 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] transform-gpu',
                  isActive ? 'opacity-50' : 'opacity-0 group-hover:opacity-50'
                )}
              />
              {/* İkon: hover/active sırasında yumuşakça kaybolur (opacity/scale) */}
              <span className={cn('relative z-10 transition-all duration-500 ease-out delay-0 will-change-transform', isActive ? 'opacity-0 scale-90' : 'group-hover:opacity-0 group-hover:scale-90')}>
                <span className="text-2xl text-gray-300 pointer-events-none select-none">{icon}</span>
              </span>
              <span
                className={cn(
                  'absolute z-20 text-white uppercase tracking-wide text-sm font-medium transition-transform duration-500 ease-out',
                  isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'
                )}
              >
                {title}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}



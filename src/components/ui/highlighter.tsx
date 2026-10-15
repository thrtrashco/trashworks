"use client"

import { useLayoutEffect, useRef } from "react"
import type React from "react"
import { useInView } from "motion/react"
import { annotate } from "rough-notation"
import { type RoughAnnotation } from "rough-notation/lib/model"

type AnnotationAction =
  | "highlight"
  | "underline"
  | "box"
  | "circle"
  | "strike-through"
  | "crossed-off"
  | "bracket"

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
  /** Extra delay (ms) before drawing — use to wait for a parent scroll-reveal animation to finish */
  drawDelay?: number
}

export function Highlighter({
  children,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  drawDelay = 0,
}: HighlighterProps) {
  const elementRef = useRef<HTMLSpanElement>(null)

  const isInView = useInView(elementRef, {
    once: true,
    // Use a positive margin so we only trigger once the element is well into view,
    // giving the parent Reveal animation time to start before we draw.
    margin: "0px 0px -60px 0px",
  })

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || isInView

  useLayoutEffect(() => {
    const element = elementRef.current
    let annotation: RoughAnnotation | null = null
    let resizeObserver: ResizeObserver | null = null
    let timer: ReturnType<typeof setTimeout> | null = null

    if (shouldShow && element) {
      const annotationConfig = {
        type: action,
        color,
        strokeWidth,
        animationDuration,
        iterations,
        padding,
        multiline,
      }

      const currentAnnotation = annotate(element, annotationConfig)
      annotation = currentAnnotation

      // Defer drawing by drawDelay so the parent reveal animation finishes first
      timer = setTimeout(() => {
        currentAnnotation.show()

        resizeObserver = new ResizeObserver(() => {
          currentAnnotation.hide()
          currentAnnotation.show()
        })
        resizeObserver.observe(element)
        resizeObserver.observe(document.body)
      }, drawDelay)
    }

    return () => {
      if (timer) clearTimeout(timer)
      annotation?.remove()
      if (resizeObserver) resizeObserver.disconnect()
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    drawDelay,
  ])

  return (
    <span ref={elementRef} className="relative inline-block bg-transparent">
      {children}
    </span>
  )
}

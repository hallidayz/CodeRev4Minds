import * as React from "react"
import { cn } from "@/lib/utils"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config: Record<string, any>
  }
>(({ className, config, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full", className)}
    style={
      {
        "--chart-1": "hsl(12, 76%, 61%)",
        "--chart-2": "hsl(173, 58%, 39%)",
        "--chart-3": "hsl(197, 37%, 24%)",
        "--chart-4": "hsl(43, 74%, 66%)",
        "--chart-5": "hsl(27, 87%, 67%)",
        ...config,
      } as React.CSSProperties
    }
    {...props}
  />
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-background p-2 shadow-md",
      className
    )}
    {...props}
  />
))
ChartTooltip.displayName = "ChartTooltip"

export { ChartContainer, ChartTooltip }

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "../../lib/utils"

// Use Radix's types directly to avoid deprecated React types
const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      // Increased size and border for visibility, add custom class for targeting
      "custom-checkbox peer h-7 w-7 min-h-[1.6em] min-w-[1.6em] rounded border-2 border-blue-600 bg-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
      "data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-white")}
    >
      <Check className="h-5 w-5" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

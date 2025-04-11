// "use client";

// import { useEffect, useState } from "react";

// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { ThemeProviderProps } from "next-themes/dist/types";

// export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     return null;
//   }

//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
// }

/**
 *
 *  TODO: fix hydration error the above method causes a flash before mounted,
 *        below method cuases hydration error
 */
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

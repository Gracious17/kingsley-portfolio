'use client';

import { usePathname } from 'next/navigation';
import ExitIntentHandler from './ExitIntentHandler';

export default function ExitIntentWrapper() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (!isHomePage) return null; // Don't show anything on other pages

  return <ExitIntentHandler />;
}

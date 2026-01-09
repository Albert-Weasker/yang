import { useState, useEffect } from 'react';

interface Breakpoint {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
}

/**
 * 响应式 Hook
 * 基于 Ant Design 的断点系统
 */
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false,
  });

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      setBreakpoint({
        xs: width < 576,
        sm: width >= 576 && width < 768,
        md: width >= 768 && width < 992,
        lg: width >= 992 && width < 1200,
        xl: width >= 1200 && width < 1600,
        xxl: width >= 1600,
      });
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  const isMobile = breakpoint.xs || breakpoint.sm;
  const isTablet = breakpoint.md;
  const isDesktop = breakpoint.lg || breakpoint.xl || breakpoint.xxl;

  return {
    ...breakpoint,
    isMobile,
    isTablet,
    isDesktop,
  };
};

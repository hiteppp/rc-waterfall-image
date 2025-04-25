import { useEffect, useRef } from "react";

// 自定义Hook：处理窗口resize事件
export const useResize = (callback: () => void, delay = 500) => {
  const resizeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(callback, delay);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
    };
  }, [callback, delay]);
};


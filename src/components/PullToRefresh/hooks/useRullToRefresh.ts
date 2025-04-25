import { useEffect, useRef, useState } from 'react';

const MAX_Y = 100;

export const STATUS = {
  START: 'start', // 开始下拉刷新
  AWAIT: 'await', // 释放立即刷新
  LOADING: 'loading', // 正在刷新
  SUCCESS: 'success', // 刷新成功
  FINISH: 'finish', // 完成
};

export const TIPS = {
  [STATUS.START]: '开始下拉刷新',
  [STATUS.AWAIT]: '释放立即刷新',
  [STATUS.LOADING]: '正在刷新',
  [STATUS.SUCCESS]: '刷新成功',
};

export const usePullToRefresh = (onRefresh: () => void) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState(STATUS.FINISH);

  const y = useRef(0);
  useEffect(() => {
    if (!containerRef.current) return () => {};
    containerRef.current.ontouchstart = (e) => {
      console.log('eeeee',e);
      
      e.preventDefault();
      if (document.documentElement.scrollTop === 0) {
        y.current = e.touches[0].pageY;
      }
    };
    containerRef.current.ontouchmove = (e) => {
      e.preventDefault();
      if (document.documentElement.scrollTop === 0) {
        if (e.touches[0].pageY - y.current > MAX_Y) {
          setStatus(STATUS.AWAIT);
          return;
        }
        if (e.touches[0].pageY - y.current > 0) {
          setStatus(STATUS.START);
        }
      }
    };
    return () => {
      if (containerRef.current) {
        containerRef.current.ontouchstart = null;
        containerRef.current.ontouchmove = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return () => {};
    containerRef.current.ontouchend = async (e) => {
      e.preventDefault();
      if (status === STATUS.AWAIT) {
        setStatus(STATUS.LOADING);
        await onRefresh();
        setStatus(STATUS.SUCCESS);
        setTimeout(() => {
          setStatus(STATUS.FINISH);
        }, 500);
        return;
      }
      setStatus(STATUS.FINISH);
    };
    return () => {
      if (containerRef.current) {
        containerRef.current.ontouchend = null;
      }
    };
  }, [status]);

  return {
    status,
    containerRef,
  };
};

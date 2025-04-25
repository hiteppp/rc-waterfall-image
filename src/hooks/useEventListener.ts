import { useEffect } from "react";

// event：这是一个字符串类型的参数，代表要监听的事件名称，例如 'click'、'scroll' 等。
// handler：这是一个函数类型的参数，是事件触发时要执行的回调函数。它可以接收事件对象作为参数，并且可以根据需要处理事件。
// target：这是一个可选参数，默认值是 window 对象。它表示要添加事件监听器的目标元素，
// 可以是 DOM 元素、window 对象或者是一个具有 current 属性的 React 引用（ref）对象。
const useEventListener = (
  event: string,
  handler: (...e: any) => void,
  target: any = window
) => {
  useEffect(() => {
    //这行代码用于确定要添加事件监听器的目标元素。
    //如果 target 对象具有 current 属性（通常是 React 的 ref 对象），则使用 target.current 作为目标元素；否则，使用 window 对象作为目标元素。
    const targetElement = "current" in target ? target.current : window;
    const useEventListener = (event: Event) => {
      return handler(event);
    };
    targetElement.addEventListener(event, useEventListener);
    return () => {
      targetElement.removeEventListener(event, useEventListener);
    };
  }, [event]);
};

export default useEventListener;

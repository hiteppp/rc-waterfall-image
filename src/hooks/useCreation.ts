import { useRef } from "react";
import type { DependencyList } from "react";

const depsAreSame = (
  oldDeps: DependencyList,
  deps: DependencyList
): boolean => {
  if (oldDeps === deps) return true;

  for (let i = 0; i < oldDeps.length; i++) {
    // 判断两个值是否是同一个值
    if (!Object.is(oldDeps[i], deps[i])) return false;
  }

  return true;
};

// useCreation 接受两个参数：
// fn：一个返回值类型为 T 的函数，用于创建需要的值。
// deps：一个依赖项数组，当这些依赖项发生变化时，可能会重新调用 fn 函数创建新的值。
// 使用 useRef 创建一个引用对象，其 current 属性包含三个属性：
// deps：存储当前的依赖项数组。
// obj：存储通过 fn 函数创建的值，初始值为 undefined。
// initialized：一个布尔值，用于标记是否已经初始化，初始值为 false。
// 在组件渲染时，会检查 initialized 状态和依赖项是否发生变化：
// 如果 initialized 为 false（即首次渲染）或者依赖项发生了变化（通过 depsAreSame 函数判断），则更新 deps，
// //调用 fn 函数创建新的值并存储在 obj 中，同时将 initialized 标记为 true。
// 否则，直接复用之前存储在 obj 中的值。
// 最后返回存储在 obj 中的值。

const useCreation = <T>(fn: () => T, deps: DependencyList) => {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });

  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = fn();
    current.initialized = true;
  }

  return current.obj as T;
};

export default useCreation;

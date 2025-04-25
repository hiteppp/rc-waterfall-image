export function thorttle(fn: Function, wait: number) {
  let timer: any;
  return function () {
    //@ts-ignore
    let _this = this;
    let args = arguments;

    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        fn.apply(_this, args);
      }, wait);
    }
  };
}

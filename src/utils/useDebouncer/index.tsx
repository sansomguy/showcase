import { $, implicit$FirstArg, type QRL, useSignal } from "@builder.io/qwik";

export const useDebouncerQrl = (
  fn: QRL<(args: any) => void>,
  delay: number
) => {
  const timeoutId = useSignal<number>();

  const cleanUp = $(() => {
    clearTimeout(timeoutId.value);
  });
  return $((args: any) => {
    cleanUp();
    timeoutId.value = Number(setTimeout(() => fn(args), delay));
    return cleanUp;
  });
};

export const useDebouncer$ = implicit$FirstArg(useDebouncerQrl);

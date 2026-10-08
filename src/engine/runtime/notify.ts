/** Calls one subscriber; its error is logged and does not stop the others. */
export function notify<A extends unknown[]>(listener: (...args: A) => void, ...args: A): void {
  try {
    listener(...args);
  } catch (error) {
    console.error(error);
  }
}

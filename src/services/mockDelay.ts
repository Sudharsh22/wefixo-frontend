export const mockDelay = (ms = 300) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

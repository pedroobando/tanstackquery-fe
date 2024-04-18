export const sleep = (seconds: number): Promise<boolean> => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

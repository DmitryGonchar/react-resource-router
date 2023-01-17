import type { Loader } from '../../types';

export const combine = (...args: Loader[]): Loader => {
  return loaderArgs => {
    const loaders = args.map(loader => loader(loaderArgs));

    return {
      load: loadParams => {
        return loaders.reduce(
          (accumulator, loader) => ({
            ...accumulator,
            ...loader.load(loadParams),
          }),
          {}
        );
      },
      prefetch: prefetchParams => {
        return loaders.reduce(
          (accumulator, loader) => ({
            ...accumulator,
            ...loader.prefetch(prefetchParams),
          }),
          {}
        );
      },
    };
  };
};

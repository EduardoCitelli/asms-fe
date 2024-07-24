type NameOf<T> = {
  [K in keyof T]: K;
};

/**
 * Use to get the name of the properties from one interface
 * @returns names of the properties
 */
export function nameofFactory<T>(): NameOf<T> {
  return new Proxy<NameOf<T>>({} as NameOf<T>, {
    get: (target, prop) => prop
  });
}

export type Result<T, E = Error> = Ok<T, E> | Err<T, E>;

export class Ok<T, E> {
  readonly _tag: 'Ok' = 'Ok';
  constructor(readonly value: T) { }

  isOk(): this is Ok<T, E> {
    return true;
  }

  isErr(): this is Err<T, E> {
    return false;
  }

  map<U>(fn: (value: T) => U): Result<U, E> {
    return new Ok(fn(this.value));
  }

  mapErr<F>(_fn: (error: E) => F): Result<T, F> {
    return new Ok(this.value);
  }

  andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    return fn(this.value);
  }

  unwrap(): T {
    return this.value;
  }

  unwrapOr(_defaultValue: T): T {
    return this.value;
  }

  unwrapErr(): never {
    throw new Error('Called unwrapErr on Ok value');
  }
}

export class Err<T, E> {
  readonly _tag: 'Err' = 'Err';
  constructor(readonly error: E) { }

  isOk(): this is Ok<T, E> {
    return false;
  }

  isErr(): this is Err<T, E> {
    return true;
  }

  map<U>(_fn: (value: T) => U): Result<U, E> {
    return new Err(this.error);
  }

  mapErr<F>(fn: (error: E) => F): Result<T, F> {
    return new Err(fn(this.error));
  }

  andThen<U>(_fn: (value: T) => Result<U, E>): Result<U, E> {
    return new Err(this.error);
  }

  unwrap(): never {
    throw new Error('Called unwrap on Err value');
  }

  unwrapOr(defaultValue: T): T {
    return defaultValue;
  }

  unwrapErr(): E {
    return this.error;
  }
}

// Helper functions to create Result instances
export const ok = <T, E = Error>(value: T): Result<T, E> => new Ok(value);
export const err = <T, E = Error>(error: E): Result<T, E> => new Err(error);

// Utility function to wrap a function that might throw into a Result
export const tryFn = <T>(fn: () => T): Result<T, Error> => {
  try {
    return ok(fn());
  } catch (error) {
    return err(error instanceof Error ? error : new Error(String(error)));
  }
};

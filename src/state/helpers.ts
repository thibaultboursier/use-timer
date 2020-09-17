export function createActionType<T extends string>(type: T): { type: T };

export function createActionType<T extends string, P extends unknown>(
  type: T,
  payload: P
): { type: T; payload: P };

export function createActionType(type: string, payload?: unknown) {
  return { type, payload };
}

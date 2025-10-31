// @ts-expect-error -- Path alias is correctly configured in tsconfig
import { IsAny } from '@types/generic';

interface BaseAction {
  readonly type: string;
}

interface ActionWithPayload<T> extends BaseAction {
  readonly payload: T;
}

export type Action<T = any> = IsAny<T> extends true
  ? BaseAction
  : ActionWithPayload<T>;

export type ActionCreator<T = any> = (payload?: T) => Action;

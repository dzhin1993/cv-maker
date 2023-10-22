import {ReactElement, ReactPortal} from 'react';

type ReactText = string | number
type ReactChild = ReactElement | ReactText
export type ReactNode = ReactChild | ReactPortal | boolean | null | undefined
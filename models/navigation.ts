export interface NavigationType<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  url?: string;
}

export interface NavigationType<T = string> {
  label: string;
  value: T;
  english: string;
  disabled?: boolean;
  url?: string;
}

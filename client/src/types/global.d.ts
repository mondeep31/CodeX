interface Window {
  editor?: {
    getValue: () => string;
    setValue: (value: string) => void;
  };
}

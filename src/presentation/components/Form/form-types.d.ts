export interface FormParams {
  input: InputProps[];
  onSubmit: (value: any) => void;
  children?: React.ReactNode;
}

export type InputProps = {
  placeholder?: string;
  required: boolean;
  type: string;
  name: string;
  label: string;
  errors?: string;
  display?: "flex" | "grid";
  gridCols?: string | number | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

  gridGap?: string | number | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  grouped: boolean;
  group?: InputProps[];
  min?: number;
  max?: number;
  class?: any;
  options?: OptionsProps[];
};
type OptionsProps = {
  value: string | number | readonly string[] | undefined;
  label: string;
};

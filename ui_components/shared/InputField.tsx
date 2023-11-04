import { Input } from "@/components/ui/input";

import { ChangeEvent, FC } from "react";

export interface IInputFieldProps {
  type: string;
  className?: string;
  inputClassName?: string;
  id: string;

  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | ReadonlyArray<string> | number | undefined;
}
const InputField: FC<IInputFieldProps> = ({
  type,
  className,
  id,

  placeholder,
  inputClassName,
  value,
  onChange,
}: IInputFieldProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <Input
        className={inputClassName}
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;

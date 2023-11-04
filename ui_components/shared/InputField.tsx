import { Input } from "@/components/ui/input";
import { icons } from "@/utils/images";
import Image from "next/image";

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
    <div className={`flex flex-col gap-2 relative ${className ?? ""}`}>
      <Image
        className="absolute left-4 top-1/2 -translate-y-1/2"
        src={icons.search}
        alt="search"
      />
      <Input
        className={"pl-10"}
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

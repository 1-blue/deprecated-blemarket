import { UseFormRegisterReturn } from "react-hook-form";

// util
import { combineClassNames } from "@src/libs/client/util";

interface IProps {
  register: UseFormRegisterReturn;
  placeholder?: string;
  className?: string;
  [props: string]: any;
}

const Textarea = ({ register, placeholder, className, ...props }: IProps) => {
  return (
    <textarea
      {...props}
      {...register}
      placeholder={placeholder}
      className={combineClassNames(
        "appearance-none w-full border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-orange-500 focus:ring-0 placeholder:text-sm",
        className ? className : ""
      )}
    />
  );
};

export default Textarea;
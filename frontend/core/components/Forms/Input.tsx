import { InputHTMLAttributes, useState } from "react";

interface Props {
  value: string;
  setValue: any;
}

export const Input = ({ value, setValue }: Props) => {
  const handleInputAmount = (amount: string) => {
    if (/^\d+$/.test(amount)) setValue(amount);
    else console.log("please use numbers");
  };
  return (
    <input
      placeholder="Amount"
      className="relative w-2/3 bg-primary/50 border border-text/25 text-text rounded-md shadow-sm px-2 py-2 text-left cursor-default focus:outline-none focus:ring-1  sm:text-sm placeholder:text-text/30"
      value={value}
      onChange={(e) => handleInputAmount(e.target.value)}
    />
  );
};

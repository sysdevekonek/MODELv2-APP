// src/utils/formStyles.ts

export const inputBase =
  "w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none placeholder:text-xs";

export const inputNormal =
  `${inputBase} bg-inputField1 border-inputField2 focus:ring-2 focus:ring-mainDef3 focus:border-transparent text-bodytext2 placeholder:subtext placeholder:font-titleFont`;

export const inputError =
  `${inputNormal} border-red-500 ring-1 ring-red-500`;

export const errorText =
  "text-xs text-red-500 mt-1";

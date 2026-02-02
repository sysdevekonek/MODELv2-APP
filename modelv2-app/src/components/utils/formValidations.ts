export type ValidationResult = {
  valid: boolean;
  message?: string;
};

export const requiredField = (value: string, fieldName = "This field"): ValidationResult => {
  if (!value || !value.trim()) {
    return { valid: false, message: `${fieldName} is required.` };
  }
  return { valid: true };
};

export const maxLength = (value: string, length: number, fieldName = "This field"): ValidationResult => {
  if (value && value.length > length) {
    return { valid: false, message: `${fieldName} cannot exceed ${length} characters.` };
  }
  return { valid: true };
};

export const emailFormat = (value: string): ValidationResult => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && !regex.test(value)) {
    return { valid: false, message: "Invalid email address format." };
  }
  return { valid: true };
};

// Example: combine multiple validators
export const validateField = (value: string, validators: ((val: string) => ValidationResult)[]) => {
  for (const validator of validators) {
    const result = validator(value);
    if (!result.valid) return result;
  }
  return { valid: true };
};

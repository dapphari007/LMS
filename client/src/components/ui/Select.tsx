import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  fullWidth?: boolean;
  placeholder?: string;
  isLoading?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, options, error, fullWidth = true, className = "", isLoading = false, ...props },
    ref
  ) => {
    const selectClasses = `
      block rounded-md border ${error ? "border-red-500" : "border-gray-300"} 
      px-3 py-2 text-gray-900
      focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
      disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500
      ${fullWidth ? "w-full" : ""}
      ${isLoading ? "animate-pulse bg-gray-100" : ""}
      ${className}
    `;

    return (
      <div className={fullWidth ? "w-full" : ""}>
        {label && (
          <div className="flex justify-between">
            <label
              htmlFor={props.id}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
            </label>
            {isLoading && (
              <span className="text-xs text-gray-500">Loading...</span>
            )}
          </div>
        )}
        <div className="relative">
          <select 
            ref={ref} 
            className={selectClasses} 
            disabled={isLoading || props.disabled}
            {...props}
          >
            {props.placeholder && (
              <option value="" disabled>
                {props.placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;

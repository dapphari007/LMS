import { ChangeEvent } from 'react';

interface CheckboxProps {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

const Checkbox = ({
  id,
  name,
  label,
  checked = false,
  onChange,
  disabled = false,
  className = '',
}: CheckboxProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
      />
      <label
        htmlFor={id}
        className={`ml-2 block text-sm font-medium ${
          disabled ? 'text-gray-400' : 'text-gray-700'
        } cursor-pointer`}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
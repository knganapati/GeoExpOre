import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  options: RadioOption[];
  error?: string;
  helperText?: string;
  containerClassName?: string;
  onChange: (value: string) => void;
  value: string;
}

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ 
    className, 
    label, 
    options, 
    error, 
    helperText, 
    containerClassName,
    onChange,
    value,
    name,
    ...props 
  }, ref) => {
    return (
      <div className={cn('mb-4', containerClassName)}>
        {label && (
          <p className="block text-sm font-medium text-gray-700 mb-2">{label}</p>
        )}
        
        <div className="space-y-2">
          {options.map((option) => (
            <label 
              key={option.value} 
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className={cn(
                  'h-4 w-4 text-primary focus:ring-primary-500 border-gray-300',
                  error ? 'border-red-300' : '',
                  className
                )}
                ref={option.value === options[0].value ? ref : undefined}
                {...props}
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
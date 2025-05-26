import { ReactNode } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

export interface AlertProps {
  variant?: "success" | "warning" | "error" | "info";
  type?: "success" | "warning" | "error" | "info"; // For backward compatibility
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
  action?: ReactNode;
}

const Alert = ({
  variant = "info",
  type,
  title,
  message,
  onClose,
  className = "",
  action,
}: AlertProps) => {
  // Use type prop if variant is not provided (for backward compatibility)
  const actualVariant = type || variant;
  const variantClasses = {
    success: "bg-green-50 text-green-800",
    warning: "bg-yellow-50 text-yellow-800",
    error: "bg-red-50 text-red-800",
    info: "bg-blue-50 text-blue-800",
  };

  const variantIcons = {
    success: (
      <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
    ),
    warning: (
      <ExclamationTriangleIcon
        className="h-5 w-5 text-yellow-400"
        aria-hidden="true"
      />
    ),
    error: <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />,
    info: (
      <InformationCircleIcon
        className="h-5 w-5 text-blue-400"
        aria-hidden="true"
      />
    ),
  };

  return (
    <div className={`rounded-md p-4 ${variantClasses[actualVariant]} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">{variantIcons[actualVariant]}</div>
        <div className="ml-3">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className="text-sm">
            <p>{message}</p>
          </div>
          {action && (
            <div className="mt-2">
              {action}
            </div>
          )}
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${
                    actualVariant === "success"
                      ? "bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50"
                      : ""
                  }
                  ${
                    actualVariant === "warning"
                      ? "bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50"
                      : ""
                  }
                  ${
                    actualVariant === "error"
                      ? "bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50"
                      : ""
                  }
                  ${
                    actualVariant === "info"
                      ? "bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50"
                      : ""
                  }
                `}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;

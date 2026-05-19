import { cn } from '../../lib/utils';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

const Alert = ({ type = 'info', message, className, onClose }) => {
  const styles = {
    success: 'border-green-200 bg-green-50 text-green-800',
    error: 'border-red-200 bg-red-50 text-red-700',
    info: 'border-blue-200 bg-blue-50 text-blue-800',
    warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  };

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 flex-shrink-0" />,
    error: <AlertCircle className="h-5 w-5 flex-shrink-0" />,
    info: <Info className="h-5 w-5 flex-shrink-0" />,
    warning: <AlertCircle className="h-5 w-5 flex-shrink-0" />,
  };

  if (!message) return null;

  return (
    <div className={cn('flex items-start gap-3 rounded-lg border p-4 text-sm', styles[type], className)}>
      {icons[type]}
      <p className="flex-1">{message}</p>
      {onClose && (
        <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100" aria-label="Fermer">
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;

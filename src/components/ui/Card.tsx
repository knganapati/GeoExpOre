import { cn } from '../../lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 shadow-card overflow-hidden', className)}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  className?: string;
  children: ReactNode;
}

const CardHeader = ({ className, children }: CardHeaderProps) => {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-100 bg-gray-50', className)}>
      {children}
    </div>
  );
};

interface CardTitleProps {
  className?: string;
  children: ReactNode;
}

const CardTitle = ({ className, children }: CardTitleProps) => {
  return <h3 className={cn('text-lg font-semibold text-gray-900', className)}>{children}</h3>;
};

interface CardDescriptionProps {
  className?: string;
  children: ReactNode;
}

const CardDescription = ({ className, children }: CardDescriptionProps) => {
  return <p className={cn('text-sm text-gray-500 mt-1', className)}>{children}</p>;
};

interface CardContentProps {
  className?: string;
  children: ReactNode;
}

const CardContent = ({ className, children }: CardContentProps) => {
  return <div className={cn('p-6', className)}>{children}</div>;
};

interface CardFooterProps {
  className?: string;
  children: ReactNode;
}

const CardFooter = ({ className, children }: CardFooterProps) => {
  return (
    <div className={cn('px-6 py-4 border-t border-gray-100 bg-gray-50', className)}>
      {children}
    </div>
  );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
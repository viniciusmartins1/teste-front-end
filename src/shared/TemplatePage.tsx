import type { ReactNode } from 'react';

type TemplatePageProps = {
  children: ReactNode;
};

const TemplatePage = ({ children }: TemplatePageProps) => {
  return (
    <div className="w-full flex justify-center relative scroll-smooth">
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col gap-16">{children}</div>
    </div>
  );
};

export default TemplatePage;

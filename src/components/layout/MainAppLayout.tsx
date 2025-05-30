import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import Header from './Header';

interface MainAppLayoutProps {
  children: React.ReactNode;
  rightSidebarContent?: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  rightSidebarContent,
  className,
}) => {
  return (
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      <Header />
      <Sidebar />
      
      {/* Content wrapper: positions content to the right of the Sidebar */}
      <div className="pl-[280px]">
        {/* Scrollable viewport: positions content below the Header and handles scrolling */}
        {/* h-screen makes it viewport height, pt-[60px] offsets for header, overflow-y-auto enables scroll */}
        <div className="h-screen pt-[60px] overflow-y-auto">
          <div className="flex h-full">
            {/* Main content area */}
            {/* flex-grow allows it to take available space. min-w-0 prevents flex item overflow. */}
            {/* p-6 for padding as per mainContent.layout requirement. */}
            <main className="flex-grow min-w-0 p-6">
              {/* mainContent.container requirement: "flex flex-col gap-6" */}
              <div className="flex flex-col gap-6">
                {children}
              </div>
            </main>

            {/* Right Sidebar area */}
            {rightSidebarContent && (
              // w-[330px] as per rightSidebar.sizing. flex-shrink-0 prevents shrinking.
              // border-l for separation. bg-card (surface) as per rightSidebar.layout.
              <aside className="w-[330px] flex-shrink-0 border-l border-border bg-card">
                {/* h-full to take parent's height. p-4 for padding as per rightSidebar.layout. overflow-y-auto for its own content scroll. */}
                <div className="h-full p-4 overflow-y-auto">
                  {/* rightSidebar.layout requirement: "flex flex-col gap-4" */}
                  <div className="flex flex-col gap-4">
                    {rightSidebarContent}
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainAppLayout;

import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageCircle,
  PlaySquare,
  Store,
  Users,
  Flag,
  CalendarDays,
  ChevronDown,
  // PlusCircle, // Not used in this version of sidebar section headings
  Settings2, // Placeholder for ... (More options) is actually MoreHorizontal in context
  Newspaper, // For News Feed
  // UserCircle2, // For Olenna Mason (profile) - Avatar is used
  HelpCircle, // For Fundraisers (placeholder)
  Gamepad2, // For FarmVille 2
  MoreHorizontal // For generic 'more' or options, and footer
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  isActive?: boolean;
  action?: () => void;
}

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const user = {
    name: 'Olenna Mason',
    avatarUrl: 'https://i.pravatar.cc/40?u=olennamason', // Placeholder
  };

  const mainNavItems: NavItem[] = [
    { id: 'newsFeed', label: 'News Feed', icon: Newspaper, href: '/', isActive: true },
    { id: 'messenger', label: 'Messenger', icon: MessageCircle, href: '/messenger' },
    { id: 'watch', label: 'Watch', icon: PlaySquare, href: '/watch' },
    { id: 'marketplace', label: 'Marketplace', icon: Store, href: '/marketplace' },
  ];

  const shortcuts: NavItem[] = [
    { id: 'farmville', label: 'FarmVille 2', icon: Gamepad2, href: '/games/farmville' },
  ];

  const exploreItemsInitial: NavItem[] = [
    { id: 'events', label: 'Events', icon: CalendarDays, href: '/events' },
    { id: 'pages', label: 'Pages', icon: Flag, href: '/pages' },
    { id: 'groups', label: 'Groups', icon: Users, href: '/groups' },
    { id: 'friendLists', label: 'Friend Lists', icon: Users, href: '/friends/lists' }, 
    { id: 'fundraisers', label: 'Fundraisers', icon: HelpCircle, href: '/fundraisers' }, 
  ];
  
  const exploreItemsExtra: NavItem[] = [
    { id: 'memories', label: 'Memories', icon: MoreHorizontal, href: '/memories' },
    { id: 'saved', label: 'Saved', icon: MoreHorizontal, href: '/saved' },
  ];

  const createItems: { id: string; label: string; action: () => void; }[] = [
      { id: 'ad', label: 'Ad', action: () => console.log('Create Ad') },
      { id: 'page', label: 'Page', action: () => console.log('Create Page') },
      { id: 'group', label: 'Group', action: () => console.log('Create Group') },
      { id: 'event', label: 'Event', action: () => console.log('Create Event') },
      { id: 'fundraiserCreate', label: 'Fundraiser', action: () => console.log('Create Fundraiser') },
  ];

  const [showMoreExplore, setShowMoreExplore] = React.useState<boolean>(false);
  const allExploreItems = [...exploreItemsInitial, ...exploreItemsExtra];

  return (
    <aside 
      className={cn(
        "w-[280px] bg-sidebar text-sidebar-foreground fixed top-0 left-0 h-screen flex flex-col pt-[60px] border-r border-sidebar-border", 
        className
      )}
    >
      <ScrollArea className="flex-grow">
        <nav className="p-2 space-y-1">
          {/* Profile Link */} 
          <Button variant="ghost" className="w-full justify-start h-auto py-2 px-3 mb-1 hover:bg-sidebar-accent focus-visible:ring-sidebar-ring">
            <Avatar className="h-7 w-7 mr-3">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm text-sidebar-foreground">{user.name}</span>
          </Button>

          {/* Main Navigation */} 
          {mainNavItems.map((item) => (
              <Button
                key={item.id}
                variant={'ghost'}
                className={cn(
                  "w-full justify-start h-auto py-2 px-3 text-sm hover:bg-sidebar-accent focus-visible:ring-sidebar-ring",
                  item.isActive ? "bg-sidebar-accent text-sidebar-primary font-semibold" : "text-sidebar-foreground"
                )}
                onClick={item.action || (() => { if(item.href) console.log(`Navigating to ${item.href}`)})}
              >
                <item.icon className={cn("h-5 w-5 mr-3", item.isActive ? "text-sidebar-primary" : "text-sidebar-primary")} />
                {item.label}
                {item.label === 'News Feed' && <MoreHorizontal className="ml-auto h-4 w-4 text-muted-foreground" />}
              </Button>
          ))}

          <Separator className="my-2 bg-sidebar-border" />

          {/* Shortcuts */} 
          <div className="px-1 py-2">
            <h2 className="mb-1 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shortcuts</h2>
            {shortcuts.length > 0 ? shortcuts.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start h-auto py-2 px-3 text-sm text-sidebar-foreground hover:bg-sidebar-accent focus-visible:ring-sidebar-ring"
                onClick={item.action || (() => { if(item.href) console.log(`Navigating to ${item.href}`)})}
              >
                <item.icon className="h-5 w-5 mr-3 text-sidebar-foreground" />
                {item.label}
              </Button>
            )) : <p className='px-3 text-xs text-muted-foreground'>No shortcuts yet.</p>}
          </div>

          <Separator className="my-2 bg-sidebar-border" />

          {/* Explore */} 
          <div className="px-1 py-2">
            <h2 className="mb-1 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Explore</h2>
            {(showMoreExplore ? allExploreItems : exploreItemsInitial).map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start h-auto py-2 px-3 text-sm text-sidebar-foreground hover:bg-sidebar-accent focus-visible:ring-sidebar-ring"
                onClick={item.action || (() => { if(item.href) console.log(`Navigating to ${item.href}`)})}
              >
                <item.icon className="h-5 w-5 mr-3 text-sidebar-foreground" />
                {item.label}
              </Button>
            ))}
            {exploreItemsExtra.length > 0 && (
              <Button
                variant="ghost"
                className="w-full justify-start h-auto py-2 px-3 text-sm text-sidebar-foreground hover:bg-sidebar-accent focus-visible:ring-sidebar-ring"
                onClick={() => setShowMoreExplore(!showMoreExplore)}
              >
                <ChevronDown className={cn("h-5 w-5 mr-3 transition-transform", showMoreExplore && "rotate-180")} />
                {showMoreExplore ? 'See Less' : 'See More...'}
              </Button>
            )}
          </div>
          
          <Separator className="my-2 bg-sidebar-border" />

          {/* Create */} 
          <div className="px-3 py-2">
            <h2 className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Create</h2>
            <div className="flex flex-wrap gap-x-2 gap-y-1">
              {createItems.map((item) => (
                <Button
                  key={item.id}
                  variant="link"
                  className="text-xs text-muted-foreground hover:text-primary p-0 h-auto hover:no-underline focus-visible:ring-sidebar-ring"
                  onClick={item.action}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>

        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-sidebar-border text-xs text-muted-foreground">
        Privacy · Terms · Advertising · Ad Choices{' '}
        <MoreHorizontal className="inline h-3 w-3 mx-0.5" /> Cookies ·{' '}
        Meta © {new Date().getFullYear()}
      </div>
    </aside>
  );
};

export default Sidebar;

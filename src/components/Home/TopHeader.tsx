import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Home,
  Users, // For Find Friends & Groups icon in middle nav
  MessageCircle, // For Messenger icon in header
  Bell, // For Notifications
  Settings, // For Settings & Privacy
  LogOut, // For Log Out
  Facebook, // Facebook 'f' logo
  ChevronDown, // Used as a generic dropdown trigger icon
  HelpCircle, // For Help & Support
  Moon, // For Dark Mode toggle example
  Sun, // For Light Mode toggle example
  ShieldCheck // For Privacy Checkup example
} from 'lucide-react';

interface TopHeaderProps {
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ className }) => {
  const user = {
    name: 'Olenna Mason',
    avatarUrl: 'https://i.pravatar.cc/40?u=olennamason', // Placeholder avatar
  };
  // Example theme state, in a real app this would come from context or a store
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light'); 

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    // In a real app: document.documentElement.classList.toggle('dark');
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-[60px] bg-card border-b border-border shadow-sm",
        className
      )}
    >
      {/* Left Section: Logo and Search */} 
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-primary rounded-full hover:bg-accent focus-visible:ring-ring">
          <Facebook className="h-10 w-10 fill-primary" />
        </Button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Facebook"
            className="pl-10 pr-4 py-2 h-10 w-[240px] rounded-full bg-secondary/70 border-none focus-visible:ring-primary focus-visible:ring-2"
          />
        </div>
      </div>

      {/* Middle Section: Navigation Tabs (Simplified, showing active state) */} 
      <nav className="hidden lg:flex items-center h-full">
        <Button variant="ghost" className="flex-col h-full px-8 text-primary hover:bg-accent rounded-none border-b-2 border-primary focus-visible:ring-0">
          <Home className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Button>
        <Button variant="ghost" className="flex-col h-full px-8 text-muted-foreground hover:text-primary hover:bg-accent rounded-none focus-visible:ring-0">
          <Users className="h-6 w-6" />
          <span className="sr-only">Friends</span>
        </Button>
        {/* Add other middle navigation icons like Watch, Marketplace, Groups similarly */}
      </nav>

      {/* Right Section: Actions and Profile */} 
      <div className="flex items-center gap-1">
        <Button variant="ghost" className="rounded-full px-3 py-1.5 text-sm font-medium hover:bg-accent hidden xl:flex items-center gap-1.5 text-foreground focus-visible:ring-ring">
            <Avatar className="h-7 w-7">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.substring(0,1)}</AvatarFallback>
            </Avatar>
            {user.name.split(' ')[0]} {/* Display first name */}
        </Button>
        {/* The image shows "Home" and "Find Friends" as text links here, these are typically part of middle nav */} 
        {/* Icon buttons for core actions */} 
        <Button variant="ghost" size="icon" className="relative rounded-full bg-secondary/70 hover:bg-accent text-foreground focus-visible:ring-ring">
          <MessageCircle className="h-5 w-5" />
          <span className="sr-only">Messenger</span>
           <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">8</span>
        </Button>
        <Button variant="ghost" size="icon" className="relative rounded-full bg-secondary/70 hover:bg-accent text-foreground focus-visible:ring-ring">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold">36</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full bg-secondary/70 hover:bg-accent text-foreground focus-visible:ring-ring">
              <ChevronDown className="h-5 w-5" />
              <span className="sr-only">Account Controls</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="p-0">
                <div className="flex items-center gap-3 p-3 hover:bg-accent rounded-t-md cursor-pointer">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-base">{user.name}</p>
                        <p className="text-xs text-muted-foreground">See your profile</p>
                    </div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings & Privacy</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleTheme}>
                  {theme === 'light' ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
                  <span>Display & Accessibility ({theme === 'light' ? 'Dark' : 'Light'} Mode)</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  <span>Privacy Checkup</span>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-700 dark:text-red-500 dark:focus:bg-red-700 dark:focus:text-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;

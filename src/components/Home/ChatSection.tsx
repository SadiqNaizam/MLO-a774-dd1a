import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  MessageSquarePlus, 
  Settings2, 
  Users, 
  Search,
  Minus, 
  X, 
  MoreHorizontal, 
  Dot, 
  Phone,
  Video,
  Paperclip, // Attachment icon
  Smile // Emoji icon
} from 'lucide-react';

interface ChatUser {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: string;
}

interface ActiveChat {
  user: ChatUser;
  messages: ChatMessage[];
  minimized: boolean;
}

interface ChatSectionProps {
  className?: string;
}

const MAX_ACTIVE_CHAT_WINDOWS = 3;
const CHAT_WINDOW_WIDTH = 320;
const CHAT_WINDOW_MINIMIZED_WIDTH = 220;
const CHAT_WINDOW_SPACING = 12;
const CHAT_CONTACT_LIST_WIDTH = 280;

const ChatSection: React.FC<ChatSectionProps> = ({ className }) => {
  const [contacts, setContacts] = React.useState<ChatUser[]>([
    { id: 'user1', name: 'Alice Wonderland', avatarUrl: 'https://i.pravatar.cc/40?u=alice', isOnline: true, lastMessage: 'Hey there! How are you?', lastMessageTime: '10:30 AM', unreadCount: 2 },
    { id: 'user2', name: 'Bob The Builder', avatarUrl: 'https://i.pravatar.cc/40?u=bob', isOnline: false, lastMessage: 'Can we fix it? Yes we can!', lastMessageTime: 'Yesterday' },
    { id: 'user3', name: 'Charlie Brown', avatarUrl: 'https://i.pravatar.cc/40?u=charlie', isOnline: true, lastMessage: 'Good grief. Peanuts anyone?', lastMessageTime: '9:15 AM' },
    { id: 'user4', name: 'Diana Prince', avatarUrl: 'https://i.pravatar.cc/40?u=diana', isOnline: true, lastMessage: 'Saving the world, brb.', lastMessageTime: 'Mon' },
    { id: 'user5', name: 'Edward Scissorhands', avatarUrl: 'https://i.pravatar.cc/40?u=edward', isOnline: false, lastMessage: 'Just trimming the hedges.', lastMessageTime: 'Sun' },
  ]);
  const [activeChats, setActiveChats] = React.useState<ActiveChat[]>([]);
  const [isChatListOpen, setIsChatListOpen] = React.useState<boolean>(false);
  const [searchTerm, setSearchTerm] = React.useState<string>('');

  const openChat = (user: ChatUser) => {
    const existingChatIndex = activeChats.findIndex(chat => chat.user.id === user.id);
    if (existingChatIndex !== -1) {
      // Chat exists, bring to front and unminimize if needed
      const updatedChats = [...activeChats];
      const chatToMove = updatedChats.splice(existingChatIndex, 1)[0];
      chatToMove.minimized = false;
      setActiveChats([chatToMove, ...updatedChats]);
    } else {
      // New chat
      let updatedChats = [...activeChats];
      if (updatedChats.length >= MAX_ACTIVE_CHAT_WINDOWS) {
        updatedChats = updatedChats.slice(0, MAX_ACTIVE_CHAT_WINDOWS - 1); // Remove the oldest chat
      }
      const newChat: ActiveChat = {
        user,
        messages: [
          {id: Date.now().toString(), text: `Started chat with ${user.name}`, sender: 'them', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        ],
        minimized: false,
      };
      setActiveChats([newChat, ...updatedChats]);
    }
    setIsChatListOpen(false);
  };

  const toggleMinimizeChat = (userId: string) => {
    setActiveChats(prev => prev.map(chat => chat.user.id === userId ? { ...chat, minimized: !chat.minimized } : chat));
  };

  const closeChat = (userId: string) => {
    setActiveChats(prev => prev.filter(chat => chat.user.id !== userId));
  };

  const sendMessage = (userId: string, text: string) => {
    const newMessage: ChatMessage = { 
        id: Date.now().toString(), 
        text, 
        sender: 'me' as const, 
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    };
    setActiveChats(prev => prev.map(ac => ac.user.id === userId ? {...ac, messages: [...ac.messages, newMessage]} : ac));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const onlineContactsCount = contacts.filter(c => c.isOnline).length;

  // Calculate offset for chat windows based on open chat list panel
  const chatWindowsRightOffset = isChatListOpen ? CHAT_CONTACT_LIST_WIDTH + 20 : 20;

  return (
    <>
      {/* Active Chat Windows */} 
      <div className={cn("fixed bottom-0 flex flex-row-reverse items-end z-[60] pointer-events-none", className)} style={{ right: `${chatWindowsRightOffset}px` }}>
        {activeChats.map((chat, index) => (
          <div
            key={chat.user.id}
            className={cn(
              "bg-card shadow-xl rounded-t-lg flex flex-col transition-all duration-200 ease-in-out pointer-events-auto border border-b-0 border-border",
              index > 0 && "ml-3" // For spacing between chat windows
            )}
            style={{
                width: chat.minimized ? `${CHAT_WINDOW_MINIMIZED_WIDTH}px` : `${CHAT_WINDOW_WIDTH}px`,
                height: chat.minimized ? '48px' : '400px',
            }}
          >
            <div
              className="flex items-center justify-between p-2 h-[48px] border-b border-border bg-muted/30 cursor-pointer hover:bg-muted/50"
              onClick={() => toggleMinimizeChat(chat.user.id)}
            >
              <div className="flex items-center gap-2 truncate">
                <Avatar className="h-7 w-7 flex-shrink-0">
                  <AvatarImage src={chat.user.avatarUrl} alt={chat.user.name} />
                  <AvatarFallback>{chat.user.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground truncate" title={chat.user.name}>{chat.user.name}</span>
                {chat.user.isOnline && <Dot className="h-6 w-6 text-green-500 -ml-2 flex-shrink-0" />}
              </div>
              <div className="flex items-center flex-shrink-0">
                {!chat.minimized && (
                    <>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={(e) => {e.stopPropagation(); console.log("Video call");}}><Video className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={(e) => {e.stopPropagation(); console.log("Audio call");}}><Phone className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={(e) => {e.stopPropagation(); toggleMinimizeChat(chat.user.id);}}><Minus className="h-4 w-4" /></Button>
                    </>
                )}
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={(e) => {e.stopPropagation(); closeChat(chat.user.id);}}><X className="h-4 w-4" /></Button>
              </div>
            </div>
            {!chat.minimized && (
              <>
                <ScrollArea className="flex-grow p-3 space-y-3 bg-card">
                  {chat.messages.map(msg => (
                    <div key={msg.id} className={cn("flex mb-1", msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                      <div className={cn("p-2.5 rounded-lg max-w-[80%] shadow-sm", msg.sender === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none')}>
                        <p className="text-sm leading-snug">{msg.text}</p>
                        <p className="text-[10px] opacity-80 mt-1 text-right">{msg.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
                <div className="p-2 border-t border-border bg-muted/30 flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Smile className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary"><Paperclip className="h-5 w-5" /></Button>
                    <Input 
                        type="text" placeholder="Type a message..." 
                        className="flex-grow h-9 border-border focus-visible:ring-primary bg-card"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                                sendMessage(chat.user.id, e.currentTarget.value.trim());
                                e.currentTarget.value = '';
                            }
                        }}
                    />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Main Chat Toggle Button and Panel */} 
      <div className="fixed bottom-0 right-4 z-[70]">
        {/* Minimized chat bubbles when list is closed */} 
        {!isChatListOpen && activeChats.length > 0 && (
            <div className="flex flex-row-reverse items-end mb-2 mr-[70px]">
            {activeChats.filter(c => c.minimized).slice(0,3).map(chat => (
                <Avatar
                    key={`bubble-${chat.user.id}`}
                    className="h-10 w-10 border-2 border-card shadow-lg cursor-pointer -ml-3 hover:z-10 transform hover:scale-110 transition-transform bg-muted"
                    onClick={() => openChat(chat.user)}
                    title={chat.user.name}
                >
                    <AvatarImage src={chat.user.avatarUrl} alt={chat.user.name}/>
                    <AvatarFallback>{chat.user.name.substring(0,1)}</AvatarFallback>
                    {chat.user.isOnline && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-card" />} 
                </Avatar>
            ))}
            </div>
        )}

        <Button
          variant="default"
          className="rounded-full h-12 w-auto px-4 shadow-lg bg-card text-foreground hover:bg-accent border border-border focus-visible:ring-ring"
          onClick={() => setIsChatListOpen(!isChatListOpen)}
        >
          <MessageSquarePlus className="h-5 w-5 mr-2" />
          Chat ({onlineContactsCount})
        </Button>

        {isChatListOpen && (
          <Card className={cn("absolute bottom-[60px] right-0 shadow-xl flex flex-col bg-card border border-border", `w-[${CHAT_CONTACT_LIST_WIDTH}px] h-[450px]`)}>
            <CardHeader className="p-3 border-b border-border">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg text-foreground">Chat</h3>
                <div className="flex items-center gap-0.5">
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground"><Users className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground"><Settings2 className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => setIsChatListOpen(false)}><X className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                <Input
                    type="search"
                    placeholder="Search Messenger"
                    className="h-9 pl-9 bg-secondary/50 border-border focus-visible:ring-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <ScrollArea className="flex-grow">
              <CardContent className="p-1.5">
                {filteredContacts.map((contact) => (
                  <Button
                    key={contact.id}
                    variant="ghost"
                    className="w-full justify-start h-auto py-2 px-2 mb-0.5 hover:bg-accent rounded-md focus-visible:ring-ring"
                    onClick={() => openChat(contact)}
                  >
                    <div className="relative mr-3 flex-shrink-0">
                        <Avatar className="h-9 w-9">
                        <AvatarImage src={contact.avatarUrl} alt={contact.name} />
                        <AvatarFallback>{contact.name.substring(0, 1)}</AvatarFallback>
                        </Avatar>
                        {contact.isOnline && (
                            <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-card" />
                        )}
                    </div>
                    <div className="flex-grow text-left overflow-hidden">
                        <span className="text-sm font-medium text-foreground block truncate">{contact.name}</span>
                        {contact.lastMessage && <p className={cn("text-xs truncate", contact.unreadCount ? 'text-foreground font-medium' : 'text-muted-foreground' )}>{contact.lastMessage}</p>}
                    </div>
                    {contact.unreadCount && contact.unreadCount > 0 && (
                        <span className="ml-2 text-xs bg-primary text-primary-foreground rounded-full h-4 w-4 flex items-center justify-center flex-shrink-0">
                            {contact.unreadCount}
                        </span>
                    )}
                    {!contact.unreadCount && contact.lastMessageTime && <span className='ml-2 text-[10px] text-muted-foreground flex-shrink-0'>{contact.lastMessageTime}</span>}
                  </Button>
                ))}
                {filteredContacts.length === 0 && <p className='text-center text-sm text-muted-foreground py-4'>No contacts found.</p>}
              </CardContent>
            </ScrollArea>
          </Card>
        )}
      </div>
    </>
  );
};

export default ChatSection;

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, X } from 'lucide-react';

interface GroupSuggestion {
  id: string;
  name: string;
  members: number;
  imageUrl: string;
  mutualFriendsAvatars?: string[];
}

interface SuggestedGroupsProps {
  className?: string;
}

const SuggestedGroups: React.FC<SuggestedGroupsProps> = ({ className }) => {
  const initialGroups: GroupSuggestion[] = [
    {
      id: 'group1',
      name: 'Mad Men (MADdicts)',
      members: 6195,
      imageUrl: 'https://placehold.co/300x100/E0B0FF/4A235A?text=Mad+Men&font=raleway',
      mutualFriendsAvatars: [
        'https://i.pravatar.cc/20?u=mfriend1',
        'https://i.pravatar.cc/20?u=mfriend2',
        'https://i.pravatar.cc/20?u=mfriend3',
        'https://i.pravatar.cc/20?u=mfriend4',
        'https://i.pravatar.cc/20?u=mfriend5',
      ]
    },
    {
      id: 'group2',
      name: 'Dexter Morgan Fans Club',
      members: 6984,
      imageUrl: 'https://placehold.co/300x100/FFB0B0/78281F?text=Dexter&font=lato',
       mutualFriendsAvatars: [
        'https://i.pravatar.cc/20?u=mfriend6',
        'https://i.pravatar.cc/20?u=mfriend7',
        'https://i.pravatar.cc/20?u=mfriend8',
      ]
    },
    {
      id: 'group3',
      name: 'React Developers Worldwide',
      members: 12050,
      imageUrl: 'https://placehold.co/300x100/A9D0F5/154360?text=React+Devs&font=montserrat',
    },
  ];

  const [groups, setGroups] = React.useState<GroupSuggestion[]>(initialGroups);

  const handleDismiss = (groupId: string) => {
    setGroups(prevGroups => prevGroups.filter(group => group.id !== groupId));
  };

  const handleJoin = (groupId: string) => {
    console.log(`Joining group ${groupId}`);
    // Here you might want to update the button to "Joined" or remove the group
    // For simplicity, we'll just log it.
  };

  if (groups.length === 0) {
    return (
        <Card className={cn("w-full shadow-default bg-card", className)}>
            <CardHeader className="p-4 pb-2">
                 <CardTitle className="text-base font-semibold text-foreground">Suggested Groups</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2 text-sm text-muted-foreground">
                No more group suggestions for now.
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className={cn("w-full shadow-default bg-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
        <CardTitle className="text-base font-semibold text-foreground">Suggested Groups</CardTitle>
        <Button variant="link" className="text-xs text-primary p-0 h-auto hover:underline focus-visible:ring-ring">
          See All
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        {groups.map((group) => (
          <div key={group.id} className="border border-border rounded-lg shadow-sm overflow-hidden bg-background/30">
            <div className="relative">
                <img src={group.imageUrl} alt={group.name} className="w-full h-[70px] object-cover" />
                {group.mutualFriendsAvatars && group.mutualFriendsAvatars.length > 0 && (
                    <div className="absolute bottom-1.5 left-1.5 flex -space-x-1.5">
                        {group.mutualFriendsAvatars.slice(0,5).map((avatarUrl, index) => (
                            <Avatar key={index} className="h-5 w-5 border-2 border-card">
                                <AvatarImage src={avatarUrl} alt={`Friend ${index+1}`} />
                                <AvatarFallback>{index+1}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                )}
                <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6 bg-black/40 hover:bg-black/60 text-white rounded-full focus-visible:ring-ring" onClick={() => handleDismiss(group.id)}>
                    <X className="h-3.5 w-3.5" />
                    <span className="sr-only">Dismiss {group.name}</span>
                </Button>
            </div>
            <div className="p-3">
              <a href="#" className="text-sm font-semibold text-foreground hover:underline block truncate" title={group.name}>{group.name}</a>
              <p className="text-xs text-muted-foreground mb-2.5">{group.members.toLocaleString()} members</p>
              <Button variant="secondary" size="sm" className="w-full focus-visible:ring-ring" onClick={() => handleJoin(group.id)}>
                <Plus className="h-4 w-4 mr-1.5" /> Join Group
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuggestedGroups;

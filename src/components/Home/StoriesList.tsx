import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { PlusCircle, Settings, History, X } from 'lucide-react';

interface Story {
  id: string;
  userName: string;
  avatarUrl: string;
  storyImageUrl: string; 
  isViewed?: boolean;
}

interface StoriesListProps {
  className?: string;
}

const StoriesList: React.FC<StoriesListProps> = ({ className }) => {
  const storiesData: Story[] = [
    { id: 's1', userName: 'Alice Wonderland', avatarUrl: 'https://i.pravatar.cc/60?u=alice', storyImageUrl: 'https://picsum.photos/seed/story_alice/400/700', isViewed: false },
    { id: 's2', userName: 'Bob The Builder', avatarUrl: 'https://i.pravatar.cc/60?u=bob', storyImageUrl: 'https://picsum.photos/seed/story_bob/400/700', isViewed: true },
    { id: 's3', userName: 'Charlie Brown', avatarUrl: 'https://i.pravatar.cc/60?u=charlie', storyImageUrl: 'https://picsum.photos/seed/story_charlie/400/700', isViewed: false },
    { id: 's4', userName: 'Diana Prince', avatarUrl: 'https://i.pravatar.cc/60?u=diana', storyImageUrl: 'https://picsum.photos/seed/story_diana/400/700', isViewed: false },
  ];

  const [activeStory, setActiveStory] = React.useState<Story | null>(null);

  return (
    <>
      <Card className={cn("w-full shadow-default bg-card", className)}>
        <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
          <CardTitle className="text-base font-semibold text-foreground">Stories</CardTitle>
          <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:bg-accent p-1.5 focus-visible:ring-ring">
                  <History className="h-4 w-4 mr-1" /> Archive
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:bg-accent p-1.5 focus-visible:ring-ring">
                  <Settings className="h-4 w-4 mr-1" /> Settings
              </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="mb-3">
              <Button variant="outline" className="w-full justify-start h-auto py-3 border-border hover:bg-accent focus-visible:ring-ring">
                  <div className="flex items-center gap-3">
                      <div className="bg-secondary rounded-full p-2.5 text-primary">
                          <PlusCircle className="h-5 w-5" />
                      </div>
                      <div>
                          <p className="font-medium text-sm text-foreground">Add to Your Story</p>
                          <p className="text-xs text-muted-foreground">Share a photo, video or write something</p>
                      </div>
                  </div>
              </Button>
          </div>
          <div className="space-y-2.5">
            {storiesData.map((story) => (
              <button
                key={story.id}
                className="flex items-center w-full gap-3 p-1.5 rounded-md hover:bg-accent focus-visible:ring-ring focus-visible:outline-none"
                onClick={() => setActiveStory(story)}
              >
                <Avatar className={cn("h-10 w-10 border-2 flex-shrink-0", story.isViewed ? "border-muted" : "border-primary")}>
                  <AvatarImage src={story.avatarUrl} alt={story.userName} />
                  <AvatarFallback>{story.userName.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground truncate">{story.userName}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {activeStory && (
        <Dialog open={!!activeStory} onOpenChange={(isOpen) => !isOpen && setActiveStory(null)}>
          <DialogContent className="p-0 max-w-md w-full bg-black border-none !rounded-lg overflow-hidden aspect-[9/16]">
            <img src={activeStory.storyImageUrl} alt={`${activeStory.userName}'s story`} className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border-2 border-white">
                        <AvatarImage src={activeStory.avatarUrl} alt={activeStory.userName} />
                        <AvatarFallback>{activeStory.userName.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <p className="text-white text-sm font-semibold">{activeStory.userName}</p>
                </div>
            </div>
            <DialogClose asChild>
                <Button variant="ghost" size="icon" className="absolute top-3 right-3 text-white hover:bg-black/50 rounded-full h-8 w-8">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close story</span>
                </Button>
            </DialogClose>
            {/* Add story navigation (prev/next) and progress bars here for a full experience */} 
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default StoriesList;

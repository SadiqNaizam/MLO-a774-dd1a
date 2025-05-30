import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ThumbsUp, MessageSquare, Share2, MoreHorizontal, Globe, Users, Lock, Pencil, Trash2, Bookmark, MapPin, Tag } from 'lucide-react';

type PostAudience = 'public' | 'friends' | 'only_me';

interface PostAction {
  id: string;
  label: string;
  icon: React.ElementType;
  action?: () => void;
  count?: number;
}

interface PostAuthor {
  name: string;
  avatarUrl: string;
  profileUrl?: string;
}

interface PostMedia {
  type: 'image' | 'video' | 'map' | 'album';
  url: string;
  alt?: string;
  urls?: string[]; // For album type
}

interface PostCardProps {
  id: string;
  author: PostAuthor;
  timestamp: string; 
  content?: string;
  media?: PostMedia[];
  audience?: PostAudience;
  location?: string;
  taggedFriends?: string[];
  likesCount?: number;
  commentsCount?: number;
  sharesCount?: number;
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  author,
  timestamp,
  content,
  media,
  audience = 'public' as const,
  location,
  taggedFriends,
  likesCount = 0,
  commentsCount = 0,
  sharesCount = 0,
  className,
}) => {
  const getAudienceIcon = (audienceType: PostAudience) => {
    if (audienceType === 'friends') return <Users className="h-3.5 w-3.5 text-muted-foreground" />;
    if (audienceType === 'only_me') return <Lock className="h-3.5 w-3.5 text-muted-foreground" />;
    return <Globe className="h-3.5 w-3.5 text-muted-foreground" />;
  };

  const postActions: PostAction[] = [
    { id: 'like', label: 'Like', icon: ThumbsUp, count: likesCount },
    { id: 'comment', label: 'Comment', icon: MessageSquare, count: commentsCount },
    { id: 'share', label: 'Share', icon: Share2, count: sharesCount },
  ];

  // Example data for location details, if map media type is present
  const mapLocationDetails = {
    city: 'Raleigh, North Carolina',
    country: 'United States',
    checkIns: 'Bryan Durand and 2 others have been here'
  };

  return (
    <Card className={cn("w-full shadow-default bg-card", className)}>
      <CardHeader className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={author.avatarUrl} alt={author.name} />
            <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex flex-wrap items-baseline">
                <a href={author.profileUrl || '#'} className="font-semibold text-sm text-foreground hover:underline mr-1">
                {author.name}
                </a>
                {location && <span className="text-sm text-muted-foreground">is in <a href="#" className="font-medium text-foreground hover:underline">{location}</a></span>}
            </div>
            <div className="flex items-center text-xs text-muted-foreground mt-0.5">
              <span>{timestamp}</span>
              <span className="mx-1">·</span>
              {getAudienceIcon(audience)}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-muted-foreground hover:bg-accent focus-visible:ring-ring">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Bookmark className="mr-2 h-4 w-4" /> Save Post</DropdownMenuItem>
              <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" /> Edit Post</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      { (content || (taggedFriends && taggedFriends.length > 0)) && (
        <CardContent className="px-4 pb-3 pt-0">
          {content && <p className="text-sm text-foreground mb-2 whitespace-pre-wrap leading-relaxed">{content}</p>}
          {taggedFriends && taggedFriends.length > 0 && (
            <p className="text-sm text-muted-foreground flex items-center">
              <Tag className="h-4 w-4 mr-1 text-muted-foreground"/> with <a href="#" className="font-medium text-foreground hover:underline mx-1">{taggedFriends[0]}</a>
              {taggedFriends.length > 1 && ` and ${taggedFriends.length -1} ${taggedFriends.length - 1 === 1 ? 'other' : 'others'}`}
              .
            </p>
          )}
        </CardContent>
      )}
      
      {media && media.length > 0 && (
        <CardContent className="p-0">
          {media.map((item, index) => (
            item.type === 'image' || item.type === 'map' ? (
              <img key={index} src={item.url} alt={item.alt || 'Post media'} className="w-full max-h-[500px] object-cover border-y border-border" />
            ) : item.type === 'video' ? (
              <video key={index} src={item.url} controls className="w-full max-h-[500px] border-y border-border" />
            ) : null // Handle 'album' or other types later
          ))}
           {media.some(m => m.type === 'map') && location && (
             <div className="p-4 border-t border-border flex items-center justify-between bg-background/50">
                <div>
                    <p className="font-semibold text-sm text-foreground">{mapLocationDetails.city}</p>
                    <p className="text-xs text-muted-foreground">{mapLocationDetails.country}</p>
                    <p className="text-xs text-muted-foreground mt-1">{mapLocationDetails.checkIns}</p>
                </div>
                <Button variant="secondary" size="sm" className="focus-visible:ring-ring">
                    <MapPin className="h-4 w-4 mr-1.5" /> Save
                </Button>
             </div>
           )}
        </CardContent>
      )}

      {(likesCount > 0 || commentsCount > 0 || sharesCount > 0) && (
        <div className="px-4 py-2 flex justify-between items-center text-xs text-muted-foreground border-t border-border">
            <span className="hover:underline cursor-pointer">{likesCount > 0 ? `${likesCount} ${likesCount === 1 ? 'Like' : 'Likes'}` : ''}</span>
            <div className="flex gap-2">
                {commentsCount > 0 && <span className="hover:underline cursor-pointer">{commentsCount} {commentsCount === 1 ? 'Comment' : 'Comments'}</span>}
                {sharesCount > 0 && <span className="hover:underline cursor-pointer">{sharesCount} {sharesCount === 1 ? 'Share' : 'Shares'}</span>}
            </div>
        </div>
      )}

      <CardFooter className="p-1 border-t border-border">
        <div className="flex w-full justify-around">
          {postActions.map((action) => (
            <Button
              key={action.id}
              variant="ghost"
              className="flex-1 text-muted-foreground hover:bg-accent hover:text-primary py-2.5 focus-visible:ring-ring"
              onClick={action.action || (() => console.log(`${action.label} clicked`))}
            >
              <action.icon className="h-5 w-5 mr-1.5" />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;

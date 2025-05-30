import React from 'react';
import MainAppLayout from '../../components/layout/MainAppLayout';
import PostCard, { PostCardProps } from '../../components/Home/PostCard'; // Assuming PostCardProps is exported from PostCard.tsx
import StoriesList from '../../components/Home/StoriesList';
import SuggestedGroups from '../../components/Home/SuggestedGroups';
import ChatSection from '../../components/Home/ChatSection';

// Shadcn UI components for "Create Post" section
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Lucide icons for "Create Post" section
import { MenuSquare, Image as ImageIconLucide, UserPlus, MoreHorizontal } from 'lucide-react';

// Define dummy data for posts
const postsData: PostCardProps[] = [
  {
    id: 'post1',
    author: { name: 'Julia Fillory', avatarUrl: 'https://i.pravatar.cc/40?u=juliafillory', profileUrl: '#' },
    timestamp: '2 hrs ago',
    content: 'Checking out some new stores downtown!',
    location: 'Raleigh, North Carolina',
    media: [
      { type: 'map' as const, url: 'https://maps.googleapis.com/maps/api/staticmap?center=Raleigh,NC&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7CRaleigh,NC&key=YOUR_API_KEY', alt: 'Map of Raleigh showing a location pin. Replace YOUR_API_KEY with a Google Maps API Key or use a placeholder image.' }
      // Placeholder image if API key is not available:
      // { type: 'map' as const, url: 'https://placehold.co/600x300/e8e8e8/aaaaaa?text=Map+of+Raleigh', alt: 'Map of Raleigh' }
    ],
    audience: 'friends' as const,
    likesCount: 152,
    commentsCount: 18,
    sharesCount: 7,
  },
  {
    id: 'post2',
    author: { name: 'Alex Chen', avatarUrl: 'https://i.pravatar.cc/40?u=alexchen', profileUrl: '#' },
    timestamp: '5 hrs ago',
    content: 'Just enjoyed a beautiful sunset by the beach! 🌅 Highly recommend this spot. The waves were perfect and the sky was breathtaking. #sunset #beachlife #travel #naturephotography',
    media: [
      { type: 'image' as const, url: 'https://picsum.photos/seed/beachsunset/600/400', alt: 'Beach sunset with orange and purple sky' }
    ],
    audience: 'public' as const,
    likesCount: 280,
    commentsCount: 45,
    sharesCount: 22,
    taggedFriends: ['Olenna Mason', 'Bryan Durand']
  },
  {
    id: 'post3',
    author: { name: 'Tech Updates Daily', avatarUrl: 'https://i.pravatar.cc/40?u=techupdates', profileUrl: '#' },
    timestamp: 'Yesterday at 8:00 PM',
    content: `🚀 Big news in the world of AI! A new model has been released that claims to outperform GPT-4 in several creative writing benchmarks. \n\nKey features include:\n- Enhanced contextual understanding\n- More coherent long-form generation\n- Reduced biases\n\nThey are planning a public beta next month. Can't wait to try it out! What are your thoughts? Will this be a game-changer? 🤖 #AI #TechNews #Innovation #FutureTech`,
    audience: 'public' as const,
    likesCount: 1024,
    commentsCount: 150,
    sharesCount: 98,
  },
  {
    id: 'post4',
    author: { name: 'Foodie Adventures', avatarUrl: 'https://i.pravatar.cc/40?u=foodieadv', profileUrl: '#' },
    timestamp: '3 days ago',
    content: 'Had an amazing culinary tour today! Check out some of the delicious dishes we tried. 🍜🍣🍰 Which one would you pick? My favorite was definitely the ramen!\n1. Tonkotsu Ramen\n2. Assorted Sushi Platter\n3. New York Cheesecake',
    media: [
      { type: 'image' as const, url: 'https://picsum.photos/seed/ramen/600/400', alt: 'Delicious bowl of Tonkotsu Ramen' },
      { type: 'image' as const, url: 'https://picsum.photos/seed/sushi/600/400', alt: 'Colorful assorted sushi platter' },
      { type: 'image' as const, url: 'https://picsum.photos/seed/cheesecake/600/400', alt: 'Slice of New York cheesecake with strawberry topping' }
    ],
    audience: 'friends' as const,
    likesCount: 312,
    commentsCount: 78,
    sharesCount: 30,
  }
];

const CreatePostSection: React.FC = () => {
  const user = {
    name: 'Olenna Mason',
    avatarUrl: 'https://i.pravatar.cc/40?u=olennamason',
  };

  return (
    <Card className="shadow-default bg-card">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <Button
            variant="ghost" // Changed from outline to ghost to better match common UI patterns for this element.
            className="flex-grow justify-start text-left h-10 rounded-full bg-secondary/50 hover:bg-secondary/70 px-4 text-muted-foreground text-sm sm:text-base"
            onClick={() => console.log('Open create post modal')}
          >
            What's on your mind, {user.name.split(' ')[0]}?
          </Button>
        </div>
        <Separator className="mb-3 bg-border" />
        <div className="flex justify-around items-center -mx-1 sm:-mx-2">
          <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-accent hover:text-primary focus-visible:ring-ring py-2 px-1 sm:px-3">
            <MenuSquare className="h-5 w-5 mr-1.5 sm:mr-2 text-red-500" />
            <span className="font-medium text-xs sm:text-sm">List</span>
          </Button>
          <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-accent hover:text-primary focus-visible:ring-ring py-2 px-1 sm:px-3">
            <ImageIconLucide className="h-5 w-5 mr-1.5 sm:mr-2 text-green-500" />
            <span className="font-medium text-xs sm:text-sm">Photo/Video</span>
          </Button>
          <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-accent hover:text-primary focus-visible:ring-ring py-2 px-1 sm:px-3">
            <UserPlus className="h-5 w-5 mr-1.5 sm:mr-2 text-blue-500" />
            <span className="font-medium text-xs sm:text-sm">Tag Friends</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-accent hover:text-primary focus-visible:ring-ring h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 ml-1 sm:ml-0">
            <MoreHorizontal className="h-5 w-5" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const HomePage: React.FC = () => {
  const rightSidebarContent = (
    <>
      <StoriesList />
      <SuggestedGroups />
    </>
  );

  return (
    <>
      <MainAppLayout rightSidebarContent={rightSidebarContent}>
        {/* Main content area for the feed */}
        <CreatePostSection />
        {postsData.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </MainAppLayout>
      <ChatSection />
    </>
  );
};

export default HomePage;

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export default async function Prefix() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'} className="rounded-full px-2">
            Vet
            <Avatar className="size-6">
              <AvatarImage
                src={
                  'https://images.unsplash.com/photo-1733621770053-9b1a5f433a8c'
                }
              />
              <AvatarFallback>LB</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <Link href={'/'}>
            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

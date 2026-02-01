import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogoutButtonProps {
  onLogout: () => void;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onLogout}
      className="text-muted-foreground hover:text-foreground"
    >
      <LogOut className="w-4 h-4" />
      <span className="hidden sm:inline ml-2">Esci</span>
    </Button>
  );
}

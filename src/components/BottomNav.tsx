// Mobile Bottom Navigation
import { Home, Wallet, CreditCard, FileText, User } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/client/dashboard' },
  { icon: Wallet, label: 'Accounts', path: '/client/accounts' },
  { icon: CreditCard, label: 'Loans', path: '/client/loans' },
  { icon: FileText, label: 'Requests', path: '/client/requests' },
  { icon: User, label: 'Profile', path: '/client/profile' },
];

export function BottomNav() {
  return (
    <nav className="mobile-nav md:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors text-muted-foreground"
            activeClassName="text-primary bg-primary/10"
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
      {/* Safe area padding for iOS */}
      <div className="h-safe-area-inset-bottom" />
    </nav>
  );
}

export default BottomNav;

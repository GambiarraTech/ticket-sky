import SideMenu from '@/components/admin/SideMenu';
import { useContext} from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function Admin() {
  const { user } = useContext(AuthContext)
  return <SideMenu>vai se fuder {user?.nome}</SideMenu>;

}

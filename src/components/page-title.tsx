import { Badge } from '@/components/ui/badge';
import { useLocation, useMatches } from 'react-router';

type LoaderData = {
  count: number;
  title: string;
};

export default function PageTitle() {
  const { pathname } = useLocation();
  const matches = useMatches();
  const match = matches.find((m) => m.pathname === pathname);

  if (!match) return null;

  const data = match.data as LoaderData;

  return (
    <span className="flex items-center gap-2">
      <span>{data.title}</span>
      {data.count !== undefined && (
        <Badge variant="secondary">{data.count.toLocaleString()}</Badge>
      )}
    </span>
  );
}

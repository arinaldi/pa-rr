import type { ForwardRefExoticComponent, SVGAttributes } from 'react';

import type { Database } from '@/supabase/db-types';

export type Album = Database['public']['Tables']['albums']['Row'];
export type Ranking = Database['public']['Tables']['rankings']['Row'];
export type Release = Database['public']['Tables']['releases']['Row'];
export type Song = Database['public']['Tables']['songs']['Row'];

export type Callback = () => void;

interface IconProps extends SVGAttributes<SVGElement> {
  children?: never;
  color?: string;
}

export type Icon = ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

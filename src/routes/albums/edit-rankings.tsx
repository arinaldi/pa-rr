import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import { Reorder } from 'framer-motion';

import SubmitButton from '@/components/submit-button';
import { useRankingsByYear } from '@/hooks/use-data';
import { ROUTE_HREF } from '@/lib/constants';
import { parseQuery } from '@/lib/utils';
import { supabase } from '@/supabase/client';
import AlbumCard from './album-card';
import type { AllTimeListItem } from '@/lib/formatters';

export default function EditRankings() {
  const params = useParams();
  const year = parseQuery(params.year);
  const { data } = useRankingsByYear(year);

  return data?.favorites ? (
    <Content favorites={data.favorites} year={year} />
  ) : null;
}

interface Props {
  favorites: AllTimeListItem[];
  year: string;
}

function Content({ favorites, year }: Props) {
  const navigate = useNavigate();
  const [items, setItems] = useState(
    favorites.sort((a, b) => {
      if (a.ranking > b.ranking) return 1;
      if (a.ranking < b.ranking) return -1;
      return 0;
    }),
  );

  const { isPending, mutate } = useMutation({
    meta: {
      successMessage: 'Rankings successfully edited',
    },
    mutationFn: async () => {
      const rankings = items.map((item, index) => ({
        id: item.id,
        position: index + 1,
      }));
      const positions = rankings.map((r) => r.position);
      const positionsSet = new Set(positions);

      if (positionsSet.size !== favorites.length) {
        throw new Error('Rankings must be unique');
      }

      const input = rankings.map((r) => ({
        album_id: r.id,
        position: r.position,
        year,
      }));
      const { error } = await supabase
        .from('rankings')
        .upsert(input, { onConflict: 'album_id' });

      if (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      navigate(`${ROUTE_HREF.TOP_ALBUMS}#${year}`);
    },
  });

  return (
    <form
      className="max-w-md space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        mutate();
      }}
    >
      <Reorder.Group axis="y" onReorder={setItems} values={items}>
        <div className="space-y-2">
          {items.map((item, index) => (
            <AlbumCard key={item.id} item={item} position={index + 1} />
          ))}
        </div>
      </Reorder.Group>
      <SubmitButton className="w-full sm:w-auto" submitting={isPending}>
        Save
      </SubmitButton>
    </form>
  );
}

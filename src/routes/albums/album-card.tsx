import { Reorder, useDragControls } from 'framer-motion';
import { Grip } from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { type AllTimeListItem } from '@/lib/formatters';
import RemoveAllTimeRankingModal from './remove-ranking-modal';

interface Props {
  item: AllTimeListItem;
  position: number;
  removeItem?: (id: number) => void;
}

export default function AlbumCard({ item, position, removeItem }: Props) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      dragControls={controls}
      dragListener={false}
      key={item.id}
      value={item}
    >
      <Card className="py-0 transition-shadow has-[svg:active]:shadow-lg">
        <CardHeader className="p-4 select-none">
          <div className="flex items-start justify-between gap-2">
            <CardTitle>
              {position}. {item.title}
            </CardTitle>
            <Grip
              className="size-4 shrink-0 touch-none hover:cursor-grab active:cursor-grabbing"
              onPointerDown={(event) => controls.start(event)}
            />
          </div>
          <CardDescription className="flex items-center gap-0.5">
            {item.artist}
            {removeItem && (
              <RemoveAllTimeRankingModal item={item} removeItem={removeItem} />
            )}
          </CardDescription>
        </CardHeader>
      </Card>
    </Reorder.Item>
  );
}

import { Reorder, useDragControls } from 'motion/react';
import { GripVertical } from 'lucide-react';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/ui/item';
import { type AllTimeListItem } from '@/lib/formatters';
import RemoveAllTimeRankingModal from './remove-ranking-modal';

interface Props {
  item: AllTimeListItem;
  position: number;
  removeItem?: (id: number) => void;
}

export default function AlbumItem({ item, position, removeItem }: Props) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      dragControls={controls}
      dragListener={false}
      key={item.id}
      value={item}
    >
      <Item
        className="bg-card transition-shadow has-[svg:active]:shadow-md"
        variant="outline"
      >
        <ItemContent className="select-none">
          <ItemTitle>
            {position}. {item.title}
            {removeItem && (
              <RemoveAllTimeRankingModal item={item} removeItem={removeItem} />
            )}
          </ItemTitle>
          <ItemDescription>{item.artist}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <GripVertical
            className="size-4 shrink-0 touch-none hover:cursor-grab active:cursor-grabbing"
            onPointerDown={(event) => controls.start(event)}
          />
        </ItemActions>
      </Item>
    </Reorder.Item>
  );
}

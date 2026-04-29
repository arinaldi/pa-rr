import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { wait } from '@/lib/utils';

interface Props {
  value: string;
}

export function CopyButton({ value }: Props) {
  const [status, setStatus] = useState<'idle' | 'copied'>('idle');

  async function onClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    navigator.clipboard.writeText(value);
    setStatus('copied');
    await wait(1000);
    setStatus('idle');
  }

  return (
    <Button
      className="relative overflow-hidden rounded-full text-muted-foreground"
      disabled={status === 'copied'}
      onClick={onClick}
      size="icon-xs"
      variant="ghost"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={status}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-1"
          exit={{ opacity: 0, y: 15 }}
          initial={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.075 }}
        >
          {status === 'copied' && (
            <motion.span
              animate={{ scale: 1 }}
              className="size-fit"
              initial={{ scale: 0 }}
              transition={{ delay: 0.075, type: 'spring' }}
            >
              <Check />
            </motion.span>
          )}

          {status === 'idle' && <Copy />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}

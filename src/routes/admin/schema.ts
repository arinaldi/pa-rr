import { z } from 'zod';

export const albumSchema = z.object({
  artist: z.string().min(1).max(128),
  title: z.string().min(1).max(128),
  year: z.number().gte(1900).lte(2100),
  studio: z.boolean(),
  cd: z.boolean(),
  wishlist: z.boolean(),
  favorite: z.boolean(),
});

export type AlbumInput = z.infer<typeof albumSchema>;

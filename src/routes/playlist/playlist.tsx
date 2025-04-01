import AppLayout from '@/components/app-layout';

export default function Playlist() {
  return (
    <AppLayout title="Playlist">
      <a
        className="hover:text-muted-foreground underline underline-offset-4"
        href="https://open.spotify.com/playlist/3NAIQcUEkwKXu2eHaZBQrg"
        rel="noopener noreferrer"
        target="_blank"
      >
        Spotify
      </a>
    </AppLayout>
  );
}

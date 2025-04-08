import { Link2OffIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-sm">
      <div className="flex w-full flex-col items-center justify-center rounded-md border border-dashed p-6 text-center sm:w-auto sm:min-w-[400px]">
        <Link2OffIcon className="text-muted-foreground size-10" />
        <h1 className="mt-4 text-4xl font-semibold">404</h1>
        <p className="text-muted-foreground mt-2 text-base">Page not found</p>
      </div>
    </div>
  );
}

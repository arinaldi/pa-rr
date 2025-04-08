import SubmitButton from '@/components/submit-button';
import useBufferedData from '@/hooks/use-buffered-data';

export default function LoadMore() {
  const { data, hasError, stale, update } = useBufferedData();

  if (!data) return <p>Loading...</p>;
  if (hasError) return <p>Error</p>;

  return (
    <div className="space-y-4">
      <SubmitButton
        disabled={!stale}
        onClick={update}
        type="button"
        variant="outline"
      >
        Load more
      </SubmitButton>
      <ul className="ml-3.5 list-disc space-y-1 text-sm">
        {data.map((quote: string, index: number) => (
          <li key={index}>{quote}</li>
        ))}
      </ul>
    </div>
  );
}

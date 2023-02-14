import { Suspense } from "react";
export function LazyLoader(props: any) {
  return (
    <Suspense fallback={<div>Loading...</div>}>{props.component}</Suspense>
  );
}

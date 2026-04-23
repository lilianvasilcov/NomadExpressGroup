import { Suspense } from 'react';
import { metadata } from './metadata';
import ApplyContent from './ApplyContent';

export { metadata };

export default function ApplyPage() {
  return (
    <Suspense>
      <ApplyContent />
    </Suspense>
  );
}

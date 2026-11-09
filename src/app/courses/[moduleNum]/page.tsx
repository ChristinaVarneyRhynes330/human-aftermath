import { redirect } from 'next/navigation';
import { getCurriculum } from '@/lib/content-fallback';

export default async function ModuleRedirect({ params }: { params: Promise<{ moduleNum: string }> }) {
  const { moduleNum } = await params;
  const num = parseInt(moduleNum, 10);
  const curriculum = getCurriculum();
  const mod = curriculum.find((m: any) => m.num === num);
  const firstSlug = mod?.lessons?.[0]?.slug || `m${num}_l1`;
  redirect(`/courses/${num}/${firstSlug}`);
}

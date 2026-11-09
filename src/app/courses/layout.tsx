import React from 'react';
import CourseSidebar from '@/components/CourseSidebar';
import { getCurriculum } from '@/lib/content-fallback';

export default function CoursesLayout({ children }: { children: React.ReactNode }) {
  const curriculum = getCurriculum().map((m: any) => ({
    num: m.num,
    title: m.title,
    lessons: (m.lessons || []).map((l: any) => ({
      slug: l.slug,
      title: l.title,
    })),
  }));

  return (
    <div className="flex-1 flex max-w-7xl w-full mx-auto relative">
      <CourseSidebar modules={curriculum} />
      <main className="flex-1 p-6 lg:p-10 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

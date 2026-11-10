import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Phase 1 launch is public information only. No learner accounts, paid course
  // materials, full podcast, or unreviewed learning labs are publicly available.
  // Reopening any learner routes requires an explicit deployment configuration change
  // AND completion of access-entitlement/credential security work.
  if (process.env.COURSE_ACCESS_OPEN !== 'true') {
    const redirect = request.nextUrl.clone();
    redirect.pathname = '/';
    redirect.search = '';
    return NextResponse.redirect(redirect, { status: 307 });
  }

  let response = NextResponse.next({ request })
  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list: { name: string; value: string; options: CookieOptions }[]) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'; url.searchParams.set('next', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }
  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*', '/admin/:path*', '/courses/:path*',
    '/certificate/:path*', '/lab/:path*', '/login',
    '/course-preview/:path*', '/masterclass.html',
    '/How_Trauma_Recalibrates_Your_Nervous_System_web.mp3',
  ],
};

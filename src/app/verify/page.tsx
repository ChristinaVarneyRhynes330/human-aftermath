export default function VerifyIndex() {
  return (
    <div className="max-w-md">
      <h1 className="font-serif text-3xl">Verify a certificate</h1>
      <form action={async (fd: FormData) => { 'use server'; const { redirect } = await import('next/navigation'); redirect(`/verify/${encodeURIComponent(String(fd.get('code') ?? '').trim())}`) }} className="mt-4">
        <label className="block text-sm font-medium">Credential ID
          <input name="code" placeholder="HA-XXXX-XXXX-XXXX" className="mt-1 w-full rounded-lg border border-slate bg-white p-3" /></label>
        <button className="mt-3 rounded-lg bg-ink-blue px-5 py-2 font-medium text-white">Verify</button>
      </form>
    </div>)
}

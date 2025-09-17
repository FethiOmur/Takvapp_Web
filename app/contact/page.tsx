export default function ContactPage() {
  return (
    <div className="min-h-screen text-white relative">
      <section className="container mx-auto px-4 py-24">
        <div className="relative mx-auto max-w-5xl">
          <div className="absolute inset-0 rounded-[32px] border border-white/10" />
          <div className="relative rounded-[32px] bg-black/40 backdrop-blur-sm p-12">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center justify-center rounded-[24px] px-5 py-4 border border-white/10 bg-black/60 shadow-sm">
                <span className="text-5xl md:text-6xl font-extrabold tracking-tight">Contact us.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-8">
            <div className="text-zinc-300 text-lg font-semibold mb-2">Product support.</div>
            <p className="text-zinc-400 text-sm mb-6">Get help from the community. If you're on a paid plan, submit a ticket to our support team.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="inline-flex items-center rounded-full bg-white text-black text-sm px-4 py-2 hover:bg-zinc-200 transition-colors">Get Support</a>
              <span className="inline-flex items-center gap-2 rounded-full bg-black/60 border border-white/10 px-4 py-2 text-xs text-zinc-300"><span className="size-2 rounded-full bg-blue-400" />All systems normal</span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-8">
            <div className="text-zinc-300 text-lg font-semibold mb-2">Talk to our Sales team.</div>
            <p className="text-zinc-400 text-sm mb-6">Discuss your requirements, learn about custom pricing, or request a demonstration.</p>
            <a href="#" className="inline-flex items-center rounded-full bg-white text-black text-sm px-4 py-2 hover:bg-zinc-200 transition-colors">Contact sales</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6">
            <div className="text-zinc-200 font-medium mb-2">Hire a Next.js expert.</div>
            <p className="text-zinc-400 text-sm mb-4">Adopt best practices, remove blockers, and ship on time.</p>
            <a href="#" className="inline-flex items-center rounded-full bg-white text-black text-sm px-4 py-2 hover:bg-zinc-200 transition-colors">Find an Expert</a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6">
            <div className="text-zinc-200 font-medium mb-2">Follow us on X.</div>
            <p className="text-zinc-400 text-sm mb-4">Get our news, company information, and media resources.</p>
            <a href="#" className="inline-flex items-center rounded-full bg-white text-black text-sm px-4 py-2 hover:bg-zinc-200 transition-colors">Follow @llmetric</a>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6">
            <div className="text-zinc-200 font-medium mb-2">Join our community.</div>
            <p className="text-zinc-400 text-sm mb-4">For code related discussions, join our community forum.</p>
            <a href="#" className="inline-flex items-center rounded-full bg-white text-black text-sm px-4 py-2 hover:bg-zinc-200 transition-colors">View our Community forum</a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-8">
            <div className="text-zinc-200 font-medium mb-2">Ready to deploy?</div>
            <p className="text-zinc-400 text-sm mb-4">Start building with a free account. Speak to an expert for your Pro or Enterprise needs.</p>
            <div className="flex items-center gap-3">
              <a href="#" className="inline-flex items-center rounded-full bg-white text-black text-sm px-4 py-2 hover:bg-zinc-200 transition-colors">Start Deploying</a>
              <a href="#" className="inline-flex items-center rounded-full bg-black/60 border border-white/10 text-zinc-200 text-sm px-4 py-2 hover:bg-black/70 transition-colors">Talk to an Expert</a>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-8">
            <div className="text-zinc-200 font-medium mb-2">Explore LLMetric Enterprise</div>
            <p className="text-zinc-400 text-sm mb-4">with an interactive product tour, trial, or a personalized demo.</p>
            <a href="#" className="inline-flex items-center rounded-full bg-white text-black text-sm px-4 py-2 hover:bg-zinc-200 transition-colors">Explore Enterprise</a>
          </div>
        </div>
      </section>
    </div>
  )
}



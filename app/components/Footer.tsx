import { Facebook, Twitter, Instagram, Github, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          <div>
            <h4 className="text-white font-semibold mb-3">Products</h4>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Compare</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Benchmarks</a></li>
              <li><a href="#" className="hover:text-white transition-colors">News</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Docs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-zinc-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Social</h4>
            <div className="flex items-center gap-4 text-zinc-400">
              <a href="#" className="hover:text-white transition-colors" aria-label="GitHub"><Github /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><Twitter /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram"><Instagram /></a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook"><Facebook /></a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 py-6 text-zinc-400 text-sm">
          <span>&copy; 2024 LLMetric. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Status</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

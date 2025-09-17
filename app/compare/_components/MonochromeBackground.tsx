export default function MonochromeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Ana koyu degrade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

      {/* İnce grid dokusu */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
           }}
      />

      {/* Yumuşak beyaz blur lekeler (monokrom) */}
      <div className="absolute top-1/3 right-[15%] w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-[10%] w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse" />
    </div>
  )
}



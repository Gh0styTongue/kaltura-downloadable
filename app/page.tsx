export default function Home() {
  return (
    <div className="grid grid-rows-[1fr_auto_1fr] items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-mono)] bg-black overflow-hidden relative">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] opacity-50 animate-pulse"></div>
      </div>

      <header className="row-start-1 w-full max-w-5xl flex justify-between text-xs text-gray-600 uppercase tracking-[0.2em] z-10">
        <span>sys_id: vrc-node-01</span>
        <span>Encryption: Active</span>
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center text-center z-10">
        <div className="relative">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 drop-shadow-sm">
              PARK RELICS
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        </div>
        
        <div className="max-w-md space-y-2 text-sm text-gray-400">
          <p className="uppercase tracking-widest text-cyan-500/80 text-xs mb-4">
            [ API Gateway Online ]
          </p>
          <p>
            This endpoint operates as a stateless artifact delivery node.
          </p>
          <p className="text-gray-600 text-xs">
            Direct interface access is restricted to authorized archival protocols only.
          </p>
        </div>
      </main>
      
      <footer className="row-start-3 flex flex-col items-center gap-2 text-[10px] text-gray-700 font-mono uppercase tracking-widest z-10">
        <div className="flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse"></span>
            <span>System Operational</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Archive Protocol</p>
      </footer>
    </div>
  );
}
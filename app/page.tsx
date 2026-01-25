export default function Home() {
  const testId = "4bb39d5773e0ca8833003b15";

  return (
    <div className="grid grid-rows-[1fr_auto_1fr] items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-mono)] bg-black overflow-hidden relative text-center">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] opacity-50 animate-pulse"></div>
      </div>

      <header className="row-start-1 w-full max-w-5xl flex justify-between text-xs text-gray-600 uppercase tracking-[0.2em] z-10">
        <span>System Status: Online</span>
        <span>Secure Gateway</span>
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center z-10">
        <div className="relative">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-600 drop-shadow-sm">
              PARK RELICS
            </h1>
            <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        </div>
        
        <div className="max-w-md space-y-4 text-sm text-gray-400">
          <p className="uppercase tracking-widest text-cyan-500/80 text-xs">
            [ Digital Archive Gateway ]
          </p>
          <p>
            This node provides secure access to our digital media collection and currently powers <strong>videos.parkrelics.com</strong>.
          </p>
          
          <div className="pt-4 space-y-3">
            <p className="text-xs uppercase text-gray-500 tracking-widest">System Protocols</p>
            <div className="flex flex-col gap-2">
              <a 
                href={`/api/get-size?id=${testId}`} 
                className="bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 p-3 rounded text-xs transition-colors flex flex-col gap-1"
              >
                <span className="text-white">Run Density Scan</span>
                <span className="text-[10px] text-gray-500">Uses api/get-size to calculate file size via HEAD request.</span>
              </a>
              <a 
                href={`/api/download?id=${testId}`} 
                className="bg-gray-900/50 border border-gray-800 hover:border-pink-500/50 p-3 rounded text-xs transition-colors flex flex-col gap-1"
              >
                <span className="text-white">Request Secure Retrieval</span>
                <span className="text-[10px] text-gray-500">Uses api/download to stream files or redirect large items (&gt;1.3GB).</span>
              </a>
            </div>
          </div>

          <p className="text-gray-600 text-[10px] pt-4 italic">
            Direct interface access is reserved for authorized archival protocols.
          </p>
        </div>
      </main>
      
      <footer className="row-start-3 flex flex-col items-center gap-2 text-[10px] text-gray-700 font-mono uppercase tracking-widest z-10">
        <div className="flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse"></span>
            <span>All Systems Operational</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Park Relics Archive Protocol</p>
      </footer>
    </div>
  );
}
export default function Home() {
  const testId = "4bb39d5773e0ca8833003b15";

  return (
    <div className="grid grid-rows-[1fr_auto_1fr] items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-mono)] bg-black overflow-hidden relative text-center">
      
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
            <div className="grid grid-cols-1 gap-4 text-left">
              <div className="bg-gray-900/50 border border-gray-800 p-4 rounded shadow-sm relative group">
                <h4 className="text-white text-xs mb-1 uppercase tracking-tighter">Density Scan (API)</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                  Performs a pre-flight metadata check to calculate file density and availability without initiating a full data transfer.
                </p>
                <button 
                  onClick={() => document.getElementById('size_modal')?.showModal()}
                  className="text-[10px] text-cyan-500 hover:text-cyan-400 uppercase tracking-widest border border-cyan-950 px-2 py-1 rounded transition-colors"
                >
                  Response Details
                </button>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 p-4 rounded shadow-sm relative group">
                <h4 className="text-white text-xs mb-1 uppercase tracking-tighter">Secure Retrieval (API)</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                  Manages the secure delivery of artifacts. Smaller items are streamed through an encrypted tunnel, while massive relics trigger a direct high-speed transfer.
                </p>
                <button 
                  onClick={() => document.getElementById('download_modal')?.showModal()}
                  className="text-[10px] text-pink-500 hover:text-pink-400 uppercase tracking-widest border border-pink-950 px-2 py-1 rounded transition-colors"
                >
                  Response Details
                </button>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-[10px] pt-4 italic">
            Direct interface access is reserved for authorized archival protocols.
          </p>
        </div>
      </main>

      <dialog id="size_modal" className="bg-gray-900 text-gray-300 p-6 rounded-lg border border-gray-800 shadow-2xl backdrop:backdrop-blur-sm max-w-lg w-full">
        <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
          <h3 className="text-cyan-500 text-xs font-bold uppercase tracking-widest">Density Scan Protocols</h3>
          <form method="dialog"><button className="text-gray-500 hover:text-white">✕</button></form>
        </div>
        <div className="space-y-4 text-left font-mono text-[11px]">
          <div>
            <p className="text-white mb-1">SUCCESS_RESPONSE:</p>
            <pre className="bg-black p-2 rounded text-green-500">{"{ \"status\": \"success\", \"id\": \""+testId+"\", \"size\": 1234567 }"}</pre>
          </div>
          <div>
            <p className="text-white mb-1">ERROR_HANDLING:</p>
            <ul className="list-disc pl-4 space-y-1 text-red-400/80">
              <li>400: "Missing ID"</li>
              <li>500: "Bridge Config Error"</li>
              <li>404: "Video not found in Bridge"</li>
              <li>404: "No source URL"</li>
            </ul>
          </div>
        </div>
      </dialog>

      <dialog id="download_modal" className="bg-gray-900 text-gray-300 p-6 rounded-lg border border-gray-800 shadow-2xl backdrop:backdrop-blur-sm max-w-lg w-full">
        <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
          <h3 className="text-pink-500 text-xs font-bold uppercase tracking-widest">Secure Retrieval Protocols</h3>
          <form method="dialog"><button className="text-gray-500 hover:text-white">✕</button></form>
        </div>
        <div className="space-y-4 text-left font-mono text-[11px]">
          <div>
            <p className="text-white mb-1">SUCCESS_BEHAVIOR:</p>
            <ul className="list-disc pl-4 space-y-1 text-green-500">
              <li>Under 1.3GB: Direct binary stream via proxy</li>
              <li>Over 1.3GB: Immediate 307 redirect to source</li>
            </ul>
          </div>
          <div>
            <p className="text-white mb-1">ERROR_HANDLING:</p>
            <ul className="list-disc pl-4 space-y-1 text-red-400/80">
              <li>400: "Uh oh! You need a valid FastPass ID..."</li>
              <li>500: "The Monorail is down. (Bridge URL missing)."</li>
              <li>404: "Relic seems to be lost in the Disney Vault."</li>
              <li>404: "Attraction currently down for refurbishment."</li>
              <li>403: "The First Order has blocked this transmission."</li>
              <li>404: "Stitch ate the source file."</li>
              <li>502: "Glitch in the Grid. (HTML received instead of video)."</li>
              <li>502: "Ran out of Pixie Dust. (File integrity check failed)."</li>
            </ul>
          </div>
        </div>
      </dialog>
      
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
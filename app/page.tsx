'use client';

export default function Home() {
  const testId = "4bb39d5773e0ca8833003b15";

  const runSizeTest = async () => {
    const display = document.getElementById('size-test-display');
    if (display) display.textContent = "Scanning artifact...";
    try {
      const res = await fetch(`/api/get-size?id=${testId}`);
      const data = await res.json();
      if (display) display.textContent = JSON.stringify(data, null, 2);
    } catch (e) {
      if (display) display.textContent = "Scan failed.";
    }
  };

  const runDownloadTest = () => {
    const player = document.getElementById('test-player') as HTMLVideoElement;
    const streamUrl = `/api/download?id=${testId}`;
    if (player) {
      player.src = streamUrl;
      player.load();
      player.play().catch(() => console.log("Playback interaction required."));
    }
  };

  return (
    <div className="grid grid-rows-[1fr_auto_1fr] items-center justify-items-center min-h-screen p-8 sm:p-20 font-[family-name:var(--font-geist-mono)] bg-black overflow-hidden relative text-center">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-900/20 rounded-full blur-[120px] opacity-50 animate-pulse"></div>
      </div>

      <header className="row-start-1 w-full max-w-5xl flex justify-between text-xs text-gray-600 uppercase tracking-[0.2em] z-10">
        <span>System Status: Online</span>
        <span>Secure Gateway</span>
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center z-10 w-full max-w-2xl">
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
              <div className="bg-gray-900/50 border border-gray-800 p-4 rounded shadow-sm">
                <h4 className="text-white text-xs mb-1 uppercase tracking-tighter">Density Scan (API)</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                  Performs a pre-flight metadata check to calculate file density and availability.
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => (document.getElementById('size_modal') as HTMLDialogElement)?.showModal()}
                    className="text-[10px] text-cyan-500 hover:text-cyan-400 uppercase tracking-widest border border-cyan-950 px-2 py-1 rounded transition-colors"
                  >
                    Response Details
                  </button>
                  <button 
                    onClick={() => {
                      (document.getElementById('size_test_modal') as HTMLDialogElement)?.showModal();
                      runSizeTest();
                    }}
                    className="text-[10px] text-white hover:bg-white/10 uppercase tracking-widest border border-gray-700 px-2 py-1 rounded transition-colors"
                  >
                    Test Me
                  </button>
                </div>
              </div>

              <div className="bg-gray-900/50 border border-gray-800 p-4 rounded shadow-sm">
                <h4 className="text-white text-xs mb-1 uppercase tracking-tighter">Secure Retrieval (API)</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                  Manages delivery. Small items stream through an encrypted tunnel; large relics trigger direct transfer.
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => (document.getElementById('download_modal') as HTMLDialogElement)?.showModal()}
                    className="text-[10px] text-pink-500 hover:text-pink-400 uppercase tracking-widest border border-pink-950 px-2 py-1 rounded transition-colors"
                  >
                    Response Details
                  </button>
                  <button 
                    onClick={() => {
                      (document.getElementById('download_test_modal') as HTMLDialogElement)?.showModal();
                      runDownloadTest();
                    }}
                    className="text-[10px] text-white hover:bg-white/10 uppercase tracking-widest border border-gray-700 px-2 py-1 rounded transition-colors"
                  >
                    Test Me
                  </button>
                </div>
              </div>
            </div>
          </div>
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
              <li>400: Missing ID</li>
              <li>500: Bridge Config Error</li>
              <li>404: Video not found in Bridge</li>
            </ul>
          </div>
        </div>
      </dialog>

      <dialog id="size_test_modal" className="bg-gray-900 text-gray-300 p-6 rounded-lg border border-gray-800 shadow-2xl backdrop:backdrop-blur-sm max-w-lg w-full">
        <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
          <h3 className="text-cyan-500 text-xs font-bold uppercase tracking-widest">Live Density Scan</h3>
          <form method="dialog"><button className="text-gray-500 hover:text-white">✕</button></form>
        </div>
        <pre id="size-test-display" className="bg-black p-4 rounded text-green-500 font-mono text-left text-xs overflow-auto max-h-60"></pre>
      </dialog>

      <dialog id="download_modal" className="bg-gray-900 text-gray-300 p-6 rounded-lg border border-gray-800 shadow-2xl backdrop:backdrop-blur-sm max-w-lg w-full">
        <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
          <h3 className="text-pink-500 text-xs font-bold uppercase tracking-widest">Secure Retrieval Protocols</h3>
          <form method="dialog"><button className="text-gray-500 hover:text-white">✕</button></form>
        </div>
        <div className="space-y-4 text-left font-mono text-[11px]">
          <div>
            <p className="text-white mb-1">BEHAVIOR:</p>
            <ul className="list-disc pl-4 space-y-1 text-green-500">
              <li>Under 1.3GB: Streamed through node</li>
              <li>Over 1.3GB: Direct redirection</li>
            </ul>
          </div>
          <div>
            <p className="text-white mb-1">ERROR_HANDLING:</p>
            <ul className="list-disc pl-4 space-y-1 text-red-400/80">
              <li>403: Blocked by First Order</li>
              <li>404: Stitch ate the file</li>
              <li>502: Ran out of Pixie Dust</li>
            </ul>
          </div>
        </div>
      </dialog>

      <dialog id="download_test_modal" className="bg-gray-900 text-gray-300 p-6 rounded-lg border border-gray-800 shadow-2xl backdrop:backdrop-blur-sm max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
          <h3 className="text-pink-500 text-xs font-bold uppercase tracking-widest">Live Retrieval Stream</h3>
          <form method="dialog"><button className="text-gray-500 hover:text-white" onClick={() => {(document.getElementById('test-player') as HTMLVideoElement).pause()}}>✕</button></form>
        </div>
        <div className="aspect-video bg-black rounded overflow-hidden mb-4">
          <video id="test-player" className="w-full h-full" controls crossOrigin="anonymous">
            <source type="video/mp4" />
          </video>
        </div>
        <a 
          href={`/api/download?id=${testId}`} 
          className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/50 px-4 py-2 rounded text-[10px] text-pink-500 font-bold uppercase tracking-widest hover:bg-pink-500/20 transition-all"
        >
          Download Artifact
        </a>
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
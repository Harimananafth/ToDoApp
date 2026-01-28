export default function Clipboard({ children }) {
  return (
    <div className="self-stretch w-full max-w-md bg-yellow-700/50 p-5 pt-24  rounded-2xl shadow-2xl relative">
      {/* Objet métallique du clip board */}
      <div className="absolute w-46 h-18 top-0 left-1/2 -translate-x-1/2 z-20 ">
        <span className="absolute -top-8  left-1/2 z-21 -translate-x-1/2 w-16 h-16 rounded-full bg-transparent border-8 border-stone-500 shadow-xl"></span>
        <div className="absolute w-full h-full bg-linear-to-b from-stone-300 to-stone-400 z-22 border-t-4 border-stone-500 rounded-b-xl shadow-lg flex items-center justify-center gap-28">
          <span className="h-4 w-4 bg-stone-500 rounded-full"></span>
          <span className="h-4 w-4 bg-stone-500 rounded-full"></span>
        </div>
        <span className="absolute w-36 h-4 bg-stone-500 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-b-lg z-23"></span>
      </div>

      {/* Enfants */}
      {children}
    </div>
  );
}

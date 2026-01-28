import { Plus } from "lucide-react";
export default function Paper({ children }) {
  return (
    <div className="bg-white/90  shadow-lg h-full overflow-y-auto rounded-sm flex flex-col gap-2" >
      {/* Titre de la feuille */}
      <div className="py-4 border-b-2 border-red-300 z-24">
        <h1 className="text-2xl font-bold text-center">Ma liste à To-Do</h1>
      </div>

      {/* Contenu principal */}
      <div className="w-full grow p-3 overflow-y-auto relative">
        {children}
        {/* Lignes bleues décoratives style cahier d'écolier */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 "
          style={{
            backgroundImage: "linear-gradient(#00a4e4 1px, transparent 1px)",
            backgroundSize: "100% 2.5rem",
            marginTop: "2rem",
          }}
        ></div>
      </div>

      {/* Zone d'ajout */}
      <div className="flex items-center justify-center w-full gap-2 p-3 " >
        <input type="text" placeholder="Ajouter une nouvelle tâche" className="input input-md  grow " />
        <button className="btn btn-neutral hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            <Plus />
        </button>
      </div>
    </div>
  )
}

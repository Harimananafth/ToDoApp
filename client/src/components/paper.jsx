import { Plus } from "lucide-react";
import ToDo from "./to-do";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../services/todoService";
import { useState } from "react";

export default function Paper() {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState("");

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: todoService.getAll,
  });

  const mutation = useMutation({
    mutationFn: todoService.create,
    onMutate: () => {
      return toast.loading("Création de la tâche...");
    },
    onSuccess: (data, variables, context) => {
      toast.dismiss(context);
      toast.success("Tâche ajoutée avec succès ! ");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error, variables, context) => {
      toast.dismiss(context);
      toast.error(`Erreur lors de la création`);
    },
  });

  return (
    <div className="bg-white shadow-lg h-full overflow-y-auto rounded-sm flex flex-col gap-2">
      {/* Titre de la feuille */}
      <div className="py-4 border-b-2 border-red-300 z-24">
        <h1 className="text-2xl font-bold text-center">Ma liste à To-Do</h1>
      </div>

      {/* Contenu principal  */}
      <div className="w-full grow overflow-y-auto relative">
        <div className="min-h-full relative p-3">
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "linear-gradient(#00a4e4 1px, transparent 1px)",
              backgroundSize: "100% 2.5rem",
              marginTop: "2rem",
            }}
          ></div>

          <div className="relative flex flex-col gap-3">
            {" "}
            {error ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-error text-xs ">
                  Erreur lors de l'affichage des tâches
                </p>
              </div>
            ) : isLoading ? (
              <div className="h-full flex items-center justify-center">
                <span className="loading loading-dots loading-lg"></span>
              </div>
            ) : (
              todos
                ?.sort((a, b) => a.id - b.id)
                .map((todo) => <ToDo key={todo.id} todo={todo} />)
            )}
          </div>
        </div>
      </div>

      {/* Zone d'ajout */}
      <div className="flex items-center justify-center w-full gap-2 p-3 ">
        <input
          type="text"
          placeholder="Ajouter une nouvelle tâche"
          className="input input-md  grow "
          maxLength={60}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          required
        />
        <button
          className="btn btn-neutral btn-square hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          onClick={() => {
            mutation.mutate({ title: newTodo });
            setNewTodo("");
          }}
          disabled={newTodo.trim() === ""}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}

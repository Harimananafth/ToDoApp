import { Trash } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoService } from "../services/todoService";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ToDo({ todo }) {
  const [isHovered, setIsHovered] = useState(false);
  const queryClient = useQueryClient();

  const handleDeleteClick = () => {
    MySwal.fire({
      title: "Supprimer cette tâche ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", 
      cancelButtonColor: "#78716c", 
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(todo.id);
      }
    });
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => todoService.delete(id),
    onSuccess: () => {
      MySwal.fire({
        title: "Supprimé !",
        text: "La tâche a disparu dans le néant.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error, variables, context) => {
      toast.dismiss(context);
      toast.error("Erreur lors de la suppression");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (newStatus) => todoService.update(todo.id, { done: newStatus }),
    onMutate: () => {
      return toast.loading("Mise à jour...");
    },
    onSuccess: (data, variables, context) => {
      toast.dismiss(context);
      if (variables === true) {
        toast.success("Bravo, tâche terminée ! 🎉");
      } else {
        toast("Tâche remise en cours", { icon: "🔄" });
      }
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error, variables, context) => {
      toast.dismiss(context);
      toast.error("Erreur lors de la mise à jour");
    },
  });

  return (
    <div
      className="bg-white/90 py-3 p-5 z-10 flex items-center gap-3 shadow-md rounded-lg border border-stone-200 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: todo.done ? 0.7 : 1,
        backgroundColor: todo.done ? "#f9f9f9" : "white",
      }}
    >
      <input
        type="checkbox"
        checked={todo.done}
        className="checkbox checkbox-success"
        onChange={() => {
          updateMutation.mutate(!todo.done);
        }}
      />

      <p
        className={`break-words grow overflow-hidden ${todo.done ? "line-through text-gray-500" : "text-gray-800"}`}
      >
        {todo.title}
      </p>

      <button
        className="btn btn-sm btn-square border-0 text-error bg-transparent hover:scale-110 transition-all duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          pointerEvents: isHovered ? "auto" : "none",
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteClick();
        }}
      >
        <Trash size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}

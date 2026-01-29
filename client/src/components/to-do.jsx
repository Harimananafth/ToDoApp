import { Trash } from "lucide-react";
import { useState } from "react";

export default function ToDo() {
  const [isHovered, setIsHovered] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div
      className="bg-white/90 py-3 p-5 z-50 flex items-center gap-3 shadow-md rounded-lg border border-stone-200 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textDecoration : isChecked ? "line-through" : "none",
        ointerEvents: isChecked ? "none" : "auto",
        opacity: isChecked ? 0.6 : 1
      }}
      disabled={isChecked}
    >
      <input
        type="checkbox"
        defaultValue={false}
        className="checkbox checkbox-success"
        onClick={()=>setIsChecked(!isChecked)}
      />
      <p className="break-words grow overflow-hidden ">My first to do</p>
      <button
        className="btn btn-sm btn-square border-0 text-error bg-transparent hover:scale-110 transition-all duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        <Trash size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}

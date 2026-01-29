import "./App.css";
import Clipboard from "./components/clipboard";
import Paper from "./components/paper";
import ToDo from "./components/to-do";
export default function App() {
  return (
    <div className="h-screen bg-base-100 flex items-center justify-center py-10 px-5">
      <Clipboard>
        <Paper>
          <ToDo />
        </Paper>
      </Clipboard>
    </div>
  );
}

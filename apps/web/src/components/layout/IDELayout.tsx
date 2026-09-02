import { useState } from "react";

import Header from "./Header";
import FileExplorer from "../explorer/Fileexplore";
import CodeEditor from "../editor/CodeEditor";
import AIChat from "../ai/AiChat";
import Terminal from "../terminal/Terminal";

function IDELayout() {
  const [selectedFile, setSelectedFile] =
    useState("App.tsx");

  const [files, setFiles] = useState<Record<string, string>>({
    "App.tsx": `function App() {
  return (
    <div>
      <h1>Hello CodeForge AI</h1>
    </div>
  );
}

export default App;
`,

    "main.tsx": `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
`,

    "package.json": `{
  "name": "codeforge-ai",
  "version": "1.0.0",
  "private": true
}`,
  });

  const handleCodeChange = (value: string) => {
    setFiles((previousFiles) => ({
      ...previousFiles,
      [selectedFile]: value,
    }));
  };

  return (
    <div className="ide">
      <Header />

      <div className="ide-main">
        <FileExplorer
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
        />

        <main className="workspace">
          <div className="workspace-top">
            <CodeEditor
              fileName={selectedFile}
              code={files[selectedFile]}
              onChange={handleCodeChange}
            />

            <AIChat />
          </div>

          <Terminal />
        </main>
      </div>
    </div>
  );
}

export default IDELayout;
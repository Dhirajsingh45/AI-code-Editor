import { useEffect, useState } from "react";

import Header from "./Header";
import FileExplorer from "../explorer/Fileexplore";
import CodeEditor from "../editor/CodeEditor";
import AIChat from "../ai/AiChat";
import Terminal from "../terminal/Terminal";

const defaultFiles: Record<string, string> = {
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
};

function IDELayout() {
  const [selectedFile, setSelectedFile] =
    useState("App.tsx");

  const [files, setFiles] = useState<Record<string, string>>(() => {
    const savedFiles = localStorage.getItem("codeforge-files");

    if (savedFiles) {
      try {
        return JSON.parse(savedFiles);
      } catch {
        return defaultFiles;
      }
    }

    return defaultFiles;
  });

  useEffect(() => {
    localStorage.setItem(
      "codeforge-files",
      JSON.stringify(files)
    );
  }, [files]);

  const handleCodeChange = (value: string) => {
    setFiles((previousFiles) => ({
      ...previousFiles,
      [selectedFile]: value,
    }));
  };

  const handleCreateFile = (fileName: string) => {
    if (fileName in files) {
      alert("A file with this name already exists.");
      return;
    }

    setFiles((previousFiles) => ({
      ...previousFiles,
      [fileName]: "",
    }));

    setSelectedFile(fileName);
  };

  return (
    <div className="ide">
      <Header />

      <div className="ide-main">
        <FileExplorer
          files={Object.keys(files)}
          selectedFile={selectedFile}
          onFileSelect={setSelectedFile}
          onCreateFile={handleCreateFile}
        />

        <main className="workspace">
          <div className="workspace-top">
            <CodeEditor
              fileName={selectedFile}
              code={files[selectedFile] ?? ""}
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
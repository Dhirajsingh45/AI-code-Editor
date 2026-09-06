import {
  ChevronDown,
  ChevronRight,
  FileCode2,
  FileJson,
  FileText,
  Folder,
  FolderOpen,
  Plus,
  Check,
  X,
} from "lucide-react";

import { useState } from "react";

interface FileExplorerProps {
  files: string[];
  selectedFile: string;
  onFileSelect: (fileName: string) => void;
  onCreateFile: (fileName: string) => void;
}

function FileExplorer({
  files,
  selectedFile,
  onFileSelect,
  onCreateFile,
}: FileExplorerProps) {
  const [srcOpen, setSrcOpen] = useState(true);
  const [creatingFile, setCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith(".tsx") || fileName.endsWith(".ts")) {
      return <FileCode2 size={15} />;
    }

    if (fileName.endsWith(".json")) {
      return <FileJson size={15} />;
    }

    return <FileText size={15} />;
  };

  const handleStartCreate = () => {
    setCreatingFile(true);
    setNewFileName("");
  };

  const handleCancelCreate = () => {
    setCreatingFile(false);
    setNewFileName("");
  };

  const handleConfirmCreate = () => {
    const name = newFileName.trim();

    if (!name) {
      return;
    }

    onCreateFile(name);

    setCreatingFile(false);
    setNewFileName("");
  };

  return (
    <aside className="explorer">
      <div className="panel-title">
        <span>EXPLORER</span>

        <button
          type="button"
          className="explorer-add-button"
          onClick={handleStartCreate}
          title="New File"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="project-tree">
        {/* Project */}
        <div className="tree-item root">
          <FolderOpen size={16} />
          <span>my-project</span>
        </div>

        {/* SRC */}
        <div
          className="tree-item"
          onClick={() => setSrcOpen(!srcOpen)}
        >
          {srcOpen ? (
            <ChevronDown size={15} />
          ) : (
            <ChevronRight size={15} />
          )}

          {srcOpen ? (
            <FolderOpen size={16} />
          ) : (
            <Folder size={16} />
          )}

          <span>src</span>
        </div>

        {srcOpen && (
          <div className="nested">

            {/* New File Input */}
            {creatingFile && (
              <div className="new-file-row">
                <FileText size={15} />

                <input
                  autoFocus
                  value={newFileName}
                  onChange={(event) =>
                    setNewFileName(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleConfirmCreate();
                    }

                    if (event.key === "Escape") {
                      handleCancelCreate();
                    }
                  }}
                  placeholder="filename.tsx"
                />

                <button
                  type="button"
                  onClick={handleConfirmCreate}
                  title="Create"
                >
                  <Check size={14} />
                </button>

                <button
                  type="button"
                  onClick={handleCancelCreate}
                  title="Cancel"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Existing Files */}
            {files.map((fileName) => (
              <div
                key={fileName}
                className={`tree-item ${
                  selectedFile === fileName
                    ? "selected"
                    : ""
                }`}
                onClick={() => onFileSelect(fileName)}
              >
                {getFileIcon(fileName)}
                <span>{fileName}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default FileExplorer;
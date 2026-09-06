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
  Pencil,
  Trash2,
} from "lucide-react";

import { useState } from "react";

interface FileExplorerProps {
  files: string[];
  selectedFile: string;
  onFileSelect: (fileName: string) => void;
  onCreateFile: (fileName: string) => void;
  onRenameFile: (
    oldName: string,
    newName: string
  ) => void;
  onDeleteFile: (fileName: string) => void;
}

function FileExplorer({
  files,
  selectedFile,
  onFileSelect,
  onCreateFile,
  onRenameFile,
  onDeleteFile,
}: FileExplorerProps) {
  const [srcOpen, setSrcOpen] = useState(true);

  const [creatingFile, setCreatingFile] =
    useState(false);

  const [newFileName, setNewFileName] =
    useState("");

  const [renamingFile, setRenamingFile] =
    useState<string | null>(null);

  const [renameValue, setRenameValue] =
    useState("");

  const getFileIcon = (fileName: string) => {
    if (
      fileName.endsWith(".tsx") ||
      fileName.endsWith(".ts")
    ) {
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

  const handleStartRename = (fileName: string) => {
    setRenamingFile(fileName);
    setRenameValue(fileName);
  };

  const handleCancelRename = () => {
    setRenamingFile(null);
    setRenameValue("");
  };

  const handleConfirmRename = () => {
    if (!renamingFile) {
      return;
    }

    const newName = renameValue.trim();

    if (!newName) {
      return;
    }

    onRenameFile(renamingFile, newName);

    setRenamingFile(null);
    setRenameValue("");
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
        <div className="tree-item root">
          <FolderOpen size={16} />
          <span>my-project</span>
        </div>

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
            {creatingFile && (
              <div className="new-file-row">
                <FileText size={15} />

                <input
                  autoFocus
                  value={newFileName}
                  onChange={(event) =>
                    setNewFileName(
                      event.target.value
                    )
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

            {files.map((fileName) => (
              <div
                key={fileName}
                className={`tree-item file-item ${
                  selectedFile === fileName
                    ? "selected"
                    : ""
                }`}
                onClick={() =>
                  onFileSelect(fileName)
                }
              >
                {renamingFile === fileName ? (
                  <>
                    {getFileIcon(fileName)}

                    <input
                      autoFocus
                      className="rename-input"
                      value={renameValue}
                      onChange={(event) =>
                        setRenameValue(
                          event.target.value
                        )
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          handleConfirmRename();
                        }

                        if (event.key === "Escape") {
                          handleCancelRename();
                        }
                      }}
                      onClick={(event) =>
                        event.stopPropagation()
                      }
                    />

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleConfirmRename();
                      }}
                      title="Save"
                    >
                      <Check size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleCancelRename();
                      }}
                      title="Cancel"
                    >
                      <X size={14} />
                    </button>
                  </>
                ) : (
                  <>
                    {getFileIcon(fileName)}

                    <span className="file-name">
                      {fileName}
                    </span>

                    <div className="file-actions">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleStartRename(fileName);
                        }}
                        title="Rename"
                      >
                        <Pencil size={13} />
                      </button>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onDeleteFile(fileName);
                        }}
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default FileExplorer;
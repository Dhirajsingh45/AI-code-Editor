import {
  ChevronDown,
  ChevronRight,
  FileCode2,
  FileJson,
  Folder,
  FolderOpen,
} from "lucide-react";
import { useState } from "react";

interface FileExplorerProps {
  selectedFile: string;
  onFileSelect: (fileName: string) => void;
}

function FileExplorer({
  selectedFile,
  onFileSelect,
}: FileExplorerProps) {
  const [srcOpen, setSrcOpen] = useState(true);

  const files = [
    {
      name: "App.tsx",
      icon: <FileCode2 size={15} />,
    },
    {
      name: "main.tsx",
      icon: <FileCode2 size={15} />,
    },
    {
      name: "package.json",
      icon: <FileJson size={15} />,
    },
  ];

  return (
    <aside className="explorer">
      <div className="panel-title">
        EXPLORER
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
            {files.map((file) => (
              <div
                key={file.name}
                className={`tree-item ${
                  selectedFile === file.name
                    ? "selected"
                    : ""
                }`}
                onClick={() => onFileSelect(file.name)}
              >
                {file.icon}
                <span>{file.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default FileExplorer;
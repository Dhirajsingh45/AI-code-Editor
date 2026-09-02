import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  fileName: string;
  code: string;
  onChange: (value: string) => void;
}

function CodeEditor({
  fileName,
  code,
  onChange,
}: CodeEditorProps) {
  const getLanguage = (fileName: string) => {
    if (fileName.endsWith(".tsx")) return "typescriptreact";
    if (fileName.endsWith(".ts")) return "typescript";
    if (fileName.endsWith(".jsx")) return "javascript";
    if (fileName.endsWith(".js")) return "javascript";
    if (fileName.endsWith(".json")) return "json";
    if (fileName.endsWith(".css")) return "css";

    return "plaintext";
  };

  return (
    <div className="editor-container">
      <div className="editor-tab">
        <span>{fileName}</span>
      </div>

      <Editor
        height="100%"
        language={getLanguage(fileName)}
        value={code}
        theme="vs-dark"
        onChange={(value) => onChange(value ?? "")}
        options={{
          minimap: {
            enabled: true,
          },
          fontSize: 14,
          padding: {
            top: 10,
          },
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "off",
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}

export default CodeEditor;
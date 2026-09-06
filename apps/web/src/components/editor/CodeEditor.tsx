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
    const extension = fileName.toLowerCase();

    if (extension.endsWith(".tsx")) return "typescriptreact";
    if (extension.endsWith(".ts")) return "typescript";

    if (extension.endsWith(".jsx")) return "javascript";
    if (extension.endsWith(".js")) return "javascript";

    if (extension.endsWith(".html")) return "html";
    if (extension.endsWith(".css")) return "css";
    if (extension.endsWith(".scss")) return "scss";

    if (extension.endsWith(".json")) return "json";

    if (extension.endsWith(".py")) return "python";
    if (extension.endsWith(".java")) return "java";
    if (extension.endsWith(".c")) return "c";
    if (extension.endsWith(".cpp")) return "cpp";

    if (extension.endsWith(".sql")) return "sql";

    if (extension.endsWith(".xml")) return "xml";

    if (
      extension.endsWith(".yaml") ||
      extension.endsWith(".yml")
    ) {
      return "yaml";
    }

    if (extension.endsWith(".md")) return "markdown";

    if (extension.endsWith(".sh")) return "shell";

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
function Terminal() {
  return (
    <div className="terminal">
      <div className="terminal-header">
        <span>TERMINAL</span>

        <button>×</button>
      </div>

      <div className="terminal-body">
        <div>
          <span className="terminal-prompt">$</span>{" "}
          npm run dev
        </div>

        <div className="terminal-output">
          CodeForge AI development server
        </div>

        <div className="terminal-output">
          Ready for commands...
        </div>
      </div>
    </div>
  );
}

export default Terminal;
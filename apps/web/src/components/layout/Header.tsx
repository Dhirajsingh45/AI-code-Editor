import {
  Play,
  GitBranch,
  Settings,
  User,
  Zap,
} from "lucide-react";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <Zap size={20} />
          <span>CodeForge AI</span>
        </div>

        <div className="project-name">
          my-project
        </div>
      </div>

      <div className="header-actions">
        <button className="header-button">
          <Play size={16} />
          Run
        </button>

        <button className="header-button">
          <GitBranch size={16} />
          Git
        </button>

        <button className="icon-button">
          <Settings size={18} />
        </button>

        <button className="icon-button">
          <User size={18} />
        </button>
      </div>
    </header>
  );
}

export default Header;
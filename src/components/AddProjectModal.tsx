import { useState } from "react";
import { X, Plus, Loader2 } from "lucide-react";
import { createProject, type Project } from "@/lib/portfolio-service";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolioId: string;
  onProjectAdded: (project: Project) => void;
}

export default function AddProjectModal({ isOpen, onClose, portfolioId, onProjectAdded }: AddProjectModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      if (!title.trim()) {
        throw new Error("Project title is required");
      }

      const techStackArray = techStack
        .split(",")
        .map(tech => tech.trim())
        .filter(tech => tech.length > 0);

      const newProject = await createProject({
        portfolio_id: portfolioId,
        title: title.trim(),
        description: description.trim() || undefined,
        tech_stack: techStackArray
      });

      if (newProject) {
        onProjectAdded(newProject);
        // Reset form
        setTitle("");
        setDescription("");
        setTechStack("");
        onClose();
      } else {
        throw new Error("Failed to create project");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create project");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Add New Project</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              placeholder="Enter project title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Description (Optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white h-24 resize-none"
              placeholder="Brief description of the project..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-2">Tech Stack</label>
            <input
              type="text"
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
              placeholder="React, Node.js, TypeScript (comma-separated)"
            />
            <p className="text-xs text-slate-500 mt-1">Separate technologies with commas</p>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
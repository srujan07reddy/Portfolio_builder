import { Project } from "@/lib/portfolio-service";
import { Code, Calendar } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-xl p-6 shadow-2xl hover:shadow-3xl transition-all">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 leading-tight">{project.title}</h3>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <Calendar className="w-3 h-3" />
          {new Date(project.created_at).toLocaleDateString()}
        </div>
      </div>

      {project.description && (
        <p className="text-slate-600 text-sm mb-4 line-clamp-2">{project.description}</p>
      )}

      <div className="flex items-center gap-2">
        <Code className="w-4 h-4 text-blue-600" />
        <div className="flex flex-wrap gap-1">
          {project.tech_stack.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-md border border-blue-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
import { prisma } from "@/lib/prisma";
import { ScrollText, LogIn, Plus, Pencil, Trash2, Download } from "lucide-react";

const ACTION_CONFIG = {
  LOGIN: { icon: LogIn, label: "Connexion", color: "text-primary" },
  CREATE: { icon: Plus, label: "Création", color: "text-emerald-600" },
  UPDATE: { icon: Pencil, label: "Modification", color: "text-amber-600" },
  DELETE: { icon: Trash2, label: "Suppression", color: "text-destructive" },
  EXPORT: { icon: Download, label: "Export", color: "text-primary" },
};

export default async function LogsPage() {
  const logs = await prisma.activityLog.findMany({
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <ScrollText className="h-6 w-6 text-primary" />
        <div>
          <h1 className="font-display text-2xl font-semibold text-primary-950 dark:text-white">
            Journal d'activité
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Historique des 100 dernières actions administratives.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-premium">
        <div className="divide-y divide-border">
          {logs.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              Aucune activité enregistrée pour le moment.
            </p>
          ) : (
            logs.map((log) => {
              const config = ACTION_CONFIG[log.action];
              const Icon = config.icon;
              return (
                <div key={log.id} className="flex items-center gap-4 p-4">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-secondary ${config.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-heading font-medium text-primary-950 dark:text-white">
                        {log.user.name}
                      </span>{" "}
                      <span className="text-muted-foreground">
                        — {config.label} sur {log.entity}
                        {log.details ? ` (${log.details})` : ""}
                      </span>
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {new Date(log.createdAt).toLocaleString("fr-FR")}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

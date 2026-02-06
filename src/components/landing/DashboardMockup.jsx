import React from "react";
import { Activity, Phone, Calendar, Zap, TrendingUp, Clock } from "lucide-react";

export default function DashboardMockup() {
  return (
    <div className="relative">
      {/* Main Dashboard Card */}
      <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#0F172A] p-6 shadow-2xl backdrop-blur">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
          <div>
            <h3 className="text-[13px] font-semibold text-white">Sistema GrantLinker</h3>
            <p className="text-[11px] text-[#9AA6B2] mt-0.5">En tiempo real</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-emerald-500 font-medium">Activo</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <MetricCard
            icon={Phone}
            label="Llamadas hoy"
            value="47"
            trend="+12%"
            color="emerald"
          />
          <MetricCard
            icon={Calendar}
            label="Citas agendadas"
            value="23"
            trend="+8%"
            color="blue"
          />
          <MetricCard
            icon={Activity}
            label="Workflows activos"
            value="12"
            trend="100%"
            color="purple"
          />
          <MetricCard
            icon={Zap}
            label="Automatizaciones"
            value="156"
            trend="+24%"
            color="amber"
          />
        </div>

        {/* Recent Activity */}
        <div className="space-y-2">
          <p className="text-[11px] font-medium text-[#9AA6B2] uppercase tracking-wider mb-3">
            Actividad reciente
          </p>
          <ActivityItem
            icon={Phone}
            text="Llamada atendida"
            time="Hace 2 min"
            status="success"
          />
          <ActivityItem
            icon={Calendar}
            text="Cita agendada"
            time="Hace 5 min"
            status="success"
          />
          <ActivityItem
            icon={Zap}
            text="Workflow completado"
            time="Hace 8 min"
            status="info"
          />
        </div>
      </div>

      {/* Floating Card - AI Agent */}
      <div className="absolute -right-4 -bottom-4 sm:-right-8 sm:-bottom-6 w-[240px] rounded-xl border border-white/10 bg-gradient-to-br from-emerald-950/80 to-emerald-900/80 p-4 shadow-xl backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-emerald-500/20 p-2">
            <Zap className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-[12px] font-semibold text-white">Agente IA activo</p>
            <p className="text-[11px] text-emerald-200/60 mt-1">
              Atendiendo consultas 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-purple-500/5 blur-3xl" />
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, trend, color }) {
  const colors = {
    emerald: "text-emerald-400 bg-emerald-500/10",
    blue: "text-blue-400 bg-blue-500/10",
    purple: "text-purple-400 bg-purple-500/10",
    amber: "text-amber-400 bg-amber-500/10",
  };

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className={`rounded-lg p-1.5 ${colors[color]}`}>
          <Icon className="h-3.5 w-3.5" />
        </div>
      </div>
      <p className="text-[20px] font-bold text-white">{value}</p>
      <div className="flex items-center justify-between mt-1">
        <p className="text-[10px] text-[#9AA6B2]">{label}</p>
        <p className="text-[10px] text-emerald-400 font-medium">{trend}</p>
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, text, time, status }) {
  const statusColors = {
    success: "text-emerald-400 bg-emerald-500/10",
    info: "text-blue-400 bg-blue-500/10",
  };

  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
      <div className={`rounded p-1.5 ${statusColors[status]}`}>
        <Icon className="h-3 w-3" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-white font-medium truncate">{text}</p>
        <p className="text-[10px] text-[#9AA6B2]">{time}</p>
      </div>
    </div>
  );
}
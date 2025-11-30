export default function MetricCard({ title, value }) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
            <h3 className="text-sm font-medium uppercase tracking-wider text-slate-500">{title}</h3>
            <div className="mt-4 text-3xl font-extrabold text-slate-900">
                {value}
            </div>
        </div>
    );
}
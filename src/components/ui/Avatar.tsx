import type { Member } from "../../data/types";

export default function Avatar({ member, size = 26 }: { member?: Member; size?: number }) {
  if (!member) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-full border border-dashed border-charcoal-600/25 shrink-0"
        title="Unassigned"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size, backgroundColor: member.color }}
      className="rounded-full flex items-center justify-center text-white text-[10px] font-semibold shrink-0"
      title={member.name}
    >
      {member.initials}
    </div>
  );
}

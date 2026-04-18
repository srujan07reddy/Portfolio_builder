// Drop this into DomainsSection.tsx, ConsultingSection.tsx, and CustomSection.tsx for now
export default function CustomSection({ id, data }: any) {
  return (
    <section id={id} className="py-12 border border-dashed border-gray-500 p-8 rounded-lg my-4 text-center text-gray-500">
      <p>{data.title} - UI Under Construction</p>
    </section>
  );
}
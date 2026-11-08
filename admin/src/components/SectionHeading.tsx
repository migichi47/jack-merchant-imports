const SectionHeading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="mb-6">
    <h2 className="text-lg font-bold text-gray-900">{title}</h2>
    <p className="mt-1 text-sm leading-6 text-gray-500">{description}</p>
  </div>
);

export default SectionHeading;

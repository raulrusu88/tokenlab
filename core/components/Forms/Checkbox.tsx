export const Checkbox = ({
  checkbox = false,
  text,
}: {
  checkbox?: boolean;
  text: string;
}) => {
  return (
    <label className="inline-flex items-center mt-3">
      <input
        type="checkbox"
        className=" h-5 w-5 rounded-md focus:border-0 text-white accent-positive/50 mr-1"
        checked={checkbox}
      />
      <span className="font-semibold">{text}</span>
    </label>
  );
};

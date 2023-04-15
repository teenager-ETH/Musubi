import { useAtom } from "jotai";
import { curQuestionDescription } from "./state";

export default function CodeDescription() {
  const [description] = useAtom(curQuestionDescription);
  return (
    <div className="w-[400px] py-8 px-4">
      <p className="text-xl font-bold">Question description: </p>
      <p className="mt-2 text-sm">{description}</p>
    </div>
  );
}

import Editor from '@monaco-editor/react';
import { useAtom } from 'jotai';
import { curQuestionIdAtom, userCodeAtom } from './state';

export default function CodePlace() {
  const [codes, setCodes] = useAtom(userCodeAtom);
  const [curQuesId] = useAtom(curQuestionIdAtom);
  const curCode = codes?.[curQuesId] || '';

  return (
    <div className='flex-1'>
      <Editor
        theme='vs-light'
        language='sol'
        value={curCode}
        onChange={(value) => {
          setCodes({
            ...codes,
            [curQuesId]: value,
          });
        }}
      />
    </div>
  );
}

import { Button } from '@chakra-ui/button';
import { useAtom } from 'jotai';
import {
  curQuestionIdAtom,
  isRunningTestAtom,
  userCodeAtom,
  userResult,
} from './state';

export default function CodeResult() {
  const [result, setResult] = useAtom(userResult);
  const [curQuesId] = useAtom(curQuestionIdAtom);
  const [codes] = useAtom(userCodeAtom);
  const [isRunningTest, setIsRunningTest] = useAtom(isRunningTestAtom);

  const code = codes?.[curQuesId] || '';

  const userCurResult = result?.[curQuesId] ?? {};

  const handleTestCode = async () => {
    setIsRunningTest(true);
    const data = await fetch(
      `/api/run?${new URLSearchParams({
        questionId: curQuesId,
        code,
      })}`
    );
    const runResult = await data?.json();
    setResult({
      ...result,
      [curQuesId]: runResult,
    });
    setIsRunningTest(false);
  };

  return (
    <div className='w-[300px] px-4 py-8 flex flex-col justify-between'>
      <div>
        <p className='font-bold text-xl'>Test Result</p>
        <p className='mt-4'>Final Result: {userCurResult?.result ?? '-'}</p>
        <p className='mt-4'>
          Test case passed: {userCurResult?.passCount ?? '-'}
        </p>
        <p className='mt-4'>
          Failed test case: {userCurResult?.failCount ?? '-'}
        </p>
      </div>
      <Button
        isLoading={isRunningTest}
        loadingText='Testing ...'
        bg='blue.600'
        _hover={{ bg: 'blue.700' }}
        className='px-2 py-1 bg-blue-600 text-white rounded-md w-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600'
        onClick={handleTestCode}
      >
        RUN TEST
      </Button>
    </div>
  );
}

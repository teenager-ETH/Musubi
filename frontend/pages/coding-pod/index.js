import CodingPad from '@/components/CodingPad';
import {
  questionsAtom,
  userCodeAtom,
  userResult,
} from '@/components/CodingPad/state';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import { Stack, Skeleton } from '@chakra-ui/react';

const BACKEND_API = process.env.BACKEND_API;

export default function CodingPod(props) {
  const { data } = props;
  const [, setQuestionsAtom] = useAtom(questionsAtom);
  const [, setUserResult] = useAtom(userResult);
  const [, setUserCode] = useAtom(userCodeAtom);
  const { chainId, isWeb3Enabled } = useMoralis();

  // Init the jotai states
  useEffect(() => {
    // init question list
    setQuestionsAtom(data);

    // create result map
    setUserResult(
      data?.reduce((n, i) => {
        n[i.id] = {
          finnalResult: '-',
          passedTest: '-',
          failedTest: '-',
        };
        return n;
      }, {})
    );

    // create user code map
    setUserCode(
      data?.reduce((n, i) => {
        n[i.id] = i.question;
        return n;
      }, {})
    );
  }, [data]);

  return (
    <>
      <div className='h-[calc(100vh-114px)]'>
        {isWeb3Enabled && chainId ? (
          <CodingPad questions={data} />
        ) : (
          <div className='w-full h-full px-4 py-8 flex gap-8'>
            <Stack width={'30%'}>
              <Skeleton height='35px' />
              <Skeleton height='35px' />
              <Skeleton height='35px' />
              <Skeleton height='35px' />
              <Skeleton height='35px' />
              <Skeleton height='35px' />
            </Stack>
            <Stack flex={1}>
              <Skeleton height='35px' />
              <Skeleton height='35px' />
              <Skeleton height='35px' />
              <Skeleton height='35px' />
              <Skeleton height='35px' />
              <Skeleton height='35px' />
            </Stack>
            <Stack width={'30%'}>
              <Skeleton height='35px' />
              <Skeleton height='35px' />
              <Skeleton height='35px' />
              <Skeleton height='35px' />
              <Skeleton height='35px' />
              <Skeleton height='35px' />
            </Stack>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`${BACKEND_API}/api/questions`);
  const data = await res.json();
  return {
    props: {
      data: data?.data,
    },
  };
}

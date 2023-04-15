import {
  Button,
  Modal,
  useDisclosure,
  useToast,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Menu,
  MenuItem,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import CodeDescription from './CodeDescription';
import CodePlace from './CodePlace';
import CodeResult from './CodeResult';
import { useAtom } from 'jotai';
import {
  curQuestionIdAtom,
  isAllCompletedAtom,
  isLastQuestionAtom,
  isRunningTestAtom,
  questionsAtom,
  userCodeAtom,
  userResult,
} from './state';
import { useMintUserResult } from './useMintUserResult';

export default function CodingPad() {
  const {
    isOpen: isWarningOpen,
    onOpen: onWarningOpen,
    onClose: onWarningClose,
  } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    isOpen: notCompeletedModal,
    onOpen: onNotCompeletedModalOpen,
    onClose: onNotCompeletedModalClose,
  } = useDisclosure();

  const toast = useToast();
  const router = useRouter();

  const [curQuesId, setCurQuestionId] = useAtom(curQuestionIdAtom);
  const [questions] = useAtom(questionsAtom);
  const [isRunningTest] = useAtom(isRunningTestAtom);
  const [isLastQuestion] = useAtom(isLastQuestionAtom);
  const [result] = useAtom(userResult);
  const [isAllCompleted] = useAtom(isAllCompletedAtom);

  const mintResult = useMintUserResult();

  useEffect(() => {
    if (questions.length > 0) {
      const firstQuestion = questions[0];
      setCurQuestionId(firstQuestion?.id);
    }
  }, [questions]);

  // 1. get user result, calculate the final nft result
  // 2. mint the resut to user
  const commitResult = () => {
    const resultMap = Object.values(result);
    const finalResult = resultMap.reduce((acc, cur) => {
      const curScore = cur?.result === 'correct' ? 1 : 0;
      return acc + curScore;
    }, 1);

    console.log('finalResult: ', finalResult);

    mintResult(finalResult, (res) => {
      console.log('mint result: ', res);
      toast({
        title: 'Your test results have been minted and sent to your wallet',
        status: 'success',
        position: 'top',
        duration: 3000,
      });
    }),
      (error) => {
        console.log('mint error: ', error);
        toast({
          title: error,
          status: 'error',
          position: 'top',
          duration: 3000,
        });
      };
  };

  const nextQuestionId = useMemo(() => {
    if (isLastQuestion) {
      return undefined;
    } else {
      const curQuestionIdx = questions?.findIndex(({ id }) => id === curQuesId);
      const nextIdx = curQuestionIdx + 1;
      const nextQuestionId = questions?.[nextIdx]?.id;
      return nextQuestionId;
    }
  }, [isLastQuestion, questions, curQuesId]);

  const confirmCode = () => {
    if (!isLastQuestion) {
      if (result[curQuesId]?.status === 'completed') {
        setCurQuestionId(nextQuestionId);
      } else {
        toast({
          title: 'Please run this test before you submit',
          // description: "We've created your account for you.",
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
    } else {
      if (isAllCompleted) {
        commitResult();
      } else {
        onNotCompeletedModalOpen();
      }
    }
  };

  return (
    <>
      <div className='flex flex-col h-full'>
        <div className='flex flex-1 flex-row border-b-2 bg-gray-100'>
          <CodeDescription />
          <CodePlace />
          <CodeResult />
        </div>

        {/* actions */}
        <div className='w-full flex justify-between h-[60px] pt-2 pb-4 px-4 bg-gray-100'>
          <Button
            textColor={'white'}
            onClick={onDrawerOpen}
            bg='blue.500'
            _hover={{ bg: 'blue.700' }}
          >
            QUESTIONS LIST
          </Button>
          <Button
            bg='blue.500'
            _hover={{ bg: 'blue.700' }}
            textColor={'white'}
            onClick={confirmCode}
            loadingText='TEST RUNNING...'
            isLoading={isRunningTest}
          >
            Confirm
          </Button>
          <Button
            bg='blue.500'
            _hover={{ bg: 'blue.700' }}
            textColor={'white'}
            onClick={onWarningOpen}
          >
            GIVE UP
          </Button>
        </div>
      </div>

      {/* 放弃确认按钮 */}
      <Modal
        onClose={onNotCompeletedModalClose}
        isOpen={notCompeletedModal}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Incomplete prompt</ModalHeader>
          <ModalBody>
            If there are issues that have not been tested, should we directly
            submit them?
          </ModalBody>
          <ModalCloseButton />
          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() => {
                onNotCompeletedModalClose();
                onDrawerOpen();
              }}
            >
              YES, Continue
            </Button>
            <Button
              onClick={() => {
                onNotCompeletedModalClose();
                commitResult();
              }}
            >
              No, Just Commit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 放弃确认按钮 */}
      <Modal onClose={onWarningClose} isOpen={isWarningOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Give up</ModalHeader>
          <ModalBody>Are you sure to give up this test?</ModalBody>
          <ModalCloseButton />
          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() => router.push('/')}
              paddingX={10}
            >
              YES
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 题目列表 */}
      <Drawer
        isOpen={isDrawerOpen}
        placement='left'
        onClose={onDrawerClose}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Menu>
              {questions?.map((question, idx) => (
                <MenuItem
                  key={question.id}
                  onClick={() => {
                    setCurQuestionId(question.id);
                    onDrawerClose();
                  }}
                  className='line-clamp-1'
                >
                  {idx + 1}. {question?.title}{' '}
                  {result?.[question.id]?.status === 'completed' ? (
                    <CheckCircleIcon
                      className='mt-1 ml-4'
                      color={'green.400'}
                    />
                  ) : null}
                </MenuItem>
              ))}
            </Menu>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const { atom } = require('jotai');

export const curQuestionIdAtom = atom('');

export const questionsAtom = atom([]);

export const curQuestionDescription = atom((get) => {
  const curQuestion = get(questionsAtom).find(
    (item) => item.id === get(curQuestionIdAtom)
  );
  return curQuestion?.description || '';
});

export const isLastQuestionAtom = atom((get) => {
  const questions = get(questionsAtom);
  const curQuestionId = get(curQuestionIdAtom);

  if (!questions && !questions.length) {
    return false;
  }

  const lastQuestionId = questions?.[questions.length - 1]?.id;

  return curQuestionId === lastQuestionId;
});

export const userCodeAtom = atom({});

export const userResult = atom({});

export const isRunningTestAtom = atom(false);

export const isAllCompletedAtom = atom((get) => {
  const resultList = Object.values(get(userResult));
  return resultList?.every((ele) => ele?.status === 'completed');
});

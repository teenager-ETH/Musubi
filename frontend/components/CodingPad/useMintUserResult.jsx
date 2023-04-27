import { useWeb3Contract } from 'react-moralis';
import talentBadgeABI from '../../constants/TalentBadge.json';

export function useMintUserResult() {
  const { runContractFunction } = useWeb3Contract();

  async function mintResult(result, onSuccess, onError) {
    const mintOptions = {
      abi: talentBadgeABI,
      functionName: 'mintBadge',
      params: {
        skillLevel: result,
      },
    };

    await runContractFunction({
      params: mintOptions,
      onSuccess,
      onError,
    });
  }

  return mintResult;
}

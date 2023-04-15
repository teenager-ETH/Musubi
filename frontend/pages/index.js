import { useMoralis } from "react-moralis";
import BadgeHolder from "@/components/BadgeHolder";
import networkMapping from "../constants/networkMapping.json";
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries.js";
import { useQuery } from "@apollo/client";

export default function Home() {
  const { chainId, isWeb3Enabled } = useMoralis();
  const chainString = chainId ? parseInt(chainId).toString() : null;
  const talentsPoolAddress = chainId
    ? networkMapping[chainString].TalentsPool[0]
    : null;

  const { loading, error, data: listedBadges } = useQuery(GET_ACTIVE_ITEMS);

  console.log(loading);
  console.log(error);
  console.log(listedBadges);

  // Show recent listed badges, from s_badgeListings in the TalentsPool contract
  return (
    <div className="container mx-auto">
      <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
      {
        <div className="flex flex-wrap">
          {isWeb3Enabled && chainId ? (
            loading || !listedBadges ? ( // if it doesn't load or we don't have listed badges
              <div>Loading...</div>
            ) : (
              listedBadges.activeItems.map((badge) => {
                const { price, badgeAddress, badgeId, seller } = badge;
                return talentsPoolAddress ? (
                  <BadgeHolder
                    price={price} // from query
                    badgeAddress={badgeAddress} // from query
                    badgeId={badgeId} // from query
                    talentPoolAddress={talentsPoolAddress} // from networkMapping
                    seller={seller} // from query
                    key={`${badgeAddress}${badgeId}`} // from query
                  />
                ) : (
                  <div>
                    Network error, please switch to a supported network.{" "}
                  </div>
                );
              })
            )
          ) : (
            <div>Web3 Currently Not Enabled</div>
          )}
        </div>
      }
    </div>
  );
}

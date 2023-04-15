import { useQuery, gql } from "@apollo/client";

const GET_ACTIVE_ITEMS = gql`
    activeItems(first: 5, where: {clientAddress: "0x00000000"}) {
        id
        clientAddress
        talentAddress
        badgeAddress
        badgeId
        price
    }
`;

export default function GraphExample() {
  const { loading, error, data } = useQuery(GET_ACTIVE_ITEMS);
  console.log(data);
  return <div>hi</div>;
}

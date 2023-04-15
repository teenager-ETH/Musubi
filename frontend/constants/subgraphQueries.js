import { gql } from "@apollo/client";

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

export default GET_ACTIVE_ITEMS;

import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BadgeListed,
  BadgePrepaid,
  BadgeUnlisted
} from "../generated/TalentsPool/TalentsPool"

export function createBadgeListedEvent(
  talentAddress: Address,
  badgeAddress: Address,
  badgeId: BigInt,
  price: BigInt
): BadgeListed {
  let badgeListedEvent = changetype<BadgeListed>(newMockEvent())

  badgeListedEvent.parameters = new Array()

  badgeListedEvent.parameters.push(
    new ethereum.EventParam(
      "talentAddress",
      ethereum.Value.fromAddress(talentAddress)
    )
  )
  badgeListedEvent.parameters.push(
    new ethereum.EventParam(
      "badgeAddress",
      ethereum.Value.fromAddress(badgeAddress)
    )
  )
  badgeListedEvent.parameters.push(
    new ethereum.EventParam(
      "badgeId",
      ethereum.Value.fromUnsignedBigInt(badgeId)
    )
  )
  badgeListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return badgeListedEvent
}

export function createBadgePrepaidEvent(
  clientAddress: Address,
  badgeAddress: Address,
  badgeId: BigInt,
  talentAddress: Address,
  price: BigInt
): BadgePrepaid {
  let badgePrepaidEvent = changetype<BadgePrepaid>(newMockEvent())

  badgePrepaidEvent.parameters = new Array()

  badgePrepaidEvent.parameters.push(
    new ethereum.EventParam(
      "clientAddress",
      ethereum.Value.fromAddress(clientAddress)
    )
  )
  badgePrepaidEvent.parameters.push(
    new ethereum.EventParam(
      "badgeAddress",
      ethereum.Value.fromAddress(badgeAddress)
    )
  )
  badgePrepaidEvent.parameters.push(
    new ethereum.EventParam(
      "badgeId",
      ethereum.Value.fromUnsignedBigInt(badgeId)
    )
  )
  badgePrepaidEvent.parameters.push(
    new ethereum.EventParam(
      "talentAddress",
      ethereum.Value.fromAddress(talentAddress)
    )
  )
  badgePrepaidEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return badgePrepaidEvent
}

export function createBadgeUnlistedEvent(
  talentAddress: Address,
  badgeAddress: Address,
  badgeId: BigInt
): BadgeUnlisted {
  let badgeUnlistedEvent = changetype<BadgeUnlisted>(newMockEvent())

  badgeUnlistedEvent.parameters = new Array()

  badgeUnlistedEvent.parameters.push(
    new ethereum.EventParam(
      "talentAddress",
      ethereum.Value.fromAddress(talentAddress)
    )
  )
  badgeUnlistedEvent.parameters.push(
    new ethereum.EventParam(
      "badgeAddress",
      ethereum.Value.fromAddress(badgeAddress)
    )
  )
  badgeUnlistedEvent.parameters.push(
    new ethereum.EventParam(
      "badgeId",
      ethereum.Value.fromUnsignedBigInt(badgeId)
    )
  )

  return badgeUnlistedEvent
}

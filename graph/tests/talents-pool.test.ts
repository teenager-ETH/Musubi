import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { BadgeListed } from "../generated/schema"
import { BadgeListed as BadgeListedEvent } from "../generated/TalentsPool/TalentsPool"
import { handleBadgeListed } from "../src/talents-pool"
import { createBadgeListedEvent } from "./talents-pool-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let talentAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let badgeAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let badgeId = BigInt.fromI32(234)
    let price = BigInt.fromI32(234)
    let newBadgeListedEvent = createBadgeListedEvent(
      talentAddress,
      badgeAddress,
      badgeId,
      price
    )
    handleBadgeListed(newBadgeListedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BadgeListed created and stored", () => {
    assert.entityCount("BadgeListed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BadgeListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "talentAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BadgeListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "badgeAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BadgeListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "badgeId",
      "234"
    )
    assert.fieldEquals(
      "BadgeListed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

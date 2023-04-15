import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  BadgeListed as BadgeListedEvent,
  BadgeUnlisted as BadgeUnlistedEvent,
  BadgePrepaid as BadgePrepaidEvent,
} from "../generated/TalentsPool/TalentsPool";
import {
  BadgeListed,
  ActiveItem,
  BadgeUnlisted,
  BadgePrepaid,
} from "../generated/schema";

export function handleBadgeListed(event: BadgeListedEvent): void {
  // Save the event to our graph
  // Update Activeitems

  // Get or create an BadgeListed object
  // each badge has a unique id

  // Typescript: BadgeListedEvent and BadgeListedObject are two different things
  // BadgeListedEvent: raw event
  // BadgeListedObject: what we save, auto created in schema.ts

  let badgeListed = BadgeListed.load(
    getIdFromEventParams(event.params.badgeId, event.params.badgeAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.badgeId, event.params.badgeAddress)
  );
  if (!badgeListed) {
    badgeListed = new BadgeListed(
      getIdFromEventParams(event.params.badgeId, event.params.badgeAddress)
    );
  }
  // before list the badge, there shouldn't be an active item so we also need to generate one.
  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.badgeId, event.params.badgeAddress)
    );
  }

  badgeListed.talentAddress = badgeListed.talentAddress;
  activeItem.talentAddress = event.params.talentAddress;

  badgeListed.badgeAddress = event.params.badgeAddress;
  activeItem.badgeAddress = event.params.badgeAddress;

  badgeListed.badgeId = event.params.badgeId;
  activeItem.badgeId = event.params.badgeId;

  badgeListed.price = event.params.price;
  activeItem.price = event.params.price;

  badgeListed.save();
  activeItem.save();
}

export function handleBadgeUnlisted(event: BadgeUnlistedEvent): void {
  let badgeUnlisted = BadgeUnlisted.load(
    getIdFromEventParams(event.params.badgeId, event.params.badgeAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.badgeId, event.params.badgeAddress)
  );
  if (!badgeUnlisted) {
    badgeUnlisted = new BadgeUnlisted(
      getIdFromEventParams(event.params.badgeId, event.params.badgeAddress)
    );
  }
  badgeUnlisted.talentAddress = event.params.talentAddress;
  badgeUnlisted.badgeAddress = event.params.badgeAddress;
  badgeUnlisted.badgeId = event.params.badgeId;
  activeItem!.clientAddress = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
    // clientAddress: Dead address, which means the Badge is unlisted
    // Empty address, listed on the market
    // Real address, prepaid by someone
  );

  badgeUnlisted.save();
  activeItem!.save();
}

export function handleBadgePrepaid(event: BadgePrepaidEvent): void {
  // Save the event to our graph
  // Update Activeitems

  let badgePrepaid = BadgePrepaid.load(
    getIdFromEventParams(event.params.badgeId, event.params.badgeAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.badgeId, event.params.badgeAddress)
  );
  if (!badgePrepaid) {
    badgePrepaid = new BadgePrepaid(
      getIdFromEventParams(event.params.badgeId, event.params.badgeAddress)
    );
  }

  badgePrepaid.clientAddress = event.params.clientAddress;
  badgePrepaid.badgeAddress = event.params.badgeAddress;
  badgePrepaid.badgeId = event.params.badgeId;
  badgePrepaid.talentAddress = badgePrepaid.talentAddress;
  activeItem!.clientAddress = event.params.clientAddress;

  badgePrepaid.save();
  activeItem!.save();

  activeItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  badgePrepaid.save(); // save the event converted object to the graph
  activeItem!.save();
}

function getIdFromEventParams(badgeId: BigInt, badgeAddress: Address): string {
  return badgeId.toHexString() + badgeAddress.toHexString(); // it will be unique
}

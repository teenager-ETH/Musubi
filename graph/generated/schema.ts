// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class ActiveItem extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save ActiveItem entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type ActiveItem must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ActiveItem", id.toString(), this);
    }
  }

  static load(id: string): ActiveItem | null {
    return changetype<ActiveItem | null>(store.get("ActiveItem", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get clientAddress(): Bytes {
    let value = this.get("clientAddress");
    return value!.toBytes();
  }

  set clientAddress(value: Bytes) {
    this.set("clientAddress", Value.fromBytes(value));
  }

  get talentAddress(): Bytes {
    let value = this.get("talentAddress");
    return value!.toBytes();
  }

  set talentAddress(value: Bytes) {
    this.set("talentAddress", Value.fromBytes(value));
  }

  get badgeAddress(): Bytes {
    let value = this.get("badgeAddress");
    return value!.toBytes();
  }

  set badgeAddress(value: Bytes) {
    this.set("badgeAddress", Value.fromBytes(value));
  }

  get badgeId(): BigInt {
    let value = this.get("badgeId");
    return value!.toBigInt();
  }

  set badgeId(value: BigInt) {
    this.set("badgeId", Value.fromBigInt(value));
  }

  get price(): BigInt | null {
    let value = this.get("price");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set price(value: BigInt | null) {
    if (!value) {
      this.unset("price");
    } else {
      this.set("price", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class BadgeListed extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save BadgeListed entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BadgeListed must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("BadgeListed", id.toString(), this);
    }
  }

  static load(id: string): BadgeListed | null {
    return changetype<BadgeListed | null>(store.get("BadgeListed", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get talentAddress(): Bytes {
    let value = this.get("talentAddress");
    return value!.toBytes();
  }

  set talentAddress(value: Bytes) {
    this.set("talentAddress", Value.fromBytes(value));
  }

  get badgeAddress(): Bytes {
    let value = this.get("badgeAddress");
    return value!.toBytes();
  }

  set badgeAddress(value: Bytes) {
    this.set("badgeAddress", Value.fromBytes(value));
  }

  get badgeId(): BigInt {
    let value = this.get("badgeId");
    return value!.toBigInt();
  }

  set badgeId(value: BigInt) {
    this.set("badgeId", Value.fromBigInt(value));
  }

  get price(): BigInt | null {
    let value = this.get("price");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set price(value: BigInt | null) {
    if (!value) {
      this.unset("price");
    } else {
      this.set("price", Value.fromBigInt(<BigInt>value));
    }
  }
}

export class BadgeUnlisted extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save BadgeUnlisted entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BadgeUnlisted must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("BadgeUnlisted", id.toString(), this);
    }
  }

  static load(id: string): BadgeUnlisted | null {
    return changetype<BadgeUnlisted | null>(store.get("BadgeUnlisted", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get talentAddress(): Bytes {
    let value = this.get("talentAddress");
    return value!.toBytes();
  }

  set talentAddress(value: Bytes) {
    this.set("talentAddress", Value.fromBytes(value));
  }

  get badgeAddress(): Bytes {
    let value = this.get("badgeAddress");
    return value!.toBytes();
  }

  set badgeAddress(value: Bytes) {
    this.set("badgeAddress", Value.fromBytes(value));
  }

  get badgeId(): BigInt {
    let value = this.get("badgeId");
    return value!.toBigInt();
  }

  set badgeId(value: BigInt) {
    this.set("badgeId", Value.fromBigInt(value));
  }
}

export class BadgePrepaid extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save BadgePrepaid entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type BadgePrepaid must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("BadgePrepaid", id.toString(), this);
    }
  }

  static load(id: string): BadgePrepaid | null {
    return changetype<BadgePrepaid | null>(store.get("BadgePrepaid", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get clientAddress(): Bytes {
    let value = this.get("clientAddress");
    return value!.toBytes();
  }

  set clientAddress(value: Bytes) {
    this.set("clientAddress", Value.fromBytes(value));
  }

  get badgeAddress(): Bytes {
    let value = this.get("badgeAddress");
    return value!.toBytes();
  }

  set badgeAddress(value: Bytes) {
    this.set("badgeAddress", Value.fromBytes(value));
  }

  get badgeId(): BigInt {
    let value = this.get("badgeId");
    return value!.toBigInt();
  }

  set badgeId(value: BigInt) {
    this.set("badgeId", Value.fromBigInt(value));
  }

  get talentAddress(): Bytes {
    let value = this.get("talentAddress");
    return value!.toBytes();
  }

  set talentAddress(value: Bytes) {
    this.set("talentAddress", Value.fromBytes(value));
  }

  get price(): BigInt | null {
    let value = this.get("price");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set price(value: BigInt | null) {
    if (!value) {
      this.unset("price");
    } else {
      this.set("price", Value.fromBigInt(<BigInt>value));
    }
  }
}

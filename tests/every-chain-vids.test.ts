import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { CommentAdded } from "../generated/schema"
import { CommentAdded as CommentAddedEvent } from "../generated/EveryChainVids/EveryChainVids"
import { handleCommentAdded } from "../src/every-chain-vids"
import { createCommentAddedEvent } from "./every-chain-vids-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let text = "Example string value"
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let newCommentAddedEvent = createCommentAddedEvent(text, user)
    handleCommentAdded(newCommentAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CommentAdded created and stored", () => {
    assert.entityCount("CommentAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CommentAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "text",
      "Example string value"
    )
    assert.fieldEquals(
      "CommentAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})

import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CommentAdded,
  VideoUploaded
} from "../generated/EveryChainVids/EveryChainVids"

export function createCommentAddedEvent(
  text: string,
  user: Address
): CommentAdded {
  let commentAddedEvent = changetype<CommentAdded>(newMockEvent())

  commentAddedEvent.parameters = new Array()

  commentAddedEvent.parameters.push(
    new ethereum.EventParam("text", ethereum.Value.fromString(text))
  )
  commentAddedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return commentAddedEvent
}

export function createVideoUploadedEvent(
  assetId: string,
  title: string,
  videoUrl: string,
  description: string,
  creator: Address,
  views: BigInt
): VideoUploaded {
  let videoUploadedEvent = changetype<VideoUploaded>(newMockEvent())

  videoUploadedEvent.parameters = new Array()

  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("assetId", ethereum.Value.fromString(assetId))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("videoUrl", ethereum.Value.fromString(videoUrl))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  videoUploadedEvent.parameters.push(
    new ethereum.EventParam("views", ethereum.Value.fromUnsignedBigInt(views))
  )

  return videoUploadedEvent
}

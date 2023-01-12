import {
  CommentAdded as CommentAddedEvent,
  VideoUploaded as VideoUploadedEvent
} from "../generated/EveryChainVids/EveryChainVids"
import { CommentAdded, VideoUploaded } from "../generated/schema"

export function handleCommentAdded(event: CommentAddedEvent): void {
  let entity = new CommentAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.text = event.params.text
  entity.user = event.params.user

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVideoUploaded(event: VideoUploadedEvent): void {
  let entity = new VideoUploaded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.assetId = event.params.assetId
  entity.title = event.params.title
  entity.videoUrl = event.params.videoUrl
  entity.description = event.params.description
  entity.creator = event.params.creator
  entity.views = event.params.views

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

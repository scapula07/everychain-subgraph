
# Everychain subgraph - TheGraph

Our subgraph indexed data of videos uplaoded on our platform.


![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/telemed%2FScreen%20Shot%202023-01-13%20at%2011.55.37%20AM.png?alt=media&token=a155b0c3-89a9-446f-8bf3-d4a5f8c95ab9)


![openpoll](https://firebasestorage.googleapis.com/v0/b/scapula-57ce3.appspot.com/o/telemed%2FScreen%20Shot%202023-01-13%20at%2012.05.10%20PM.png?alt=media&token=dd7c9d69-ef13-400e-a4de-a73aec6320f9)





  solidity contract code
````sol

     //SPDX-License-Identifier: MIT
       pragma solidity >=0.7.0 <0.9.0;
       pragma abicoder v2;



    contract EveryChainVids{
      
        uint public videoCount=0;
        string public name="Scapula videos";

   struct Video{
        string assetId;
        string title;
        string videoUrl;
        string description;
        address creator;
        uint views;
      

    }



     event VideoUploaded(
        string assetId,
        string title,
        string videoUrl,
        string description,
        address creator,
        uint views

   );


      struct Comment {
        string text;
        address user;
    }
   

    
     event CommentAdded(
         string text,
         address user

   );


  

      mapping(bytes32 => Video) public videos;
      mapping(bytes32 => Comment) comments;


    function uploadVideo(bytes32 _hash,string memory _assetId,  string memory _title, string memory  _videoUrl,string memory _description ) public {

            require(bytes( _assetId).length > 0);
        
            require(bytes(_title).length > 0);
        
            require(msg.sender!=address(0));

        
            videoCount ++;

            // Add video to the contract
           

            videos[ _hash] = Video(_assetId,_title,_videoUrl,_description, msg.sender,0);
            // Trigger an event
            emit VideoUploaded(_assetId,_title,_videoUrl, _description, msg.sender,0);
  }


  function updateViews(bytes32 _hash) public {
        
        require(_hash != 0x0);
        videos[_hash].views += 1;

    }


       function addComment(bytes32 _hash,address _user,string memory _text) public {
          require(_hash != 0x0);
          require(_user != address(0));
          require(bytes(_text).length > 0);
    //     videos[_hash].comments[_user] = Comment(_text, _user);
           comments[_hash] = Comment(_text,_user);
            // Trigger an event
          emit CommentAdded(_text,_user);

    }
    }
````


````gql
   type CommentAdded @entity(immutable: true) {
  id: Bytes!
  text: String! # string
  user: Bytes! # address
  blockNumber: BigInt!
  blockTimestamp: BigInt!
  transactionHash: Bytes!
}

type VideoUploaded @entity(immutable: true) {
  id: Bytes!
  assetId: String! # string
  title: String! # string
  videoUrl: String! # string
  description: String! # string
  creator: Bytes! # address
  views: BigInt! # uint256
  blockNumber: BigInt!
  blockTimestamp: BigInt!
  transactionHash: Bytes!
}

````



````ts

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



````






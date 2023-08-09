import React from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  RedditShareButton
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  RedditIcon
} from 'react-share';

export default function Share({url}) {
  console.log(url);
  return (
    <>
    <TwitterShareButton
      url={url}
      quote={"MY MUSIC"}
      hashtag="#harmoni"
    >
      <TwitterIcon size={32} round  />
    </TwitterShareButton>

    <FacebookShareButton
      url={url}
      quote={"MY MUSIC"}
      hashtag="#harmoni"
    >
      <FacebookIcon size={32} round />
    </FacebookShareButton>
    <WhatsappShareButton
      url={url}
      quote={"MY MUSIC"}
      hashtag="#harmoni"
    >
      <WhatsappIcon size={32} round />
    </WhatsappShareButton>
    <RedditShareButton
      url={url}
      quote={"MY MUSIC"}
      hashtag="#harmoni"
    >
      <RedditIcon size={32} round />
    </RedditShareButton>
    </>
  )
}
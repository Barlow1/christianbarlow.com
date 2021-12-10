import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const socials = {
  linkedin: {
    link: "https://www.linkedin.com/in/christianbarlow",
  },
  twitter: {
    link: "https://twitter.com/TheRealBarlow_",
  },
  github: {
    link: "https://github.com/Barlow1",
  },
  email: {
    link: "mailto:c.barlow108%40gmail.com?subject=ChristianBarlow.com",
  },
};

export function SocialBar() {
  return (
    <div className="flex justify-between p-3 pt-5">
      <a href={socials.github.link}>
        <FontAwesomeIcon icon={faGithub} size="3x"></FontAwesomeIcon>
      </a>
      <a href={socials.linkedin.link}>
        <FontAwesomeIcon icon={faLinkedin} size="3x"></FontAwesomeIcon>
      </a>
      <a href={socials.twitter.link}>
        <FontAwesomeIcon icon={faTwitter} size="3x"></FontAwesomeIcon>
      </a>
      <a href={socials.email.link}>
        <FontAwesomeIcon icon={faPaperPlane} size="3x"></FontAwesomeIcon>
      </a>
    </div>
  );
}

export default SocialBar;

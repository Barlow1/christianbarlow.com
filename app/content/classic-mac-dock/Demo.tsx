import React, { useEffect } from "react";
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
    label: "LinkedIn",
  },
  twitter: {
    link: "https://twitter.com/TheRealBarlow_",
    label: "Twitter",
  },
  github: {
    link: "https://github.com/Barlow1",
    label: "Github",
  },
  email: {
    link: 'contact',
    label: "Email me!",
  },
};

export function SocialBar() {
  useEffect(() => {
    function addPrevClass(e: any) {
      var target = e.target;
      if (target.tagName === "svg") {
        // check if it is an icon
        var li = target.parentNode.parentNode;
        var prevLi = li.previousElementSibling;
        if (prevLi) {
          prevLi.className = "prev";
        }

        target.addEventListener(
          "mouseout",
          function () {
            if (prevLi) {
              prevLi.removeAttribute("class");
            }
          },
          false
        );
      }
    }
    if (window && document) {
      document
        .getElementsByClassName("dock")[0]
        ?.addEventListener("mouseover", addPrevClass, false);
    }

    return () => {
      // DESTROY
      document
      .getElementsByClassName("dock")[0]
      ?.removeEventListener("mouseover", addPrevClass, false);
    };
  }, []);
  return (
    <div className="dock-container z-50">
      <div className="dock">
        <ul>
          <li>
            <span>{socials.github.label}</span>
            <a href={socials.github.link}>
              <FontAwesomeIcon icon={faGithub} size="3x"></FontAwesomeIcon>
            </a>
          </li>
          <li>
            <span>{socials.linkedin.label}</span>
            <a href={socials.linkedin.link}>
              <FontAwesomeIcon icon={faLinkedin} size="3x"></FontAwesomeIcon>
            </a>
          </li>
          <li>
            <span>{socials.twitter.label}</span>
            <a href={socials.twitter.link}>
              <FontAwesomeIcon icon={faTwitter} size="3x"></FontAwesomeIcon>
            </a>
          </li>
          <li>
            <span>{socials.email.label}</span>
            <a href={socials.email.link}>
              <FontAwesomeIcon icon={faPaperPlane} size="3x"></FontAwesomeIcon>
            </a>
          </li>
        </ul>
        <div className="base"></div>
      </div>
    </div>
  );
}

export default SocialBar;
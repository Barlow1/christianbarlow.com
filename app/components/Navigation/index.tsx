import {
  Menu,
  MenuButton,
  MenuItems,
  MenuLink,
  MenuPopover,
} from "@reach/menu-button";
import React from "react";
import { Link } from "remix";
import { routes } from "~/routes";
import { Sling as Hamburger } from "hamburger-react";
import { Transition, animated } from "@react-spring/web";

const linkComponents = {
  home: (
    <Link to={`${routes.home.path}`} className="underlined">
      {routes.home.title}
    </Link>
  ),
  posts: (
    <Link to={`${routes.posts.path}`} className="underlined">
      {routes.posts.title}
    </Link>
  ),
  projects: (
    <Link to={`${routes.projects.path}`} className="underlined">
      {routes.projects.title}
    </Link>
  ),
  contact: (
    <Link to={`${routes.contact.path}`} className="underlined">
      {routes.contact.title}
    </Link>
  ),
};

export function MobileNavigation() {
  return (
    <div className="md:hidden">
      <Menu>
        {({ isExpanded }) => (
          <>
            <MenuButton>
              <Hamburger
                aria-label="navigation menu"
                aria-controls="nav-menu"
                aria-expanded={isExpanded ? "true" : undefined}
                aria-haspopup="true"
                toggled={isExpanded}
              />
            </MenuButton>
            {isExpanded && (
              <MenuPopover
                position={(r) => ({
                  top: `calc(${Number(r?.top) + Number(r?.height)}px + 1.5rem)`,
                  left: 0,
                  bottom: 0,
                  right: 0,
                })}
                className="z-50 bg-primary block md:hidden"
              >
                <Transition
                  items={isExpanded}
                  from={{
                    transform: "translate3d(0,100px,0)",
                  }}
                  enter={{ transform: "translate3d(0,0px,0)" }}
                  leave={{ transform: "translate3d(0,100px,0)" }}
                  reverse={true}
                >
                  {(styles) => (
                    <animated.div style={styles}>
                      <MenuItems className="p-0 bg-transparent border-none focus:outline-none">
                        {Object.entries(routes).map(([name, page]) => {
                          return (
                            <MenuLink
                              key={name}
                              className="flex p-9 hover:bg-secondary border-b border-gray-200 text-primary dark:border-gray-600 hover:no-underline"
                              as={Link}
                              to={page.path}
                            >
                              {page.title}
                            </MenuLink>
                          );
                        })}
                      </MenuItems>
                    </animated.div>
                  )}
                </Transition>
              </MenuPopover>
            )}
          </>
        )}
      </Menu>
    </div>
  );
}

export function DesktopNavigation() {
  return (
    <nav
      aria-label="Main navigation"
      className="remix-app__header-nav hidden md:flex"
    >
      <ul>
        <li>{linkComponents.home}</li>
        <li>{linkComponents.posts}</li>
        <li>{linkComponents.projects}</li>
        <li>{linkComponents.contact}</li>
      </ul>
    </nav>
  );
}

export function Navigation() {
  return (
    <>
      <MobileNavigation />
      <DesktopNavigation />
    </>
  );
}
export default Navigation;

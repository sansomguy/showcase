import { Slot, component$ } from "@builder.io/qwik";
import {
  ContentMenu,
  Link,
  RouteLocation,
  useContent,
  useLocation,
  type LinkProps,
} from "@builder.io/qwik-city";

type NavLinkProps = LinkProps & { activeClass?: string };
export const NavLink = component$(({ activeClass, ...props }: NavLinkProps) => {
  const location = useLocation();
  const locationPathName = ensureConsistentStructure(location.url.pathname);
  const linkPathName =
    (props.href &&
      ensureConsistentStructure(
        new URL(props.href, location.url.origin).pathname
      )) ||
    "";

  const isActive = linkPathName === locationPathName;

  const isParentLink =
    linkPathName && locationPathName.startsWith(linkPathName);

  return (
    <Link
      {...props}
      class={`${props.class || ""} ${isActive || isParentLink ? activeClass : ""}`}
    >
      <Slot />
    </Link>
  );
});

function removeStartingSlash(pathname: string) {
  if (!pathname.startsWith("/")) {
    return `/${pathname}`;
  }
  return pathname;
}

function removeTrailingSlash(pathname: string) {
  if (!pathname.endsWith("/")) {
    return pathname;
  }
  return pathname.slice(0, -1);
}

function ensureConsistentStructure(pathname: string) {
  return removeTrailingSlash(removeStartingSlash(pathname));
}

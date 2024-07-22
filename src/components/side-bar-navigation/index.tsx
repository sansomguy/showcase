import { component$, JSX, useStyles$ } from "@builder.io/qwik";
import { type ContentMenu, useContent } from "@builder.io/qwik-city";
import styles from "./style.css?inline";
import { NavLink } from "../nav-link";

const isDivider = (item: any): item is { items: Array<ContentMenu> } => {
  return !("href" in item) || item.items?.length > 0;
};
// const isCurrent = (item: ContentMenu, fullPath: string) => item.href && fullPath.includes(item.href);

type MenuItem = {
  title: string;
  href: string;
  children: MenuItem[];
};

function traverseMenu(
  item: ContentMenu,
  options?: {
    startingWith?: string;
  }
): MenuItem {
  const parentItem: MenuItem = {
    title: item.text,
    href: "",
    children: [],
  };

  if (isDivider(item)) {
    const childrenMap = new Map<string, MenuItem>();
    item.items
      .map((x) => traverseMenu(x, options))
      .forEach((child) => {
        if (childrenMap.has(child.title)) {
          const existing = childrenMap.get(child.title)!;
          existing.href =
            existing.href?.length > 0 ? existing.href : child.href;
          existing.children =
            existing.children?.length > 0 ? existing.children : child.children;
          childrenMap.set(child.title, existing);
        } else {
          childrenMap.set(child.title, child);
        }
      });
    const children = Array.from(childrenMap.values());
    const parentHref = children.find(
      (child) => child.title === parentItem.title
    )?.href;
    parentItem.href = parentHref ?? "";
    parentItem.children = children
      .filter((child) => child.title !== parentItem.title)
      .filter((x) =>
        options?.startingWith
          ? x.href.length < options.startingWith.length
            ? options.startingWith.startsWith(x.href)
            : x.href.startsWith(options.startingWith)
          : true
      );
  } else {
    return {
      title: item.text,
      href: item.href!,
      children: [],
    };
  }

  return parentItem;
}

function renderItem(layer: number = 0, skipLayers: number = 0) {
  return (item: MenuItem): JSX.Element => {
    if (layer < skipLayers) {
      return <>{item.children.map(renderItem(layer + 1, skipLayers))}</>;
    }

    if (item.children.length === 0) {
      return (
        <li key={item.title}>
          <NavLink activeClass="current" href={item.href}>
            {item.title}
          </NavLink>
        </li>
      );
    }

    return (
      <li key={item.title}>
        <NavLink activeClass="current" href={item.href}>
          {item.title}
        </NavLink>
        <ul>{item.children.map(renderItem(layer + 1))}</ul>
      </li>
    );
  };
}
type Props = {
  skipLayers?: number;
  startingWith?: string;
};
export default component$((props: Props) => {
  useStyles$(styles);
  const menu = useContent();
  const menuItem = menu.menu
    ? traverseMenu(menu.menu, {
        startingWith: props.startingWith,
      })
    : null;

  return (
    <div class="notice side-bar-nav" style={{ marginTop: 0 }}>
      <ul>
        {menuItem ? renderItem(0, props.skipLayers ?? 1)(menuItem) : null}
      </ul>
    </div>
  );
});

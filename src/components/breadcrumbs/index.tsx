import { component$, useStyles$ } from "@builder.io/qwik";
import {
  type ContentMenu,
  useContent,
} from "@builder.io/qwik-city";
import styles from "./style.css?inline";


const isDivider = (item: any): item is { items: Array<ContentMenu> } => {
  return !!item && !('href' in item)
};
// const isCurrent = (item: ContentMenu, fullPath: string) => item.href && fullPath.includes(item.href);

type MenuItem = {
  title: string;
  href: string;
  children: MenuItem[];
}

function traverseMenu(item: ContentMenu): MenuItem {
  const parentItem: MenuItem = {
    title: item.text,
    href: '',
    children: []
  }

  if(isDivider(item)) {
    // then contains items
    const children = item.items.map(traverseMenu)
    
    const href = children.find(child => child.title === parentItem.title)?.href;
    parentItem.href = href || '';

    parentItem.children = children.filter(child => child.href !== href);

  }else {
    return {
      title: item.text,
      href: item.href!,
      children: item.items?.map(traverseMenu) ?? []
    }
  }

    return parentItem;
  
}

export default component$(() => {
  useStyles$(styles);
  const menu = useContent();
  const menuItems = menu.menu ? traverseMenu(menu.menu) : null;

  return (
    <div class="breadcrumbs">
      <div>
      <pre>
        {JSON.stringify(menu.menu, null, 2)}
      </pre>
      </div>
      <br/>
      <div>
      <pre>
        {JSON.stringify(menuItems, null, 2)}
      </pre>
      </div>
    </div>
  );
});

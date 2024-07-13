import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <div>
        <h1>My Website</h1>
        </div>
    );
})

export const head: DocumentHead = {
    title: "My Website",
    frontmatter: {
    },
    meta: [
        {
            name: "My Website",
            content: "The website you are currently viewing.",
        },
    ],
}
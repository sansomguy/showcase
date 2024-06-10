import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";
import styles from "./style.css?inline"
import Title from "~/components/title";

export default component$(() => {
  useStylesScoped$(styles)
  return (
    <section>
      <div class="brain">
        <svg
          viewBox="0 0 200 110"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#f5b5fc;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#ff88e1;stop-opacity:1" />
            </linearGradient>
          </defs>
          <g>
            <path
              d="M100 20c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40z"
              fill="url(#gradient1)"
            />
            <path
              d="M80 30c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"
              fill="url(#gradient1)"
              transform="translate(-10 10)"
            />
            <path
              d="M120 30c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"
              fill="url(#gradient1)"
              transform="translate(10 10)"
            />
            <path
              d="M80 90c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"
              fill="url(#gradient1)"
              transform="scale(.5) translate(20 60) "
            />
          </g>
        </svg>
      </div>
      <Title title="Thoughts" />
      
      
      

      <p>I swear, I have some thoughts.<br/>I just haven't written them down yet...</p>
    </section>
  );
});

import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { useContent } from "@builder.io/qwik-city";
import styles from "./style.css?inline"
import Title from "~/components/title";
import Brain from "~/media/brain.svg?jsx";

export default component$(() => {
  useStylesScoped$(styles)
  return (
    <>    
      <div class="brain">
        <Brain />
      </div>
      <Title title="Thoughts" />
      
      
      

      <p>I swear, I have some thoughts.<br/>I just haven't written them down yet...</p>
    </>
  );
});

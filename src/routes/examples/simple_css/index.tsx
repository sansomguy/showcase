import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./style.css?inline";
import dogImage from "./dog-ipad.jpg?inline";
import gooseImage from "./goose.jpg?inline";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <header>
      
        <h1>Simple.css Demo</h1>
        <p>A showcase of Simple.css formatting in action and how to use it.</p>
      </header>
      <main>
        <p class="notice">
          This demo page details a select set of elements that are meant to show
          off Simple.css’s styling, and provide HTML to help you get started
          easily. If you want a comprehensive demonstration of elements that may
          or may not be styled by Simple.css, please see{" "}
          <a href="https://test.simplecss.org">our test page</a>.
        </p>

        <p>
          This page is a demonstration of the elements that can be formatted
          using Simple.css. Each section includes a code block on how to include
          it in your site’s design.
        </p>

        <p>
          This may be a little basic for some people, but I wanted the barrier
          for entry to be as low as possible for this project.
        </p>

        <h2 id="basic-typography">Basic Typography</h2>

        <p>
          All the typography of Simple.css uses{" "}
          <code class="language-plaintext highlighter-rouge">rem</code> for
          sizing. This means that accessibility is maintained for those who
          change their browser font size. The{" "}
          <code class="language-plaintext highlighter-rouge">body</code> element
          has a size of{" "}
          <code class="language-plaintext highlighter-rouge">1.15rem</code>{" "}
          which makes all the standard font sizes slightly larger. This equates
          to <code class="language-plaintext highlighter-rouge">18.4px</code>{" "}
          for paragraph text, instead of the standard{" "}
          <code class="language-plaintext highlighter-rouge">16px</code>.
        </p>

        <p>
          The heading elements also have an increased top margin in order to
          break blocks of text up better.
        </p>

        <h1 id="heading-1-3rem">
          Heading 1{" "}
          <code class="language-plaintext highlighter-rouge">3rem</code>
        </h1>

        <h2 id="heading-2-26rem">
          Heading 2{" "}
          <code class="language-plaintext highlighter-rouge">2.6rem</code>
        </h2>

        <h3 id="heading-3-2rem">
          Heading 3{" "}
          <code class="language-plaintext highlighter-rouge">2rem</code>
        </h3>

        <h4 id="heading-4-144rem">
          Heading 4{" "}
          <code class="language-plaintext highlighter-rouge">1.44rem</code>
        </h4>

        <h5 id="heading-5-115rem">
          Heading 5{" "}
          <code class="language-plaintext highlighter-rouge">1.15rem</code>
        </h5>

        <h6 id="heading-6-096rem">
          Heading 6{" "}
          <code class="language-plaintext highlighter-rouge">0.96rem</code>
        </h6>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                &lt;h2&gt;This is a H2 header&lt;h2&gt; &lt;p&gt;This is some
                paragraph text.&lt;/p&gt;
              </code>
            </pre>
          </div>
        </div>

        <h3 id="links--buttons">Links &amp; Buttons</h3>

        <p>
          Links are formatted very simply on Simple.css (shock horror). They use
          the <code class="language-plaintext highlighter-rouge">accent</code>{" "}
          CSS variable and are underlined. There is a{" "}
          <code class="language-plaintext highlighter-rouge">:hover</code>{" "}
          effect that removes the underline.
        </p>

        <p>
          Buttons use the same{" "}
          <code class="language-plaintext highlighter-rouge">accent</code> CSS
          variable for their colour. When hovering, there is an opacity effect.
        </p>

        <p>
          <a href="https://example.com">I’m a hyperlink</a>
        </p>

        <p>
          <button>I’m a button</button>
        </p>

        <p>
          <a class="button" href="https://example.com">
            I’m a button with a link
          </a>
        </p>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                &lt;a href="https://example.com"&gt;I'm a hyperlink&lt;/a&gt;
                &lt;button&gt;I'm a button&lt;/button&gt; &lt;a class="button"
                href="https://example.com"&gt;I'm a button with a link&lt;/a&gt;
              </code>
            </pre>
          </div>
        </div>

        <h2 id="other-typography-elements">Other typography elements</h2>

        <p>
          There are a number of other typography elements that you can use with
          Simple.css. Some of the common ones are:
        </p>

        <ul>
          <li>
            All the standard stuff, like <strong>bold</strong>, <em>italic</em>{" "}
            and <u>underlined</u> text.
          </li>
          <li>
            <mark>Highlighting text</mark> using the{" "}
            <code class="language-plaintext highlighter-rouge">mark</code>{" "}
            element.
          </li>
          <li>
            Adding{" "}
            <code class="language-plaintext highlighter-rouge">
              inline code
            </code>{" "}
            using the{" "}
            <code class="language-plaintext highlighter-rouge">code</code>{" "}
            element.
          </li>
          <li>
            Displaying keyboard commands like <kbd>ALT+F4</kbd> using the{" "}
            <code class="language-plaintext highlighter-rouge">kbd</code>{" "}
            element.
          </li>
        </ul>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                &lt;b&gt;Bold text&lt;/b&gt; &lt;i&gt;Italic text&lt;/i&gt;
                &lt;u&gt;Underlined text&lt;/u&gt; &lt;mark&gt;Highlighted
                text&lt;/mark&gt; &lt;code&gt;Inline code&lt;/code&gt;
                &lt;kbd&gt;Alt+F4&lt;/kbd&gt;
              </code>
            </pre>
          </div>
        </div>

        <h3 id="lists">Lists</h3>

        <p>We all love a good list, right? I know my wife does!</p>

        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>

        <ol>
          <li>Do this thing</li>
          <li>Do that thing</li>
          <li>Do the other thing</li>
        </ol>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                # Bulleted list &lt;ul&gt; &lt;li&gt;Item 1&lt;/li&gt;
                &lt;li&gt;Item 2&lt;/li&gt; &lt;li&gt;Item 3&lt;/li&gt;
                &lt;/ul&gt; # Numbered list &lt;ol&gt; &lt;li&gt;Do this
                thing&lt;/li&gt; &lt;li&gt;Do that thing&lt;/li&gt; &lt;li&gt;Do
                the other thing&lt;/li&gt; &lt;/ol&gt;
              </code>
            </pre>
          </div>
        </div>
        <h3 id="blockquotes">Blockquotes</h3>

        <p>
          Sometimes you may want to quote someone else in your HTML. For this we
          use the{" "}
          <code class="language-plaintext highlighter-rouge">blockquote</code>{" "}
          element. Here’s what a quote looks like with Simple.css:
        </p>

        <blockquote>
          <p>Friends don’t spy; true friendship is about privacy, too.</p>

          <p>
            <cite>– Stephen King</cite>
          </p>
        </blockquote>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                &lt;blockquote&gt; &lt;p&gt;Friends don’t spy; true friendship
                is about privacy, too.&lt;/p&gt; &lt;p&gt;&lt;cite&gt;– Stephen
                King&lt;/cite&gt;&lt;/p&gt; &lt;/blockquote&gt;
              </code>
            </pre>
          </div>
        </div>

        <h3 id="code-blocks">Code blocks</h3>

        <p>
          Code blocks are different from the inline{" "}
          <code class="language-plaintext highlighter-rouge">code</code>{" "}
          element. Code blocks are used when you want to display a block of
          code, like this:
        </p>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                {`body {
  color: var(--text);
  background: var(--bg);
  font-size: 1.15rem;
  line-height: 1.5;
  margin: 0;
}`}
              </code>
            </pre>
          </div>
        </div>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                &lt;pre&gt; &lt;code&gt;
                {`body {
    color: var(--text);
    background: var(--bg);
    font-size: 1.15rem;
    line-height: 1.5;
    margin: 0;
  }`}
                &lt;/code&gt; &lt;/pre&gt;
              </code>
            </pre>
          </div>
        </div>

        <h2 id="other-html-elements">Other HTML elements</h2>

        <p>
          There are other HTML elements that are formatted in Simple.css. If you
          think there should be more added, please{" "}
          <a href="https://github.com/kevquirk/simple.css/issues">
            log an issue on GitHub
          </a>
        </p>

        <h3 id="notice-box">Notice box</h3>

        <p class="notice">
          This is a notice box. It’s useful for calling out snippets of
          information. Cool, huh?
        </p>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                &lt;p class="notice"&gt;This is a notice box. It's useful for
                calling out snippets of information. Cool, huh?&lt;/p&gt;
              </code>
            </pre>
          </div>
        </div>

        <h3 id="aside">Aside</h3>

        <aside>
          <p>
            <b>Aside</b>
          </p>
          <p>
            This is an <code>aside</code>, it floats to the right and stands out
            slightly.
          </p>
        </aside>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                &lt;aside&gt; &lt;p&gt;Your aside content goes here.&lt;/p&gt;
                &lt;/aside&gt;
              </code>
            </pre>
          </div>
        </div>

        <h3 id="article">Article</h3>

        <article>
          <h2>This is an article</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </article>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                &lt;article&gt; &lt;h2&gt;This is an article&lt;/h2&gt;
                &lt;p&gt;Some content will go here, which will be inside your
                article.&lt;/p&gt; &lt;/article&gt;
              </code>
            </pre>
          </div>
        </div>

        <h3 id="section">Section</h3>

        <p>
          Sections are good for splitting up a page into multiple…sections. 🙃
        </p>

        <section>
          <h2>This is a section</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </section>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                &lt;section&gt; &lt;h2&gt;This is a section&lt;/h2&gt;
                &lt;p&gt;Some content will go here, which will be inside your
                section.&lt;/p&gt; &lt;/section&gt;
              </code>
            </pre>
          </div>
        </div>

        <h2 id="navigation">Navigation</h2>

        <p>
          The <code class="language-plaintext highlighter-rouge">nav</code> menu
          is deliberately designed to be extremely simple so that you can
          improve on it as you see fit. Or, just leave it as is to have a good
          looking, functional navigation menu.
        </p>

        <p>
          Navigation menus inside the{" "}
          <code class="language-plaintext highlighter-rouge">header</code> are
          automatically formatted like the one on this site. If you decide to
          put a <code class="language-plaintext highlighter-rouge">nav</code>{" "}
          menu elsewhere on your site, for example in a post for a table of
          contents, no formatting is applied. This is so you can add your own
          formatting as you see fit.
        </p>

        <p>
          There’s no JavaScript or checkbox CSS hacks here. It’s just a
          collection of simple “buttons” that wrap to the given width of the
          page.
        </p>

        <p>
          The <code class="language-plaintext highlighter-rouge">nav</code> menu
          will also adapt to smaller screens automatically so that it doesn’t
          take up too much space.
        </p>

        <p>
          To add a <code class="language-plaintext highlighter-rouge">nav</code>{" "}
          menu, just add the following to the{" "}
          <code class="language-plaintext highlighter-rouge">
            &lt;header&gt;
          </code>{" "}
          section of your site:
        </p>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                &lt;nav&gt; &lt;a href="/"&gt;Home&lt;/a&gt; &lt;a
                href="/about"&gt;About&lt;/a&gt; &lt;a
                href="/blog"&gt;Blog&lt;/a&gt; &lt;a
                href="/notes"&gt;Notes&lt;/a&gt; &lt;a
                href="/guestbook"&gt;Guestbook&lt;/a&gt; &lt;a
                href="/contact"&gt;Contact&lt;/a&gt; &lt;/nav&gt;
              </code>
            </pre>
          </div>
        </div>

        <h2 id="images">Images</h2>

        <p>
          In Simple.css, images within the{" "}
          <code class="language-plaintext highlighter-rouge">main</code> element
          are always full width and have rounded edges to them. The{" "}
          <code class="language-plaintext highlighter-rouge">figcaption</code>{" "}
          element is also formatted in Simple.css. Here are examples of images
          with and without a caption:
        </p>

        <p>
          <img
            src={dogImage}
            alt="A dog at an iPad"
            width="1000"
            height="667"
          />
        </p>

        <figure>
          <img
            alt="This is a black swan"
            src={gooseImage}
            width="1000"
            height="663"
          />
          <figcaption>This is a black swan</figcaption>
        </figure>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                # Standard image &lt;img alt="A dog on an iPad"
                src="/assets/images/dog-ipad.jpg" /&gt; # Image with a caption
                &lt;figure&gt; &lt;img alt="This is a black swan"
                src="/assets/images/goose.jpg" /&gt; &lt;figcaption&gt;This is a
                black swan&lt;/figcaption&gt; &lt;/figure&gt;
              </code>
            </pre>
          </div>
        </div>

        <h2 id="accordions">Accordions</h2>

        <p>
          Accordions are cool to play with. They’re especially useful when it
          comes to things like FAQ pages. Many people invoke JavaScript, or{" "}
          <code class="language-plaintext highlighter-rouge">div</code> for life
          when they use accordions. I don’t really understand why that is when
          it’s available in plain old HTML:
        </p>

        <details>
          <summary>Spoiler alert!</summary>
          <p>You smell. 🙂</p>
        </details>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                &lt;details&gt; &lt;summary&gt;Spoiler alert!&lt;/summary&gt;
                &lt;p&gt;You smell. 🙂&lt;/p&gt; &lt;/details&gt;
              </code>
            </pre>
          </div>
        </div>

        <h2 id="tables">Tables</h2>

        <p>
          Like lists, sometimes you may need to add a table to your webpage. In
          Simple.css tables automatically highlight every other row to make
          reading easier. Table header text is also bold. Here’s what they look
          like:
        </p>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jackie</td>
              <td>012345</td>
            </tr>
            <tr>
              <td>Lucy</td>
              <td>112346</td>
            </tr>
            <tr>
              <td>David</td>
              <td>493029</td>
            </tr>
            <tr>
              <td>Kerry</td>
              <td>395499</td>
            </tr>
            <tr>
              <td>Steve</td>
              <td>002458</td>
            </tr>
          </tbody>
        </table>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                &lt;table&gt; &lt;thead&gt; &lt;tr&gt; &lt;th&gt;Name&lt;/th&gt;
                &lt;th&gt;Number&lt;/th&gt; &lt;/tr&gt; &lt;/thead&gt;
                &lt;tbody&gt; &lt;tr&gt; &lt;td&gt;Jackie&lt;/td&gt;
                &lt;td&gt;012345&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt;
                &lt;td&gt;Lucy&lt;/td&gt; &lt;td&gt;112346&lt;/td&gt;
                &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;David&lt;/td&gt;
                &lt;td&gt;493029&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt;
                &lt;td&gt;Kerry&lt;/td&gt; &lt;td&gt;395499&lt;/td&gt;
                &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Steve&lt;/td&gt;
                &lt;td&gt;002458&lt;/td&gt; &lt;/tr&gt; &lt;/tbody&gt;
                &lt;/table&gt;
              </code>
            </pre>
          </div>
        </div>

        <p>
          If your table is too wide to fit on the page, wrap it in a{" "}
          <code class="language-plaintext highlighter-rouge">
            &lt;figure&gt;
          </code>{" "}
          element to add horizontal scrolling:
        </p>

        <figure>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Opinion on cheese</th>
                <th>Favourite tea</th>
                <th>Colour of choice</th>
                <th>Unusual fact</th>
                <th>Horse?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jackie</td>
                <td>012345</td>
                <td>Sometimes</td>
                <td>Earl grey, hot</td>
                <td>Blue</td>
                <td>Communicates exclusively in metaphors</td>
                <td>Aye</td>
              </tr>
              <tr>
                <td>Lucy</td>
                <td>112346</td>
                <td>Only on Tuesdays</td>
                <td>The green one</td>
                <td>The green one</td>
                <td>Caught a glimpse of an Australian badger</td>
                <td>Aye</td>
              </tr>
              <tr>
                <td>David</td>
                <td>493029</td>
                <td>Always eat the rind</td>
                <td>London fog</td>
                <td>Purple</td>
                <td>Has never been to London</td>
                <td>Aye</td>
              </tr>
              <tr>
                <td>Kerry</td>
                <td>395499</td>
                <td>It's on the moon</td>
                <td>Camomile</td>
                <td>Yellow</td>
                <td>Has been to the moon</td>
                <td>Aye</td>
              </tr>
              <tr>
                <td>Steve</td>
                <td>002458</td>
                <td>No</td>
                <td>Black tea brewed using ISO 3103</td>
                <td>Chestnut</td>
                <td>Has a 350° field of view</td>
                <td>Neigh</td>
              </tr>
            </tbody>
          </table>
          <figcaption>
            A wide table showing horizontal scroll behavior.
          </figcaption>
        </figure>

        <div class="language-plaintext highlighter-rouge">
          <div class="highlight">
            <pre class="highlight">
              <code>
                &lt;figure&gt; &lt;table&gt; &lt;thead&gt; &lt;tr&gt;
                &lt;th&gt;Name&lt;/th&gt; &lt;th&gt;Number&lt;/th&gt;
                &lt;th&gt;Opinion on cheese&lt;/th&gt; &lt;th&gt;Favourite
                tea&lt;/th&gt; &lt;th&gt;Colour of choice&lt;/th&gt;
                &lt;th&gt;Unusual fact&lt;/th&gt; &lt;th&gt;Horse?&lt;/th&gt;
                &lt;/tr&gt; &lt;/thead&gt; &lt;tbody&gt; &lt;tr&gt;
                &lt;td&gt;Jackie&lt;/td&gt; &lt;td&gt;012345&lt;/td&gt;
                &lt;td&gt;Sometimes&lt;/td&gt; &lt;td&gt;Earl grey,
                hot&lt;/td&gt; &lt;td&gt;Blue&lt;/td&gt; &lt;td&gt;Communicates
                exclusively in metaphors&lt;/td&gt; &lt;td&gt;Aye&lt;/td&gt;
                &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;Lucy&lt;/td&gt;
                &lt;td&gt;112346&lt;/td&gt; &lt;td&gt;Only on
                Tuesdays&lt;/td&gt; &lt;td&gt;The green one&lt;/td&gt;
                &lt;td&gt;The green one&lt;/td&gt; &lt;td&gt;Caught a glimpse of
                an Australian badger&lt;/td&gt; &lt;td&gt;Aye&lt;/td&gt;
                &lt;/tr&gt; &lt;tr&gt; &lt;td&gt;David&lt;/td&gt;
                &lt;td&gt;493029&lt;/td&gt; &lt;td&gt;Always eat the
                rind&lt;/td&gt; &lt;td&gt;London fog&lt;/td&gt;
                &lt;td&gt;Purple&lt;/td&gt; &lt;td&gt;Has never been to
                London&lt;/td&gt; &lt;td&gt;Aye&lt;/td&gt; &lt;/tr&gt;
                &lt;tr&gt; &lt;td&gt;Kerry&lt;/td&gt;
                &lt;td&gt;395499&lt;/td&gt; &lt;td&gt;It's on the
                moon&lt;/td&gt; &lt;td&gt;Camomile&lt;/td&gt;
                &lt;td&gt;Yellow&lt;/td&gt; &lt;td&gt;Has been to the
                moon&lt;/td&gt; &lt;td&gt;Aye&lt;/td&gt; &lt;/tr&gt; &lt;tr&gt;
                &lt;td&gt;Steve&lt;/td&gt; &lt;td&gt;002458&lt;/td&gt;
                &lt;td&gt;No&lt;/td&gt; &lt;td&gt;Black tea brewed using ISO
                3103&lt;/td&gt; &lt;td&gt;Chestnut&lt;/td&gt; &lt;td&gt;Has a
                350° field of view&lt;/td&gt; &lt;td&gt;Neigh&lt;/td&gt;
                &lt;/tr&gt; &lt;/tbody&gt; &lt;/table&gt; &lt;figcaption&gt;A
                wide table showing horizontal scroll
                behavior.&lt;/figcaption&gt; &lt;/figure&gt;
              </code>
            </pre>
          </div>
        </div>

        <h2 id="forms">Forms</h2>

        <p>
          Forms are useful for all kinds of things on webpages. Contact forms,
          newsletter sign ups etc. Forms also look pretty good on Simple.css:
        </p>

        <form>
          <p>
            <strong>This is just a test form. It doesn't do anything.</strong>
          </p>
          <p>
            <select>
              <option selected value="1">
                Title
              </option>
              <option value="2">Mr</option>
              <option value="3">Miss</option>
              <option value="4">Mrs</option>
              <option value="5">Other</option>
            </select>
          </p>
          <p>
            <label>First name</label>
            <input type="text" name="first_name" />
          </p>
          <p>
            <label>Surname</label>
            <input type="text" name="surname" />
          </p>
          <p>
            <label>Email</label>
            <input type="email" name="email" required />
          </p>
          <p>
            <label>Enquiry type:</label>
            <label>
              <input checked name="type" type="radio" value="sales" /> Sales
            </label>
            <label>
              <input name="type" type="radio" value="support" /> Support
            </label>
            <label>
              <input name="type" type="radio" value="billing" /> Billing
            </label>
          </p>
          <p>
            <label>Message</label>
            <textarea rows={6}></textarea>
          </p>
          <p>
            <label for="cars">Choose a car:</label>
            <select name="cars" id="cars" multiple>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </p>
          <p>
            <label>
              <input type="checkbox" id="checkbox" value="terms" />I agree to
              the <a href="#">terms and conditions</a>
            </label>
          </p>
          <button>Send</button> <button type="reset">Reset</button>{" "}
          <button disabled>Disabled</button>
        </form>

        <pre>
          <code class="language-HTML">
            &lt;form&gt; &lt;p&gt;&lt;strong&gt;This is just a test form. It
            doesn't do anything.&lt;/strong&gt;&lt;/p&gt;
            &lt;p&gt;&lt;select&gt; &lt;option selected="selected"
            value="1"&gt;Title&lt;/option&gt; &lt;option
            value="2"&gt;Mr&lt;/option&gt; &lt;option
            value="3"&gt;Miss&lt;/option&gt; &lt;option
            value="4"&gt;Mrs&lt;/option&gt; &lt;option
            value="5"&gt;Other&lt;/option&gt; &lt;/select&gt;&lt;/p&gt;
            &lt;p&gt; &lt;label&gt;First name&lt;/label&gt; &lt;input
            type="text" name="first_name"&gt; &lt;/p&gt; &lt;p&gt;
            &lt;label&gt;Surname&lt;/label&gt; &lt;input type="text"
            name="surname"&gt; &lt;/p&gt; &lt;p&gt;
            &lt;label&gt;Email&lt;/label&gt; &lt;input type="email" name="email"
            required=""&gt; &lt;/p&gt; &lt;p&gt; &lt;label&gt;Enquiry
            type:&lt;/label&gt; &lt;label&gt;&lt;input checked="checked"
            name="type" type="radio" value="sales" /&gt; Sales&lt;/label&gt;
            &lt;label&gt;&lt;input name="type" type="radio" value="support"
            /&gt; Support&lt;/label&gt; &lt;label&gt;&lt;input name="type"
            type="radio" value="billing" /&gt; Billing&lt;/label&gt; &lt;/p&gt;
            &lt;p&gt; &lt;label&gt;Message&lt;/label&gt; &lt;textarea
            rows="6"&gt;&lt;/textarea&gt; &lt;/p&gt; &lt;p&gt; &lt;label
            for="cars"&gt;Choose a car:&lt;/label&gt; &lt;select name="cars"
            id="cars" multiple&gt; &lt;option
            value="volvo"&gt;Volvo&lt;/option&gt; &lt;option
            value="saab"&gt;Saab&lt;/option&gt; &lt;option
            value="opel"&gt;Opel&lt;/option&gt; &lt;option
            value="audi"&gt;Audi&lt;/option&gt; &lt;/select&gt; &lt;/p&gt;
            &lt;p&gt; &lt;label&gt; &lt;input type="checkbox" id="checkbox"
            value="terms"&gt; I agree to the &lt;a href="#"&gt;terms and
            conditions&lt;/a&gt; &lt;/label&gt; &lt;/p&gt;
            &lt;button&gt;Send&lt;/button&gt; &lt;button
            type="reset"&gt;Reset&lt;/button&gt; &lt;button
            disabled&gt;Disabled&lt;/button&gt; &lt;/form&gt;
          </code>
        </pre>
      </main>

      <footer>
        <p>
          Simple.css was created by{" "}
          <a href="https://kevquirk.com/">Kev Quirk</a> and is licensed under
          the MIT license.
          <br />
          <a href="https://github.com/kevquirk/simple.css-site">
            Source code for this site
          </a>
        </p>
      </footer>
    </>
  );
});
export const head: DocumentHead = {
  title: "Simple.css Examples",
  meta: [
    {
      name: "local simple.css",
      content: "Example components and usage of simple.css",
    },
  ],
};

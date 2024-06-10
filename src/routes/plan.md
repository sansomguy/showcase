# ALL EXAMPLES

https://blog.hubspot.com/website/css-animation-examples

# Register interest button

```html
<button>Save</button>
```

```css
/* Animation property */
button {
  animation: wiggle 2s linear infinite;
}

/* Keyframes */
@keyframes wiggle {
  0%,
  7% {
    transform: rotateZ(0);
  }
  15% {
    transform: rotateZ(-15deg);
  }
  20% {
    transform: rotateZ(10deg);
  }
  25% {
    transform: rotateZ(-10deg);
  }
  30% {
    transform: rotateZ(6deg);
  }
  35% {
    transform: rotateZ(-4deg);
  }
  40%,
  100% {
    transform: rotateZ(0);
  }
}

body {
  background: #000;
}

button {
  position: absolute;
  left: calc(50% - 3em);
  top: calc(50% - 2em);

  height: 4em;
  width: 7em;

  background: #444;
  background: linear-gradient(top, #555, #333);
  border: none;
  border-top: 3px solid orange;
  border-radius: 0 0 0.2em 0.2em;
  color: #fff;
  font-family: Helvetica, Arial, Sans-serif;
  font-size: 1em;
  transform-origin: 50% 5em;
}
```

# coming soon content

```html
<div id="loader">
  <div id="box"></div>
  <div id="hill"></div>
</div>
```

```css
html,
body {
  background-color: #404456;
}

#loader {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -2.7em;
  margin-left: -2.7em;
  width: 5.4em;
  height: 5.4em;
  background-color: #404456;
}

#hill {
  position: absolute;
  width: 7.1em;
  height: 7.1em;
  top: 1.7em;
  left: 1.7em;
  background-color: transparent;
  border-left: 0.25em solid whitesmoke;
  transform: rotate(45deg);
}

#hill:after {
  content: "";
  position: absolute;
  width: 7.1em;
  height: 7.1em;
  left: 0;
  background-color: #404456;
}

#box {
  position: absolute;
  left: 0;
  bottom: -0.1em;
  width: 1em;
  height: 1em;
  background-color: transparent;
  border: 0.25em solid whitesmoke;
  border-radius: 15%;
  transform: translate(0, -1em) rotate(-45deg);
  animation: push 2.5s cubic-bezier(0.79, 0, 0.47, 0.97) infinite;
}

@keyframes push {
  0% {
    transform: translate(0, -1em) rotate(-45deg);
  }
  5% {
    transform: translate(0, -1em) rotate(-50deg);
  }
  20% {
    transform: translate(1em, -2em) rotate(47deg);
  }
  25% {
    transform: translate(1em, -2em) rotate(45deg);
  }
  30% {
    transform: translate(1em, -2em) rotate(40deg);
  }
  45% {
    transform: translate(2em, -3em) rotate(137deg);
  }
  50% {
    transform: translate(2em, -3em) rotate(135deg);
  }
  55% {
    transform: translate(2em, -3em) rotate(130deg);
  }
  70% {
    transform: translate(3em, -4em) rotate(217deg);
  }
  75% {
    transform: translate(3em, -4em) rotate(220deg);
  }
  100% {
    transform: translate(0, -1em) rotate(-225deg);
  }
}
```

# background animation

```html
<div class="animation-container">
  <div class="lightning-container">
    <div class="lightning white"></div>
    <div class="lightning red"></div>
  </div>
  <div class="boom-container">
    <div class="shape circle big white"></div>
    <div class="shape circle white"></div>
    <div class="shape triangle big yellow"></div>
    <div class="shape disc white"></div>
    <div class="shape triangle blue"></div>
  </div>
  <div class="boom-container second">
    <div class="shape circle big white"></div>
    <div class="shape circle white"></div>
    <div class="shape disc white"></div>
    <div class="shape triangle blue"></div>
  </div>
</div>

<div class="footer">
  Implemented with ❤ by
  <a href="https://mrossignol.fr" target="_blank">Maxime Rossignol</a> from an
  original idea by
  <a href="https://www.uplabs.com/shashanksahay" traget="_blank"
    >Shashank Sahay</a
  >
</div>
```

```scss
body {
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(to bottom right, #070630 0%, #060454 100%);
  min-height: 100vh;
}

.animation-container {
  display: block;
  position: relative;
  width: 800px;
  max-width: 100%;
  margin: 0 auto;

  .lightning-container {
    position: absolute;
    top: 50%;
    left: 0;
    display: flex;
    transform: translateY(-50%);

    .lightning {
      position: absolute;
      display: block;
      height: 12px;
      width: 12px;
      border-radius: 12px;
      transform-origin: 6px 6px;

      animation-name: woosh;
      animation-duration: 1.5s;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);
      animation-direction: alternate;

      &.white {
        background-color: white;
        box-shadow: 0px 50px 50px 0px transparentize(white, 0.7);
      }

      &.red {
        background-color: #fc7171;
        box-shadow: 0px 50px 50px 0px transparentize(#fc7171, 0.7);
        animation-delay: 0.2s;
      }
    }
  }

  .boom-container {
    position: absolute;
    display: flex;
    width: 80px;
    height: 80px;
    text-align: center;
    align-items: center;
    transform: translateY(-50%);
    left: 200px;
    top: -145px;

    .shape {
      display: inline-block;
      position: relative;
      opacity: 0;
      transform-origin: center center;

      &.triangle {
        width: 0;
        height: 0;
        border-style: solid;
        transform-origin: 50% 80%;
        animation-duration: 1s;
        animation-timing-function: ease-out;
        animation-iteration-count: infinite;
        margin-left: -15px;
        border-width: 0 2.5px 5px 2.5px;
        border-color: transparent transparent #42e599 transparent;
        animation-name: boom-triangle;

        &.big {
          margin-left: -25px;
          border-width: 0 5px 10px 5px;
          border-color: transparent transparent #fade28 transparent;
          animation-name: boom-triangle-big;
        }
      }

      &.disc {
        width: 8px;
        height: 8px;
        border-radius: 100%;
        background-color: #d15ff4;
        animation-name: boom-disc;
        animation-duration: 1s;
        animation-timing-function: ease-out;
        animation-iteration-count: infinite;
      }

      &.circle {
        width: 20px;
        height: 20px;
        animation-name: boom-circle;
        animation-duration: 1s;
        animation-timing-function: ease-out;
        animation-iteration-count: infinite;
        border-radius: 100%;
        margin-left: -30px;

        &.white {
          border: 1px solid white;
        }

        &.big {
          width: 40px;
          height: 40px;
          margin-left: 0px;

          &.white {
            border: 2px solid white;
          }
        }
      }

      &:after {
        background-color: rgba(178, 215, 232, 0.2);
      }
    }

    .shape {
      &.triangle,
      &.circle,
      &.circle.big,
      &.disc {
        animation-delay: 0.38s;
        animation-duration: 3s;
      }

      &.circle {
        animation-delay: 0.6s;
      }
    }

    &.second {
      left: 485px;
      top: 155px;
      .shape {
        &.triangle,
        &.circle,
        &.circle.big,
        &.disc {
          animation-delay: 1.9s;
        }
        &.circle {
          animation-delay: 2.15s;
        }
      }
    }
  }
}

@keyframes woosh {
  0% {
    width: 12px;
    transform: translate(0px, 0px) rotate(-35deg);
  }
  15% {
    width: 50px;
  }
  30% {
    width: 12px;
    transform: translate(214px, -150px) rotate(-35deg);
  }
  30.1% {
    transform: translate(214px, -150px) rotate(46deg);
  }
  50% {
    width: 110px;
  }
  70% {
    width: 12px;
    transform: translate(500px, 150px) rotate(46deg);
  }
  70.1% {
    transform: translate(500px, 150px) rotate(-37deg);
  }

  85% {
    width: 50px;
  }
  100% {
    width: 12px;
    transform: translate(700px, 0) rotate(-37deg);
  }
}

@keyframes boom-circle {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  30% {
    opacity: 0;
    transform: scale(3);
  }
  100% {
  }
}

@keyframes boom-triangle-big {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }

  40% {
    opacity: 0;
    transform: scale(2.5) translate(50px, -50px) rotate(360deg);
  }
  100% {
  }
}

@keyframes boom-triangle {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }

  30% {
    opacity: 0;
    transform: scale(3) translate(20px, 40px) rotate(360deg);
  }

  100% {
  }
}

@keyframes boom-disc {
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  40% {
    opacity: 0;
    transform: scale(2) translate(-70px, -30px);
  }
  100% {
  }
}

// FOOTER
.footer {
  color: white;
  font-size: 10px;
  position: fixed;
  bottom: 0;
  font-weight: 200;
  padding: 10px 20px;

  a {
    &,
    &:hover,
    &:focus,
    &:visited {
      color: #c6c6c6;
    }
  }
}
```

# Navigation filebox

```pug

mixin drawer(position)
  .chest__drawer.drawer(data-position=position)
    details
      summary
    .drawer__structure
      .drawer__panel.drawer__panel--back
        block
      .drawer__panel.drawer__panel--bottom
      .drawer__panel.drawer__panel--right
      .drawer__panel.drawer__panel--left
      .drawer__panel.drawer__panel--front
.chest
  .chest__panel.chest__panel--back
  .chest__panel.chest__panel--top
  .chest__panel.chest__panel--bottom
  .chest__panel.chest__panel--right
  .chest__panel.chest__panel--front
    .chest__panel.chest__panel--front-frame
  .chest__panel.chest__panel--left
  +drawer(1)
    span CSS
  +drawer(2)
    span is
  +drawer(3)
    - for (const letter of "Awesome".split(''))
      span.letter= letter

```

```stylus

*
*:after
*:before
  box-sizing border-box
  transform-style preserve-3d
  will-change transform

:root
  --bg hsl(210, 32%, 80%)
  --hover 0.05
  --default 0.01
  --limit 0.9
  --height 30
  --width 20
  --depth 15
  --frame 1
  --handle hsl(0, 0%, 80%)
  --hue 10
  --saturation 0%
  --drawer-one hsl(0, 0%, 98%)
  --drawer-two hsl(0, 0%, 90%)
  --drawer-three hsl(0, 0%, 95%)
  --unit-one 'hsl(%s, %s, 50%)' % (var(--hue) var(--saturation))
  --unit-two 'hsl(%s, %s, 40%)' % (var(--hue) var(--saturation))
  --unit-three 'hsl(%s, %s, 20%)' % (var(--hue) var(--saturation))
  --unit-four 'hsl(%s, %s, 15%)' % (var(--hue) var(--saturation))
  --transition 0.2s

body
  background var(--bg)
  display grid
  place-items center
  min-height 100vh
  transform scale(1.5)

.chest
  height calc(var(--height) * 1vmin)
  transform translate3d(0, 0, 50vmin) rotateX(-32deg) rotateY(40deg)
  width calc(var(--width) * 1vmin)
  color hsl(0, 10%, 10%)

  &__panel
    position absolute

    &--back
      background var(--unit-two)

    &--back
    &--front
      height 100%
      width 100%
      transform translate3d(0, 0, calc(var(--depth) * var(--coefficient)))

    &--front-frame
      height 100%
      width 100%
      border calc(var(--frame) * 1vmin) solid var(--unit-one)
      border-bottom-width calc(var(--frame) * 2vmin)
      transform translate3d(0, 0, 0)

      &:after
      &:before
        content ''
        background var(--unit-one)
        height calc(var(--frame) * 1.5vmin)
        width calc(var(--width) * 1vmin)
        position absolute
        transform translate(-50%, -50%)
        left 50%

      &:after
        top calc(100 / 3 * 1.01%)

      &:before
        // Tiny little adjustment to cover the hole.
        top calc(100 / 3 * 2.01%)

    &--front
      --coefficient 0.5vmin
    &--back
      --coefficient -0.5vmin

    &--left
    &--right
      height 100%
      left 50%
      width calc(var(--depth) * 1vmin)
      background var(--unit-three)
      transform translate(-50%, 0) rotateY(90deg) translate3d(0, 0, calc(var(--width) * var(--coefficient)))

    &--right
      width calc((var(--depth) * 1vmin) + 2px)
      --coefficient 0.5vmin

    &--left
      --coefficient -0.5vmin

    &--top
    &--bottom
      height calc(var(--depth) * 1vmin)
      width calc(var(--width) * 1vmin)
      background var(--unit-two)

    &--top
      top 0
      width calc((var(--width) * 1vmin) + 0.1vmin)
      height calc((var(--depth) * 1vmin) + 0.1vmin)
      left 50%
      transform translate(-50%, -50%) rotateX(-90deg)

    &--bottom
      bottom 0
      transform translate(0, 50%) rotateX(-90deg)

  &__drawer
    --drawer-height calc((var(--height) - (5 * var(--frame))) / 3)
    position absolute
    top var(--top, 0)
    left 50%
    height calc(var(--drawer-height) * 1vmin)
    width calc((var(--width) - (2 * var(--frame))) * 1vmin)
    transform translate3d(-50%, 0, calc((var(--depth) * 0.5vmin) + 0.01vmin))

    &[data-position="1"]
      --index 1
      --top calc(var(--frame) * 1vmin)
    &[data-position="2"]
      --index 2
      --top calc(((2 * var(--frame)) + var(--drawer-height)) * 1vmin)
    &[data-position="3"]
      --index 3
      --top calc(((3 * var(--frame)) + (2 * var(--drawer-height))) * 1vmin)

.drawer
  &__structure
    height 100%
    width 100%
    position absolute
    top 0
    left 0

  &__panel
    position absolute

    &--left
    &--right
      width calc(var(--depth) * 1vmin)
      height 65%
      background var(--drawer-two)
      bottom 1%

    &--left
      // left calc((var(--frame) * 1vmin) + 1px)
      left 0
      transform-origin 0 50%
      transform rotateY(90deg)

    &--right
      right calc((var(--frame) * 1vmin) + 1px)
      right 0
      transform-origin 100% 50%
      transform rotateY(-90deg)

    &--front
      height calc((var(--drawer-height) + (0.6 * var(--frame))) * 1vmin)
      width calc((var(--width) - (0.6 * var(--frame))) * 1vmin)
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 1px)
      background var(--unit-four)

    &--bottom
    &--back
      width calc(100% - (2vmin * var(--frame)))
      width 100%

    &--bottom
      height calc(var(--depth) * 1vmin)
      background var(--drawer-three)
      bottom 5%
      left 50%
      transform-origin 50% 100%
      transform translate(-50%, 0) rotateX(90deg)

    &--back
      height 65%
      background var(--drawer-one)
      bottom 1%
      left 50%
      transform translate3d(-50%, 0, calc(var(--depth) * -1vmin))
      text-align center
      line-height calc(var(--drawer-height) * 0.65vmin)
      font-size 3vmin
      font-family sans-serif
      font-weight bold

.letter
  color 'hsl(%s, 80%, 50%)' % var(--hue)
  display inline-block
  animation wave calc(var(--open) * 1s) calc(var(--delay) * -0.1s) infinite ease-in-out

  &:nth-of-type(1)
    --hue 15
    --delay 0
  &:nth-of-type(2)
    --hue 35
    --delay 1
  &:nth-of-type(3)
    --hue 45
    --delay 2
  &:nth-of-type(4)
    --hue 90
    --delay 3
  &:nth-of-type(5)
    --hue 180
    --delay 4
  &:nth-of-type(6)
    --hue 260
    --delay 5
  &:nth-of-type(7)
    --hue 320
    --delay 6

@keyframes wave
  0%, 100%
    transform translate3d(0, 10%, 1px)
  50%
    transform translate3d(0, -10%, 1px)

details
  position absolute
  height 100%
  width 100%
  top 0
  left 0
  cursor pointer
  outline transparent


// Responsible for opening/closing
details
  &:hover:not([open])
  &:hover:not([open]) + .drawer__structure
    --open var(--hover)

details
.drawer__structure
  transition transform var(--transition)

  &[open]
  &[open] + .drawer__structure
    --open var(--limit)

  transform translate3d(0, 0, calc((var(--open, var(--default)) * var(--depth)) * 1vmin))

summary
  outline transparent
  height 100%
  width 100%

  &::-webkit-details-marker
    display none

  &:after
    content ''
    position absolute
    background linear-gradient(var(--handle), var(--handle)) 50% 15% / 40% 8% no-repeat, transparent
    height 110%
    width 110%
    top 50%
    left 50%
    transform translate3d(-50%, -50%, 0.5vmin)



```

# Scene to be used for timeline sections

```pug
.container
	.birds.front
		-	for(var x = 1; x <= 12; x++)
			div(class="bird b" + x)
				.body
				.wing1
					.wing2
						.wing3
	.birds.back
		-	for(var x = 1; x <= 12; x++)
			div(class="bird b" + x)
				.body
				.wing1
					.wing2
						.wing3
	.cloud.big
		-	for(var x = 0; x <= 8; x++)
			div(class="circle c" + x)
	.cloud.small
		-	for(var x = 0; x <= 8; x++)
			div(class="circle c" + x)
	.mountain
		.backdrop
		-	for(var x = 0; x <= 4; x++)
			div(class="zig zag" + x)
			.top
			.mid
			.bot
			.base
	.range
		-	for(var x = 1; x <= 7; x++)
			div(class="r" + x)
	-	for(var x = 1; x <= 8; x++)
		div(class="tree treeBack tree" + x)
			.top
			.mid
			.bot
			.base
	.tower
		.shadow
		.flagPole
		.roof1
		.roof2
		.wall
			- for(var x = 1; x <= 5; x++)
				div(class="w" + x)
		.legs
			.left
			.right
			.support1
				.criss
				.cross
				.flat
			.support2
				.criss
				.cross
				.flat
		.railing
			.top
			.bot1
			.bot2
			- for(var x = 1; x <= 9; x++)
				div(class="r" + x)
	-	for(var x = 1; x <= 5; x++)
		div(class="tree treeMid tree" + x)
			.top
			.mid
			.bot
			.base
	-	for(var x = 1; x <= 4; x++)
		div(class="tree treeFront tree" + x)
			.top
			.mid
			.bot
			.base

```

```scss
$tree1: #2d1427;
$tree2: #5a0831;
$tree3: #cd4d45;
$range: #f46435;
$mountain1: #f59452;
$mountain2: #f47a45;
$wood: #370d09;
$pole: #791819;
$flag: #c63737;
$tower1: #76122c;
$tower2: #c93d3d;
$tower3: #821021;
$tower4: #f4633a;
$tower5: #4b1205;
$tower6: #c13c45;

.container {
  position: relative;
  width: 160px;
  height: 335px;
  background: #fae0c8;
  border-radius: 100px;
  overflow: hidden;
}

.mountain {
  position: absolute;
  top: 0;
  opacity: 1;
  .backdrop {
    position: absolute;
    top: 80px;
    left: -180px;
    width: 0;
    height: 0;
    border-left: 260px solid transparent;
    border-right: 260px solid transparent;
    border-bottom: 200px solid $mountain1;
  }
  .zig {
    position: absolute;
    width: 0;
    height: 0;
    transform: rotate(217deg);
    &.zag1 {
      top: 83px;
      left: 70px;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 30px solid $mountain2;
    }
    &.zag2 {
      top: 94px;
      left: 70px;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-bottom: 60px solid $mountain2;
    }
    &.zag3 {
      top: 115px;
      left: 84px;
      border-left: 30px solid transparent;
      border-right: 30px solid transparent;
      border-bottom: 80px solid $mountain2;
    }
    &.zag4 {
      top: 137px;
      left: 100px;
      border-left: 40px solid transparent;
      border-right: 40px solid transparent;
      border-bottom: 100px solid $mountain2;
    }
  }
}

.tree {
  opacity: 1;
  position: absolute;
  & > div {
    position: absolute;
  }
  &.treeFront {
    > div {
      border-bottom-color: $tree1;
    }
    &.tree1 {
      top: 200px;
      left: 0px;
    }
    &.tree2 {
      top: 220px;
      left: 52px;
    }
    &.tree3 {
      top: 238px;
      left: 94px;
    }
    &.tree4 {
      top: 224px;
      left: 136px;
    }
  }
  &.treeMid {
    > div {
      border-bottom-color: $tree2;
    }
    &.tree1 {
      top: 225px;
      left: 27px;
    }
    &.tree2 {
      top: 232px;
      left: 67px;
    }
    &.tree3 {
      top: 225px;
      left: 86px;
    }
    &.tree4 {
      top: 223px;
      left: 106px;
    }
    &.tree5 {
      top: 215px;
      left: 127px;
    }
  }
  &.treeBack {
    > div {
      border-bottom-color: $tree3;
    }
    &.tree1 {
      top: 202px;
      left: -12px;
    }
    &.tree2 {
      top: 204px;
      left: 17px;
    }
    &.tree3 {
      top: 212px;
      left: 40px;
    }
    &.tree4 {
      top: 210px;
      left: 60px;
    }
    &.tree5 {
      top: 208px;
      left: 80px;
    }
    &.tree6 {
      top: 210px;
      left: 98px;
    }
    &.tree7 {
      top: 204px;
      left: 115px;
    }
    &.tree8 {
      top: 202px;
      left: 130px;
    }
  }
  .top {
    border-left: 17px solid transparent;
    border-right: 17px solid transparent;
    border-bottom: 45px solid #000;
  }
  .mid {
    top: 16px;
    left: -7px;
    border-left: 24px solid transparent;
    border-right: 24px solid transparent;
    border-bottom: 58px solid #000;
  }
  .bot {
    top: 30px;
    left: -12px;
    border-left: 29px solid transparent;
    border-right: 29px solid transparent;
    border-bottom: 68px solid #000;
  }
  .base {
    top: 44px;
    left: -16px;
    border-left: 33px solid transparent;
    border-right: 33px solid transparent;
    border-bottom: 75px solid blue;
  }
}

.range {
  position: absolute;
  top: 0;
  opacity: 1;
  > div {
    position: absolute;
    background: $range;
    width: 60px;
    height: 50px;
  }
  .r1 {
    top: 200px;
    left: -22px;
    width: 60px;
    height: 50px;
    transform: rotate(34deg);
  }
  .r2 {
    top: 198px;
    left: -20px;
    transform: rotate(-8deg);
  }
  .r3 {
    top: 205px;
    left: 24px;
    transform: rotate(25deg);
  }
  .r4 {
    top: 205px;
    left: 50px;
    transform: rotate(-28deg);
  }
  .r5 {
    top: 200px;
    left: 88px;
    transform: rotate(14deg);
  }
  .r6 {
    top: 200px;
    left: 100px;
    transform: rotate(-38deg);
  }
  .r7 {
    top: 199px;
    left: 122px;
    transform: rotate(30deg);
  }
}

.tower {
  position: absolute;
  width: 74px;
  margin-top: 108px;
  margin-left: calc(50% - 37px);
  opacity: 1;
  .shadow {
    position: absolute;
    z-index: 9999;
    top: 12px;
    width: 100%;
    height: 42px;
    background: #000;
    clip-path: polygon(
      50% 0,
      100% 40%,
      100% 45%,
      87% 45%,
      87% 90%,
      100% 90%,
      100% 100%,
      60% 100%,
      60% 31%,
      50% 0
    );
    opacity: 0.4;
  }
  .flagPole {
    width: 2px;
    height: 12px;
    background: $pole;
    margin-left: 36px;
    &:after {
      content: "";
      width: 12px;
      height: 6px;
      background: $flag;
      position: absolute;
      display: block;
    }
  }
  .roof1 {
    border-left: 34px solid transparent;
    border-right: 34px solid transparent;
    border-bottom: 15px solid $tower1;
  }
  .roof2 {
    width: 100%;
    height: 3px;
    background: $tower2;
  }
  .wall {
    position: relative;
    width: 76%;
    height: 22px;
    background: $tower3;
    margin-left: 12%;
    padding-top: 4px;
    .w1,
    .w2,
    .w3,
    .w4,
    .w5 {
      position: absolute;
      width: 8px;
      height: 14px;
      background: $tower4;
    }
    .w1 {
      left: 4px;
    }
    .w2 {
      left: 14px;
    }
    .w3 {
      left: 24px;
    }
    .w4 {
      left: 34px;
    }
    .w5 {
      left: 44px;
    }
  }
  .legs {
    position: relative;
    .left,
    .right {
      position: absolute;
      width: 4px;
      height: 150px;
      background: $wood;
    }
    .left {
      transform: rotate(3deg);
      left: 12px;
    }
    .right {
      transform: rotate(-3deg);
      right: 12px;
    }
    .support1,
    .support2 {
      position: absolute;
      .criss,
      .cross {
        position: absolute;
        left: 35px;
        width: 4px;
        height: 64px;
        background: $wood;
      }
      .criss {
        transform: rotate(45deg);
      }
      .cross {
        transform: rotate(-45deg);
      }
      .flat {
        position: absolute;
        width: 46px;
        height: 4px;
        background: $wood;
        bottom: -55px;
        left: 14px;
      }
    }
    .support1 {
      top: -14px;
    }
    .support2 {
      top: 28px;
    }
  }
  .railing {
    position: relative;
    top: -16px;
    .r1,
    .r2,
    .r3,
    .r4,
    .r5,
    .r6,
    .r7,
    .r8,
    .r9 {
      position: absolute;
      width: 2px;
      height: 10px;
      background: $wood;
    }
    .r1 {
      left: 5px;
    }
    .r2 {
      left: 12px;
    }
    .r3 {
      left: 20px;
    }
    .r4 {
      left: 28px;
    }
    .r5 {
      left: 36px;
    }
    .r6 {
      left: 44px;
    }
    .r7 {
      left: 52px;
    }
    .r8 {
      left: 60px;
    }
    .r9 {
      right: 5px;
    }
    .top,
    .bot1,
    .bot2 {
      position: absolute;
    }
    .top {
      width: 100%;
      height: 2px;
      background: $tower5;
    }
    .bot1 {
      width: 100%;
      height: 4px;
      top: 10px;
      background: $tower6;
    }
    .bot2 {
      width: 80%;
      height: 2px;
      top: 14px;
      left: 8px;
      background: $tower5;
      opacity: 1;
    }
  }
}

.cloud {
  position: absolute;
  width: 162px;
  height: 55px;
  overflow: hidden;
  &.big {
    top: 10px;
    transform: scale(0.8);
    animation: bigCloud 4s linear;
    animation-iteration-count: infinite;
    animation-direction: forwards;
  }
  &.small {
    top: 70px;
    transform: scale(0.4);
    animation: smallCloud 4s linear;
    animation-iteration-count: infinite;
    animation-direction: forwards;
    animation-delay: 3s;
  }
  .circle {
    position: absolute;
    border-radius: 50%;
    background: #fff;
  }
  .c1 {
    width: 32px;
    height: 32px;
    bottom: -15px;
  }
  .c2 {
    width: 35px;
    height: 35px;
    left: 20px;
    bottom: 0;
  }
  .c3 {
    width: 25px;
    height: 25px;
    left: 48px;
    bottom: 15px;
  }
  .c4 {
    width: 35px;
    height: 35px;
    left: 65px;
    bottom: 20px;
  }
  .c5 {
    width: 25px;
    height: 25px;
    left: 94px;
    bottom: 16px;
  }
  .c6 {
    width: 30px;
    height: 30px;
    left: 110px;
    bottom: -5px;
  }
  .c7 {
    width: 30px;
    height: 30px;
    left: 132px;
    bottom: -15px;
  }
  .c8 {
    width: 90px;
    height: 90px;
    left: 30px;
    bottom: -55px;
    background: #fff;
  }
}

@keyframes bigCloud {
  0% {
    transform: translateX(-200px) scale(0.8);
  }
  100% {
    transform: translateX(200px) scale(0.8);
  }
}

@keyframes smallCloud {
  0% {
    transform: translateX(-200px) scale(0.4);
  }
  100% {
    transform: translateX(200px) scale(0.4);
  }
}

.birds {
  position: absolute;
  z-index: 9999;
  width: 100px;
  height: 100px;
  &.front {
    animation: flyFront 4s linear;
    animation-direction: forwards;
    animation-iteration-count: infinite;
    animation-delay: 0.5s;
    top: 200px;
    left: 200px;
  }
  &.back {
    animation: flyBack 4s linear;
    animation-direction: forwards;
    animation-iteration-count: infinite;
    animation-delay: 0.5s;
    // animation-delay: 3s;
    top: 50px;
    left: -425px;
  }
  .bird {
    position: absolute;
    transform: scale(0.15);
  }
  @for $i from 1 through 12 {
    $delay: random(2) - 0.5 + s;
    .b#{$i} {
      .wing1 {
        animation: flap 0.5s ease-in-out;
        animation-iteration-count: infinite;
        //animation-timing-function: ease;
        animation-direction: alternate;
        transform-origin: 0 0;
        //animation-delay: $delay;
        animation-duration: $delay;
      }
    }
  }
  .b1 {
    top: -30px;
  }
  .b2 {
    top: -20px;
    left: -15px;
  }
  .b3 {
    left: 10px;
  }
  .b4 {
    top: 15px;
    left: 20px;
  }
  .b5 {
    top: 30px;
    left: -5px;
  }
  .b6 {
    top: 45px;
    left: 5px;
  }
  .b7 {
    top: -5px;
    left: -35px;
  }
  .b8 {
    top: 10px;
    left: -25px;
  }
  .b9 {
    top: 25px;
    left: -50px;
  }
  .b10 {
    top: 40px;
    left: -40px;
  }
  .b11 {
    top: -10px;
    left: -75px;
  }
  .b12 {
    top: 5px;
    left: -65px;
  }
}
.body {
  clip-path: polygon(0 100%, 20% 20%, 40% 0, 100% 100%, 20% 80%);
  background: #000;
  width: 150px;
  height: 40px;
}

.wing1 {
  position: relative;
  left: 40px;
  top: -20px;
  width: 40px;
  height: 50px;
  background: #000;
  transform: skew(10deg);
  .wing2 {
    position: absolute;
    bottom: -25px;
    left: 13px;

    transform: rotate(-5deg);
  }
  .wing3 {
    width: 40px;
    height: 30px;
    background: #000;
    transform: skew(40deg);
  }
}

@keyframes flap {
  0% {
    transform: skew(10deg) rotateX(50deg);
  }
  100% {
    transform: skew(15deg) rotateX(120deg);
  }
}

@keyframes flyFront {
  0% {
    transform: translate3d(0, 0, 0) rotate(15deg);
  }
  100% {
    transform: translate3d(-600px, -150px, 0) rotate(15deg);
  }
}

@keyframes flyBack {
  0% {
    transform: translate3d(0, 0, 0) scale(0.6) scaleX(-1) rotate(-15deg);
  }
  100% {
    transform: translate3d(600px, -50px, 0) scale(0.6) scaleX(-1) rotate(15deg);
  }
}

// floof
html,
body {
  overflow: hidden;
}
body {
  background: #e6ffff;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

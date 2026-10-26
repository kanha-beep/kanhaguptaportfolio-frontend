import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Autoplay,
  Controller,
  EffectCards,
  EffectCoverflow,
  EffectCreative,
  EffectCube,
  EffectFade,
  EffectFlip,
  Grid,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Parallax,
  Scrollbar,
  Thumbs,
  Virtual,
  Zoom,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/controller";
import "swiper/css/effect-cards";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-creative";
import "swiper/css/effect-cube";
import "swiper/css/effect-fade";
import "swiper/css/effect-flip";
import "swiper/css/grid";
import "swiper/css/mousewheel";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import { siteContent } from "../content/siteContent";
import api from "../api";

const patterns = [
  [
    "Hero reveal",
    "Fade in",
    "A first screen with headline, action and proof points.",
  ],
  [
    "Feature spotlight",
    "Slide up",
    "Features rise into place as the visitor reaches them.",
  ],
  [
    "Product update",
    "Slide down",
    "A new release appears like a clear system update.",
  ],
  [
    "Case study",
    "Slide left",
    "Content moves forward through a project narrative.",
  ],
  [
    "Team story",
    "Slide right",
    "Supporting context enters from the opposite side.",
  ],
  ["Pricing plans", "Scale in", "Plans feel like newly available choices."],
  [
    "Signup success",
    "Pop",
    "The important next action gets a compact confirmation.",
  ],
  ["Live dashboard", "Pulse", "A live metric has a gentle active-state cue."],
  [
    "CTA band",
    "Glow",
    "The key action receives attention without changing position.",
  ],
  [
    "Content loading",
    "Shimmer",
    "Skeleton cards make a wait state feel intentional.",
  ],
  [
    "Order status",
    "Progress sweep",
    "A visual sweep makes background progress visible.",
  ],
  [
    "Search results",
    "Spinner",
    "Results area handles a short wait gracefully.",
  ],
  [
    "Activity feed",
    "Orbit",
    "A loading object keeps an empty feed feeling active.",
  ],
  ["Newsletter", "Bounce", "A playful prompt invites an email signup."],
  ["Form helper", "Wiggle", "A small nudge points toward an unfinished step."],
  [
    "Validation message",
    "Shake",
    "An error draws attention while staying next to context.",
  ],
  [
    "Saved collection",
    "Heart beat",
    "A favourite action gets a warm reaction.",
  ],
  [
    "Checkout complete",
    "Check draw",
    "A completed task becomes immediately legible.",
  ],
  [
    "Notification center",
    "Ring",
    "A notification card uses a restrained alert cue.",
  ],
  [
    "Tap feedback",
    "Ripple",
    "The interaction responds at the point of contact.",
  ],
  ["Project details", "Flip", "A project card reveals its other side."],
  [
    "Featured article",
    "Card lift",
    "A story card feels clickable and layered.",
  ],
  [
    "Portfolio grid",
    "Tilt",
    "A hovered item gets a small dimensional response.",
  ],
  [
    "Assistant widget",
    "Float",
    "A helper stays subtly present without distraction.",
  ],
  ["Client logos", "Marquee", "A row of trusted names passes quietly by."],
  ["Message composer", "Type reveal", "A short message arrives progressively."],
  [
    "Navigation link",
    "Underline grow",
    "A simple link interaction gets a confident cue.",
  ],
  [
    "Brand panel",
    "Gradient shift",
    "A coloured product surface has quiet energy.",
  ],
  [
    "Premium feature",
    "Border trace",
    "A featured card gains an elegant moving frame.",
  ],
  [
    "Creative studio",
    "Blob morph",
    "An organic accent keeps the section expressive.",
  ],
  ["Community quote", "Wave", "A light gesture gives the quote area motion."],
  ["Chat preview", "Dots", "Typing dots show someone is responding."],
  ["Audio lesson", "Bars", "Moving bars make an audio surface feel live."],
  [
    "Impact metric",
    "Counter",
    "A key number earns a quick moment of progress.",
  ],
  [
    "Milestone",
    "Confetti",
    "A meaningful finish receives a short celebration.",
  ],
  ["New collection", "Sparkle", "A fresh release gets a premium moment."],
  ["Guided step", "Spotlight", "The next control is clearly focused."],
  [
    "Image story",
    "Reveal mask",
    "Visual content opens with a polished transition.",
  ],
  ["FAQ", "Accordion", "Extra information expands within the page."],
  ["Toast update", "Toast enter", "A system message enters and exits cleanly."],
  ["Unread badge", "Badge ping", "A small count becomes noticeable, briefly."],
  [
    "Filter drawer",
    "Drawer push",
    "A side panel makes its source direction clear.",
  ],
  ["Service card", "Expand", "Selected content gets more visual room."],
  [
    "Details close",
    "Collapse",
    "Secondary detail compresses without a hard cut.",
  ],
  ["Settings toggle", "Rotate", "An icon turns into its new state."],
  ["Featured launch", "Swoop", "A special reveal gets a more expressive path."],
  ["Feedback button", "Jelly", "A playful reaction makes a click satisfying."],
  [
    "Availability status",
    "Breathing",
    "A passive state stays calm but present.",
  ],
  ["Related work", "Magnet", "Linked content feels naturally pulled together."],
  [
    "Keyboard focus",
    "Focus halo",
    "A clear focus ring helps all users navigate.",
  ],
];
const advancedPatterns = [
  ["Drag constellation", "Drag", "Drag the 3D constellation across the scene."],
  [
    "Click burst",
    "Click to burst",
    "Click the object to trigger an expanding burst.",
  ],
  [
    "Orbit carousel",
    "Pointer orbit",
    "Move across the canvas to steer its orbit.",
  ],
  [
    "Magnetic cards",
    "Magnet",
    "Drag the glowing object toward its card targets.",
  ],
  [
    "3D color switch",
    "Click color",
    "Each click changes the material and mood.",
  ],
  ["Cube stack", "Drag stack", "Move the stack sideways and release it."],
  ["Portal zoom", "Click zoom", "Click to open a dimensional portal."],
  ["Particle flock", "Pointer flock", "Guide a flock with pointer movement."],
  ["Crystal rotation", "Drag rotate", "Rotate a faceted crystal directly."],
  ["Ripple plane", "Click ripple", "Click to send waves through the surface."],
  ["Morphing sphere", "Click morph", "Tap to shift the form between shapes."],
  ["Light chase", "Pointer light", "Sweep the light source across the object."],
  ["Ring launcher", "Drag launch", "Pull then release a 3D ring."],
  [
    "Floating tiles",
    "Drag reorder",
    "Drag a tile to rearrange the composition.",
  ],
  ["Kinetic logo", "Click transform", "Click to transform the mark."],
  ["Depth tunnel", "Pointer depth", "Move left and right through the tunnel."],
  ["Neon dice", "Click roll", "Click the dice for a new spin."],
  ["Elastic blob", "Drag stretch", "Pull the blob and let it spring back."],
  ["Hologram badge", "Hover reveal", "Hover to reveal its depth and detail."],
  ["Prism spectrum", "Drag prism", "Drag the prism to refract the scene."],
  ["Orbital menu", "Click select", "Click an orbiting object to select it."],
  ["Planet builder", "Drag planet", "Spin a small planet with the pointer."],
  ["Wave field", "Pointer wave", "Move through an animated wave field."],
  ["Bubble pop", "Click pop", "Click bubbles to pop and regenerate them."],
  ["Laser grid", "Pointer grid", "Pointer position bends the 3D grid."],
  ["Flip portal", "Click flip", "Click to flip the entire 3D portal."],
  ["Voxel tower", "Drag tower", "Drag a voxel tower through space."],
  ["Star picker", "Click star", "Pick a star to bring it into focus."],
  [
    "Kaleidoscope",
    "Pointer kaleidoscope",
    "Move the pointer to remix the pattern.",
  ],
  [
    "Gravity well",
    "Drag gravity",
    "Move the gravity source around the canvas.",
  ],
  ["Aurora ribbon", "Pointer ribbon", "Guide a luminous ribbon in real time."],
  ["Torus knot", "Drag knot", "Turn an intricate knot by dragging it."],
  ["Sound reactor", "Click reactor", "Click to intensify the visual reactor."],
  ["Folded paper", "Drag fold", "Drag to change its 3D fold direction."],
  ["Meteor launcher", "Drag meteor", "Pull a meteor back and launch it."],
  ["DNA spiral", "Pointer spiral", "Pointer motion changes the spiral speed."],
  ["Solar pulse", "Click pulse", "Click to trigger a solar pulse."],
  ["Memory cubes", "Drag cubes", "Move cubes and watch the cluster react."],
  ["Liquid lens", "Pointer lens", "Use pointer motion to shift the lens."],
  ["Circuit maze", "Click route", "Click to activate a new glowing route."],
  ["Cloud drift", "Drag cloud", "Drag the cloud through a depth layer."],
  ["Gem selector", "Click gem", "Click the gem to change its facet state."],
  [
    "Morph tunnel",
    "Pointer tunnel",
    "Guide the camera feeling with your pointer.",
  ],
  ["Arcade target", "Click target", "Click the target to score a 3D hit."],
  [
    "Spring satellite",
    "Drag satellite",
    "Drag a satellite and watch it orbit.",
  ],
  ["Bloom core", "Click bloom", "Click to bloom a glowing core."],
  [
    "Polygon painter",
    "Pointer paint",
    "Paint movement into the polygon field.",
  ],
  ["Comet trail", "Drag comet", "Drag a comet and leave a trail."],
  ["Mirror room", "Click mirror", "Click to invert the mirrored object."],
  [
    "Gesture finale",
    "Drag + click",
    "Drag, release, then click for the final transformation.",
  ],
];
const futurePatterns = [
  ["Cascade reveal", "Cascade", "Cards cascade into the section in sequence."],
  ["Card aperture", "Aperture", "Cards open outward from a tight focal point."],
  ["Diagonal sweep", "Diagonal", "Cards travel along a diagonal trajectory."],
  ["Card curtain", "Curtain", "A reveal effect lifts the content curtain."],
  ["Staggered deck", "Deck", "Cards arrive as a layered editorial deck."],
  ["Tilt entrance", "Tilt", "Cards level out from a confident tilt."],
  ["Soft dissolve", "Dissolve", "Cards resolve from a gentle blur."],
  ["Corner bloom", "Corner bloom", "Cards expand from alternating corners."],
  ["Rail slide", "Rail", "Cards glide along invisible horizontal rails."],
  ["Vertical relay", "Relay", "Cards hand the viewer’s attention downward."],
  ["Accordion spread", "Spread", "Cards widen smoothly from compact rows."],
  ["Pinwheel cards", "Pinwheel", "Cards rotate inward to form a set."],
  ["Split reveal", "Split", "Two sides meet in the middle."],
  ["Depth rise", "Depth", "Cards rise forward from a deep background."],
  ["Paper fan", "Fan", "Cards unfold as a presentation fan."],
  ["Snap grid", "Snap", "Cards snap into a precise product grid."],
  ["Lens focus", "Focus", "The focused card sharpens before the rest."],
  ["Parallax shelf", "Parallax", "Cards float at different visual depths."],
  ["Scale relay", "Scale relay", "Scale moves through the card set in turn."],
  ["Flipbook entry", "Flipbook", "Cards turn into place like a flipbook."],
  ["Slide stack", "Slide stack", "Cards stack and settle into alignment."],
  ["Choreographed arc", "Arc", "Cards follow a controlled curved motion."],
  ["Elevator cards", "Elevator", "Cards arrive from distinct vertical floors."],
  ["Elastic landing", "Elastic", "Cards land with a spring response."],
  ["Pixel reveal", "Pixel", "Cards sharpen from a small scaled state."],
  ["Clockwise orbit", "Clockwise", "Cards sweep into place clockwise."],
  [
    "Counter orbit",
    "Counter orbit",
    "Cards sweep into place counter-clockwise.",
  ],
  [
    "Card spotlight",
    "Spotlight",
    "One card receives focus, then the set resolves.",
  ],
  ["Portal entrance", "Portal", "Cards scale through a central portal."],
  ["Zigzag route", "Zigzag", "Cards use alternating zigzag paths."],
  ["Stacked shutter", "Shutter", "Cards open like a staggered shutter."],
  ["Flow state", "Flow", "Cards drift together before stopping."],
  [
    "Spring chain",
    "Spring chain",
    "A spring travels through the chain of cards.",
  ],
  ["Offset frame", "Frame", "Cards enter through offset framing."],
  ["Pulse ladder", "Ladder", "A pulse climbs through cards one by one."],
  ["Wave collapse", "Wave collapse", "A wave settles into a stable layout."],
  ["Gallery glide", "Gallery", "Cards glide across a gallery track."],
  ["Fold-in panel", "Fold-in", "Cards fold in from different axes."],
  ["Signal scan", "Scan", "A scan line resolves cards into clarity."],
  [
    "Bounce grid",
    "Bounce grid",
    "Cards settle with individual bounce strength.",
  ],
  [
    "Ripple arrival",
    "Ripple arrival",
    "Arrival spreads outward through the grid.",
  ],
  ["Rotation relay", "Rotation relay", "Rotation passes from card to card."],
  ["Hover float", "Hover float", "Cards float at distinct amplitudes."],
  ["Soft spring", "Soft spring", "Cards use low-tension spring motion."],
  ["Diagonal fold", "Diagonal fold", "Cards fold across a diagonal axis."],
  ["Card peeking", "Peek", "Cards peek in before fully revealing."],
  ["Layer merge", "Layer merge", "Separated layers merge into cards."],
  ["Prism fade", "Prism fade", "Cards shift through a prismatic fade."],
  [
    "Final cadence",
    "Cadence",
    "A deliberate final sequence completes the library.",
  ],
  ["Quiet finish", "Quiet finish", "A minimal, calm end-state animation."],
];
const portalPatterns = [
  "3D Coverflow",
  "Card Fan",
  "Radial Wheel",
  "Stacked Swipe Deck",
  "Shutter Gallery",
  "Portal Zoom",
  "Lightbox Morph",
  "Orbit Gallery",
  "Gravity Wall",
  "Cylinder Carousel",
  "Liquid Glass Carousel",
  "Card Deal",
  "Card Shuffle",
  "Split Flap",
  "Masonry Focus",
  "Scroll Deck",
  "Parallax Shelf",
  "Depth Tunnel",
  "Arc Carousel",
  "Spiral Gallery",
  "Cube Gallery",
  "Card Waterfall",
  "Magnetic Dock",
  "Infinite Marquee",
  "Mirror Coverflow",
  "Perspective Stack",
  "Foldout Menu",
  "Card Telescope",
  "Ring Carousel",
  "Scatter Gather",
  "Wave Deck",
  "Card Conveyor",
  "Pinball Cards",
  "Bento Morph",
  "Prism Gallery",
  "Card Telescope",
  "Layered Timeline",
  "Card Orbit",
  "Card Vortex",
  "Card Mosaic",
  "Card Drawer",
  "Kinetic Shelf",
  "Hinge Gallery",
  "Card Radar",
  "Card Telescope II",
  "Card Portal II",
  "Card Bloom",
  "Card Cascade II",
  "Card Theatre",
  "Final Gallery",
].map((name) => [name, name, ""]);
const themes = [
  "from-cyan-950/75 via-slate-950 to-blue-950/65",
  "from-indigo-950/75 via-slate-950 to-fuchsia-950/55",
  "from-emerald-950/70 via-slate-950 to-sky-950/55",
  "from-amber-950/55 via-slate-950 to-rose-950/55",
];
const effects = [
  "fade",
  "up",
  "down",
  "left",
  "right",
  "scale",
  "pop",
  "pulse",
  "glow",
  "shimmer",
  "progress",
  "spin",
  "orbit",
  "bounce",
  "wiggle",
  "shake",
  "heart",
  "check",
  "ring",
  "ripple",
  "flip",
  "lift",
  "tilt",
  "float",
  "marquee",
  "type",
  "underline",
  "gradient",
  "border",
  "blob",
  "wave",
  "dots",
  "bars",
  "counter",
  "confetti",
  "sparkle",
  "spotlight",
  "mask",
  "accordion",
  "toast",
  "ping",
  "drawer",
  "expand",
  "collapse",
  "rotate",
  "swoop",
  "jelly",
  "breathe",
  "magnet",
  "halo",
];
const advancedEffects = [
  "drag",
  "burst",
  "orbit",
  "magnet",
  "color",
  "stack",
  "zoom",
  "flock",
  "rotate",
  "ripple",
  "morph",
  "light",
  "launch",
  "reorder",
  "transform",
  "tunnel",
  "roll",
  "stretch",
  "hover",
  "prism",
  "select",
  "planet",
  "wave",
  "pop",
  "grid",
  "flip",
  "tower",
  "pick",
  "kaleidoscope",
  "gravity",
  "ribbon",
  "knot",
  "reactor",
  "fold",
  "meteor",
  "dna",
  "solar",
  "memory",
  "lens",
  "circuit",
  "cloud",
  "gem",
  "morphTunnel",
  "target",
  "satellite",
  "bloom",
  "paint",
  "comet",
  "mirror",
  "finale",
];
const futureEffects = [
  "cascade",
  "aperture",
  "diagonal",
  "curtain",
  "deck",
  "tiltIn",
  "dissolve",
  "corner",
  "rail",
  "relay",
  "spread",
  "pinwheel",
  "split",
  "depth",
  "fan",
  "snap",
  "focus",
  "parallax",
  "scaleRelay",
  "flipbook",
  "slideStack",
  "arc",
  "elevator",
  "elastic",
  "pixel",
  "clockwise",
  "counter",
  "spotlight",
  "portal",
  "zigzag",
  "shutter",
  "flow",
  "chain",
  "frame",
  "ladder",
  "collapseWave",
  "gallery",
  "foldIn",
  "scan",
  "bounceGrid",
  "rippleArrival",
  "rotationRelay",
  "hoverFloat",
  "softSpring",
  "diagonalFold",
  "peek",
  "merge",
  "prismFade",
  "cadence",
  "quiet",
];
const uniqueAdvanced = advancedPatterns
  .map((pattern, index) => ({ pattern, index }))
  .filter(({ index }) => !effects.includes(advancedEffects[index]));
const usedEffects = new Set([
  ...effects,
  ...uniqueAdvanced.map(({ index }) => advancedEffects[index]),
]);
const uniqueFuture = futurePatterns
  .map((pattern, index) => ({ pattern, index }))
  .filter(({ index }) => !usedEffects.has(futureEffects[index]));
const allSections = [
  ...patterns.map((pattern, index) => ({ pattern, index, type: "base" })),
  ...uniqueAdvanced.map(({ pattern, index }) => ({
    pattern,
    index,
    type: "advanced",
  })),
  ...uniqueFuture.map(({ pattern, index }) => ({
    pattern,
    index,
    type: "future",
  })),
  ...portalPatterns.map((pattern, index) => ({
    pattern,
    index,
    type: "portal",
  })),
];

function cardRecipe(effect, card) {
  const delay = card * 0.1;
  const recipe = (initial, animate, transition = {}) => ({
    initial,
    animate,
    transition: {
      duration: 0.75,
      delay,
      ease: [0.16, 1, 0.3, 1],
      ...transition,
    },
  });
  switch (effect) {
    case "drag":
      return recipe({ x: -180, opacity: 0 }, { x: 0, opacity: 1 });
    case "burst":
      return recipe(
        { scale: 0, opacity: 0 },
        { scale: [0, 1.22, 1], opacity: 1 },
      );
    case "orbit":
      return recipe(
        { x: 150, y: 0, opacity: 0 },
        { x: [0, 22, 0, -22, 0], y: [0, -22, -36, -22, 0], opacity: 1 },
        { duration: 1.4 },
      );
    case "magnet":
      return recipe(
        { x: card % 2 ? -130 : 130, opacity: 0 },
        { x: [0, card % 2 ? -18 : 18, 0], opacity: 1 },
      );
    case "color":
      return recipe(
        { opacity: 0, filter: "hue-rotate(180deg) blur(10px)" },
        { opacity: 1, filter: "hue-rotate(0deg) blur(0px)" },
      );
    case "stack":
      return recipe(
        { y: 150, scale: 0.7, opacity: 0 },
        { y: 0, scale: 1, opacity: 1 },
        { type: "spring", stiffness: 110, damping: 12 },
      );
    case "zoom":
      return recipe({ scale: 2.1, opacity: 0 }, { scale: 1, opacity: 1 });
    case "flock":
      return recipe(
        { x: (card - 1.5) * 150, y: 80, opacity: 0 },
        { x: [0, (card - 1.5) * 16, 0], y: [0, -20, 0], opacity: 1 },
        { duration: 1.2 },
      );
    case "rotate":
      return recipe(
        { rotate: -180, scale: 0.5, opacity: 0 },
        { rotate: 0, scale: 1, opacity: 1 },
      );
    case "ripple":
      return recipe(
        { scale: 0.35, opacity: 0, borderRadius: "50%" },
        { scale: [0.35, 1.12, 1], opacity: 1, borderRadius: "24px" },
      );
    case "morph":
      return recipe(
        { borderRadius: "50%", scale: 0.75, opacity: 0 },
        {
          borderRadius: ["50%", "12% 48% 20% 44%", "24px"],
          scale: 1,
          opacity: 1,
        },
      );
    case "light":
      return recipe(
        { opacity: 0, filter: "brightness(3) blur(16px)" },
        { opacity: 1, filter: "brightness(1) blur(0px)" },
      );
    case "launch":
      return recipe(
        { x: -240, y: 120, rotate: -35, opacity: 0 },
        { x: 0, y: 0, rotate: 0, opacity: 1 },
        { type: "spring", stiffness: 90, damping: 10 },
      );
    case "reorder":
      return recipe(
        { x: card % 2 ? 110 : -110, rotate: card % 2 ? 12 : -12, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1 },
      );
    case "transform":
      return recipe({ rotateY: 90, opacity: 0 }, { rotateY: 0, opacity: 1 });
    case "tunnel":
      return recipe(
        { scale: 0.2, opacity: 0, z: -400 },
        { scale: 1, opacity: 1, z: 0 },
      );
    case "roll":
      return recipe(
        { x: -150, rotate: -360, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1 },
      );
    case "stretch":
      return recipe(
        { scaleX: 0.25, scaleY: 1.8, opacity: 0 },
        { scaleX: [0.25, 1.18, 1], scaleY: [1.8, 0.88, 1], opacity: 1 },
      );
    case "hover":
      return recipe(
        { y: 90, opacity: 0 },
        { y: [0, -15, 0], opacity: 1 },
        { duration: 1.5 },
      );
    case "prism":
      return recipe(
        { rotate: 40, skewX: 18, opacity: 0 },
        { rotate: 0, skewX: 0, opacity: 1 },
      );
    case "select":
      return recipe(
        { scale: 0.55, opacity: 0 },
        { scale: [0.55, 1.15, 1], opacity: 1 },
      );
    case "planet":
      return recipe(
        { x: 170, y: -120, rotate: 150, opacity: 0 },
        { x: 0, y: 0, rotate: 0, opacity: 1 },
      );
    case "wave":
      return recipe(
        { y: 120, skewX: -18, opacity: 0 },
        { y: [0, -12, 0], skewX: [0, 8, 0], opacity: 1 },
        { duration: 1.25 },
      );
    case "pop":
      return recipe(
        { scale: 0, opacity: 0 },
        { scale: [0, 1.35, 0.92, 1], opacity: 1 },
      );
    case "grid":
      return recipe(
        { x: card * 55 - 90, y: card % 2 ? 80 : -80, opacity: 0 },
        { x: 0, y: 0, opacity: 1 },
      );
    case "flip":
      return recipe({ rotateX: -100, opacity: 0 }, { rotateX: 0, opacity: 1 });
    case "tower":
      return recipe(
        { y: card * 70 + 80, opacity: 0 },
        { y: 0, opacity: 1 },
        { type: "spring", stiffness: 150, damping: 15 },
      );
    case "pick":
      return recipe(
        { scale: 0.4, filter: "blur(12px)", opacity: 0 },
        { scale: 1, filter: "blur(0px)", opacity: 1 },
      );
    case "kaleidoscope":
      return recipe(
        { rotate: card * 90, scale: 0.4, opacity: 0 },
        { rotate: [card * 6, card * 6 + 12, card * 6], scale: 1, opacity: 1 },
      );
    case "gravity":
      return recipe(
        { x: (card - 1.5) * 180, y: card % 2 ? 80 : -80, opacity: 0 },
        {
          x: [0, (card - 1.5) * -16, 0],
          y: [0, card % 2 ? -12 : 12, 0],
          opacity: 1,
        },
      );
    case "ribbon":
      return recipe(
        { x: -200, skewY: -20, opacity: 0 },
        { x: [0, 16, 0], skewY: [0, 7, 0], opacity: 1 },
      );
    case "knot":
      return recipe(
        { rotate: 270, scale: 0.45, opacity: 0 },
        { rotate: [0, 10, -8, 0], scale: 1, opacity: 1 },
      );
    case "reactor":
      return recipe(
        { scale: 0.3, opacity: 0, filter: "brightness(4)" },
        { scale: [0.3, 1.18, 1], opacity: 1, filter: "brightness(1)" },
      );
    case "fold":
      return recipe(
        { rotateX: 70, rotateY: -35, opacity: 0 },
        { rotateX: 0, rotateY: 0, opacity: 1 },
      );
    case "meteor":
      return recipe(
        { x: 240, y: -180, rotate: 45, opacity: 0 },
        { x: 0, y: 0, rotate: 0, opacity: 1 },
      );
    case "dna":
      return recipe(
        { y: 140, rotate: 180, opacity: 0 },
        { y: [0, -18, 0], rotate: [0, 9, -9, 0], opacity: 1 },
      );
    case "solar":
      return recipe(
        { scale: 0.15, opacity: 0, filter: "brightness(5)" },
        { scale: [0.15, 1.3, 1], opacity: 1, filter: "brightness(1)" },
      );
    case "memory":
      return recipe(
        { x: card % 2 ? -150 : 150, rotate: card % 2 ? 45 : -45, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1 },
      );
    case "lens":
      return recipe(
        { scale: 1.8, filter: "blur(16px)", opacity: 0 },
        { scale: 1, filter: "blur(0px)", opacity: 1 },
      );
    case "circuit":
      return recipe(
        { x: -160, opacity: 0 },
        { x: [0, 14, 0], opacity: 1 },
        { duration: 1.1 },
      );
    case "cloud":
      return recipe(
        { x: card % 2 ? -180 : 180, y: -45, opacity: 0 },
        { x: [0, 12, 0], y: [0, -8, 0], opacity: 1 },
        { duration: 1.45 },
      );
    case "gem":
      return recipe(
        { rotate: 90, scale: 0.55, opacity: 0 },
        { rotate: [0, 7, -7, 0], scale: 1, opacity: 1 },
      );
    case "morphTunnel":
      return recipe(
        { scale: 0.1, rotate: 180, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1 },
      );
    case "target":
      return recipe(
        { scale: 2.4, opacity: 0 },
        { scale: [2.4, 0.85, 1], opacity: 1 },
      );
    case "satellite":
      return recipe(
        { x: 180, y: 90, rotate: 360, opacity: 0 },
        { x: [0, 18, 0], y: [0, -18, 0], rotate: [0, 15, 0], opacity: 1 },
      );
    case "bloom":
      return recipe(
        { scale: 0, opacity: 0, borderRadius: "50%" },
        { scale: [0, 1.22, 1], opacity: 1, borderRadius: "24px" },
      );
    case "paint":
      return recipe(
        { x: -120, skewY: 20, filter: "hue-rotate(220deg)", opacity: 0 },
        { x: 0, skewY: 0, filter: "hue-rotate(0deg)", opacity: 1 },
      );
    case "comet":
      return recipe(
        { x: -260, y: 120, opacity: 0 },
        { x: 0, y: 0, opacity: 1 },
        { type: "spring", stiffness: 100, damping: 11 },
      );
    case "mirror":
      return recipe({ scaleX: -1, opacity: 0 }, { scaleX: 1, opacity: 1 });
    case "finale":
      return recipe(
        { x: 0, y: 180, scale: 0.3, rotate: 180, opacity: 0 },
        { x: 0, y: 0, scale: [0.3, 1.16, 1], rotate: 0, opacity: 1 },
      );
    default:
      return recipe({ opacity: 0, y: 50 }, { opacity: 1, y: 0 });
  }
}

function AdvancedCards({ index, paused }) {
  const reduce = useReducedMotion();
  const effect = advancedEffects[index];
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [selected, setSelected] = useState(null);
  const cardContent = [
    [siteContent.role, siteContent.heroCopy, "Explore projects"],
    ["About my work", siteContent.about, "Read story"],
    ["Current journey", siteContent.journey, "See experience"],
    [
      "Core expertise",
      siteContent.expertise.slice(0, 4).join(" · "),
      "View skills",
    ],
  ];
  const relocate = (from, offset) => {
    if (Math.abs(offset) < 85) return;
    const to = offset > 0 ? Math.min(from + 1, 3) : Math.max(from - 1, 0);
    setOrder((items) => {
      const next = [...items];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  };
  return (
    <div className="w-full">
      <p className="mb-4 text-center text-xs font-bold uppercase tracking-[.16em] text-teal-200/80">
        Drag cards left or right to reorder · click any card to expand
      </p>
      <div className="grid w-full gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {order.map((card, position) => {
          const [label, copy, action] = cardContent[card];
          const isSelected = selected === card;
          const recipe = cardRecipe(effect, card);
          const animationTarget =
            paused || reduce
              ? recipe.initial
              : isSelected
                ? {
                    ...recipe.animate,
                    scale: 1.07,
                    y: -14,
                    boxShadow: "0 25px 55px rgba(45,212,191,.22)",
                  }
                : recipe.animate;
          return (
            <motion.article
              layout
              key={label}
              drag="x"
              dragConstraints={{ left: -190, right: 190 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => relocate(position, info.offset.x)}
              onClick={() => setSelected(isSelected ? null : card)}
              initial={recipe.initial}
              whileInView={animationTarget}
              whileHover={{ y: -12, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ ...recipe.transition, delay: position * 0.09 }}
              className="relative min-h-[280px] cursor-grab touch-pan-y rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl backdrop-blur active:cursor-grabbing"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-teal-300/30 to-blue-500/30 text-xl text-teal-100">
                  {["↗", "✦", "◌", "✓"][card]}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">
                  Card {card + 1}
                </span>
              </div>
              <p className="mt-9 text-xs font-bold uppercase tracking-[.14em] text-teal-300">
                {label}
              </p>
              <h2 className="mt-3 text-xl font-bold leading-7 text-white">
                {copy}
              </h2>
              <button
                type="button"
                className="mt-8 text-sm font-bold text-teal-300 underline decoration-teal-300/35 underline-offset-4"
              >
                {action} →
              </button>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

function FutureCards({ index, paused }) {
  const reduce = useReducedMotion();
  const effect = futureEffects[index];
  const [selected, setSelected] = useState(null);
  const content = [
    [
      siteContent.educationCards[0].title,
      siteContent.educationCards[0].note,
      "View qualification",
    ],
    [
      siteContent.educationCards[1].title,
      siteContent.educationCards[1].note,
      "View program",
    ],
    [
      siteContent.experiences[0].company,
      siteContent.experiences[0].points[0],
      "View role",
    ],
    [
      siteContent.experiences[1].company,
      siteContent.experiences[1].points[0],
      "View role",
    ],
  ];
  const direction = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ][index % 8];
  const distance = 90 + (index % 5) * 24;
  const angle = ((index * 23) % 80) - 40;
  const initial = {
    opacity: 0,
    x: direction[0] * distance,
    y: direction[1] * distance,
    scale: 0.55 + (index % 4) * 0.1,
    rotate: angle,
    rotateX: index % 2 ? 0 : angle,
    filter: "blur(10px) saturate(.5)",
  };
  const kind = index % 10;
  const base =
    paused || reduce
      ? initial
      : kind === 0
        ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }
        : kind === 1
          ? {
              opacity: 1,
              x: [0, 12, -8, 0],
              y: 0,
              scale: 1,
              rotate: 0,
              filter: "blur(0px)",
            }
          : kind === 2
            ? {
                opacity: 1,
                x: 0,
                y: [0, -18, 0],
                scale: [1, 1.05, 1],
                rotate: 0,
                filter: "blur(0px)",
              }
            : kind === 3
              ? {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: [0, 6, -4, 0],
                  filter: "blur(0px)",
                }
              : kind === 4
                ? {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: [0.7, 1.12, 1],
                    rotate: 0,
                    filter: "blur(0px)",
                  }
                : kind === 5
                  ? {
                      opacity: 1,
                      x: 0,
                      y: [0, 10, 0],
                      scale: 1,
                      rotate: [0, -3, 3, 0],
                      filter: "blur(0px)",
                    }
                  : kind === 6
                    ? {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        rotate: 0,
                        skewX: [0, 6, 0],
                        filter: "blur(0px)",
                      }
                    : kind === 7
                      ? {
                          opacity: 1,
                          x: 0,
                          y: 0,
                          scale: [1, 1.03, 1],
                          rotate: [0, 2, 0],
                          filter: "blur(0px)",
                        }
                      : kind === 8
                        ? {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            scale: 1,
                            rotate: 0,
                            filter: [
                              "blur(0px)",
                              "brightness(1.3)",
                              "blur(0px)",
                            ],
                          }
                        : {
                            opacity: 1,
                            x: 0,
                            y: 0,
                            scale: 1,
                            rotate: 0,
                            filter: "blur(0px)",
                            borderRadius: [20, 48, 20],
                          };
  const focusOrder = index % 2 === 0 ? -1 : 9;
  const focusSpan = index % 5 === 0 || index % 5 === 3 ? "span 2" : "auto";
  const focusOrigin =
    index % 4 === 0
      ? "0% 50%"
      : index % 4 === 1
        ? "100% 50%"
        : index % 4 === 2
          ? "50% 0%"
          : "50% 100%";
  return (
    <div className="w-full">
      <p className="mb-4 text-center text-xs font-bold uppercase tracking-[.16em] text-teal-200/80">
        Click a card to focus it · every section uses a different focus layout
      </p>
      <div className="grid w-full gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {content.map(([label, copy, action], card) => {
          const focused = selected === card;
          const focusState = {
            ...base,
            scale: 1.08 + (index % 3) * 0.025,
            y: index % 2 === 0 ? -14 : 14,
            boxShadow: "0 26px 56px rgba(96,165,250,.24)",
          };
          return (
            <motion.article
              key={label}
              layout
              style={{
                order: focused ? focusOrder : 0,
                gridColumn: focused ? focusSpan : "auto",
                transformOrigin: focusOrigin,
              }}
              initial={{
                ...initial,
                x: initial.x + (card - 1.5) * 18,
                y: initial.y + (card % 2 ? 14 : -14),
              }}
              whileInView={
                paused || reduce ? initial : focused ? focusState : base
              }
              whileHover={{ y: -9, scale: 1.025 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(focused ? null : card)}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                type: index % 3 === 0 ? "spring" : "tween",
                stiffness: 100 + index * 2,
                damping: 16 + (card % 3),
                duration: 0.6 + (index % 5) * 0.08,
                delay: card * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="min-h-[280px] cursor-pointer rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl backdrop-blur"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-blue-400/30 to-fuchsia-400/30 text-xl text-blue-100">
                  {["◈", "⌁", "◉", "✶"][card]}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">
                  {effect}
                </span>
              </div>
              <p className="mt-9 text-xs font-bold uppercase tracking-[.14em] text-blue-300">
                {label}
              </p>
              <h2 className="mt-3 text-xl font-bold leading-7 text-white">
                {copy}
              </h2>
              <button
                type="button"
                className="mt-8 text-sm font-bold text-blue-300 underline decoration-blue-300/35 underline-offset-4"
              >
                {action} →
              </button>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}

function PortalCards({ index, paused }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const phase = index % 10;
  const cards = siteContent.skillGroups.slice(0, 4).map((group) => group.title);
  const pose = (card) => {
    const offset = card - active;
    const spread = 110 + (index % 6) * 22;
    const entering = [
      {
        x: offset * spread,
        rotateY: offset * -28,
        scale: offset === 0 ? 1 : 0.72,
        opacity: Math.abs(offset) > 2 ? 0 : 0.52,
      },
      {
        x: Math.cos((card + index) * 1.57) * spread,
        y: Math.sin((card + index) * 1.57) * 55,
        rotate: card * 90,
        scale: 0.78,
        opacity: 0.7,
      },
      {
        x: (card - 1.5) * spread,
        y: (card - 1.5) * 18,
        rotate: (card - 1.5) * 12,
        scale: card === active ? 1 : 0.82,
        opacity: 0.75,
      },
      {
        x: offset * spread,
        y: offset * offset * 18,
        rotateY: offset * -34,
        scale: offset === 0 ? 1 : 0.7,
        opacity: 0.65,
      },
      {
        x: offset * spread,
        y: 0,
        rotate: offset * 18,
        scale: offset === 0 ? 1 : 0.76,
        opacity: 0.7,
      },
      {
        x: Math.sin((card - active) * 1.4) * spread,
        y: Math.cos((card - active) * 1.4) * 45,
        rotate: offset * 25,
        scale: offset === 0 ? 1 : 0.74,
        opacity: 0.7,
      },
      {
        x: offset * spread,
        y: offset * 35,
        rotateX: offset * -18,
        scale: offset === 0 ? 1 : 0.78,
        opacity: 0.72,
      },
      {
        x: offset * spread,
        y: 0,
        rotate: offset * 8,
        scale: offset === 0 ? 1 : 0.8,
        opacity: 0.7,
      },
      {
        x: Math.cos(card * 1.57 + index) * spread,
        y: Math.sin(card * 1.57 + index) * 70,
        rotate: card * 90,
        scale: 0.78,
        opacity: 0.7,
      },
      {
        x: offset * spread,
        y: offset % 2 ? 55 : -55,
        rotateY: offset * -45,
        scale: offset === 0 ? 1 : 0.7,
        opacity: 0.65,
      },
    ][phase];
    return reduce || paused
      ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }
      : entering;
  };
  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-3xl border border-blue-300/20 bg-slate-950/70 [perspective:1200px] sm:h-[560px]">
      <p className="absolute left-5 top-5 z-20 text-xs font-bold uppercase tracking-[.16em] text-blue-200">
        Click a card to activate the {portalPatterns[index][0]} layout
      </p>
      <div className="absolute inset-0 grid place-items-center [transform-style:preserve-3d]">
        {cards.map((name, card) => (
          <motion.article
            key={name}
            onClick={() => setActive(card)}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={pose(card)}
            transition={{
              type: "spring",
              stiffness: 110 + (index % 5) * 25,
              damping: 16,
            }}
            className="absolute inset-x-4 h-72 w-auto cursor-pointer rounded-3xl border border-white/15 bg-gradient-to-br from-blue-500/30 via-slate-900 to-fuchsia-500/20 p-8 shadow-2xl [backface-visibility:hidden] sm:h-80"
          >
            <span className="text-xs font-bold uppercase tracking-[.16em] text-blue-200">
              0{card + 1}
            </span>
            <h2 className="mt-20 text-3xl font-bold">{name}</h2>
            <p className="mt-3 text-base text-slate-300">
              Interactive portal card
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function SectionMotion({ index, paused, children }) {
  const reduce = useReducedMotion();
  const effect = effects[index];
  const initial = useMemo(
    () => ({
      opacity: 0,
      x: effect === "left" ? -90 : effect === "right" ? 90 : 0,
      y: effect === "up" ? 70 : effect === "down" ? -70 : 18,
      scale: effect === "scale" ? 0.84 : 1,
      rotate: effect === "rotate" ? -18 : 0,
    }),
    [effect],
  );
  const animate = useMemo(
    () => ({ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }),
    [],
  );
  return (
    <motion.div
      initial={initial}
      whileInView={paused || reduce ? initial : animate}
      viewport={{ once: false, amount: 0.28 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 w-full"
    >
      {children}
    </motion.div>
  );
}

function PreviewCards({ index, paused }) {
  const reduce = useReducedMotion();
  const effect = effects[index];
  const initial = {
    opacity: 0,
    x: effect === "left" ? -80 : effect === "right" ? 80 : 0,
    y: effect === "up" ? 70 : effect === "down" ? -70 : 28,
    scale: effect === "scale" || effect === "pop" ? 0.7 : 1,
    rotate: effect === "flip" ? -90 : 0,
  };
  const active =
    paused || reduce
      ? initial
      : {
          opacity: 1,
          x: 0,
          y:
            effect === "bounce"
              ? [0, -16, 0]
              : effect === "float"
                ? [0, -12, 0]
                : 0,
          scale:
            effect === "pop"
              ? [1, 1.08, 1]
              : effect === "pulse" || effect === "breathe"
                ? [1, 1.05, 1]
                : 1,
          rotate:
            effect === "wiggle"
              ? [0, -3, 3, 0]
              : effect === "tilt"
                ? [0, -4, 4, 0]
                : effect === "rotate"
                  ? [0, 180, 360]
                  : 0,
        };
  const cardContent = [
    [siteContent.firstName, siteContent.heroCopy, "View projects"],
    ["About", siteContent.about, "Read story"],
    ["Journey", siteContent.journey, "See experience"],
  ];
  return (
    <div className="grid w-full gap-5 sm:grid-cols-3">
      {cardContent.map(([label, copy, action], card) => (
        <motion.article
          key={label}
          initial={initial}
          whileInView={active}
          viewport={{ once: false, amount: 0.45 }}
          transition={{
            duration: 0.7 + card * 0.12,
            repeat:
              effect === "bounce" || effect === "float" || effect === "pulse"
                ? Infinity
                : 0,
            ease: "easeOut",
            delay: card * 0.11,
          }}
          className={`min-h-[250px] rounded-3xl border border-white/10 bg-slate-950/55 p-6 shadow-xl backdrop-blur ${effect === "glow" && card === 1 ? "shadow-[0_0_35px_rgba(103,240,221,.32)]" : ""} ${effect === "border" && card === 1 ? "border-teal-300" : ""}`}
        >
          <div className="flex items-center justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-300/15 text-lg text-teal-200">
              {["✦", "↗", "✓"][card]}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-slate-400">
              Live
            </span>
          </div>
          <p className="mt-7 text-sm font-bold uppercase tracking-[.13em] text-teal-200">
            {label}
          </p>
          <h2 className="mt-3 text-xl font-bold leading-7 text-white">
            {copy}
          </h2>
          <button
            type="button"
            className="mt-7 text-sm font-bold text-teal-300 underline decoration-teal-300/35 underline-offset-4"
          >
            {action} →
          </button>
        </motion.article>
      ))}
    </div>
  );
}

const labProjects = [
  { title: "Quick Recall", copy: "Study SaaS built with JWT auth, REST APIs, admin workflows, role-based access control, and personalized news features." },
  { title: "News Poll", copy: "News and blog platform with topic-wise content flow, smooth news-to-blog navigation, and comments." },
  { title: "Global Discussion Hub", copy: "Discussion SaaS with secure public and private rooms, video calls, realtime chat, and AI-powered summaries." },
  { title: "E-Commerce Platform", copy: "Modern e-commerce product browsing and shopping flow with a responsive storefront experience." },
  { title: "Tenant Notes SaaS", copy: "Multi-tenant notes SaaS with RBAC, isolated user workflows, and admin-oriented task and analytics flows." },
];
const labImages = [
  siteContent.profileImage,
  siteContent.aboutImage,
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
];
const labSwiperStyles = "[--swiper-theme-color:#67f0dd] [--swiper-navigation-color:#fff] [--swiper-navigation-size:17px] [&_.swiper-button-next]:h-10 [&_.swiper-button-next]:w-10 [&_.swiper-button-prev]:h-10 [&_.swiper-button-prev]:w-10 [&_.swiper-button-next]:rounded-full [&_.swiper-button-prev]:rounded-full [&_.swiper-button-next]:border [&_.swiper-button-prev]:border [&_.swiper-button-next]:border-white/20 [&_.swiper-button-prev]:border-white/20 [&_.swiper-button-next]:bg-[rgba(7,17,31,.84)] [&_.swiper-button-prev]:bg-[rgba(7,17,31,.84)] [&_.swiper-button-next::after]:text-[13px] [&_.swiper-button-prev::after]:text-[13px] [&_.swiper-button-next::after]:font-extrabold [&_.swiper-button-prev::after]:font-extrabold";

function LabTitle({ number, title, copy }) {
  return (
    <div className="mb-7">
      <p className="text-xs font-extrabold uppercase tracking-[.22em] text-teal-300">
        Swiper lab · {String(number).padStart(2, "0")}
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{copy}</p>
    </div>
  );
}

function SwiperLab({ projects, educationCards }) {
  const [effect, setEffect] = useState("fade");
  const [effectSwiper, setEffectSwiper] = useState(null);
  const [autoplaySwiper, setAutoplaySwiper] = useState(null);
  const autoplayProgressRef = useRef(null);
  const autoplayFillRef = useRef(null);
  const autoplayDotRefs = useRef([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [controlledSwiper, setControlledSwiper] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const [urlSlide, setUrlSlide] = useState(
    () =>
      Number(new URLSearchParams(window.location.search).get("demoSlide")) || 0,
  );
  const projectContent = useMemo(() => {
    const apiProjects = projects.map((project) => ({ title: project.title, copy: project.description }));
    return [
      ...apiProjects,
      ...labProjects.filter((fallback) => !apiProjects.some((project) => project.title.toLowerCase() === fallback.title.toLowerCase())),
    ];
  }, [projects]);
  const effectContent = [
    ...educationCards.map((item) => ({ badge: item.badge, year: item.year, title: item.title, copy: `${item.institution}. ${item.note}` })),
    { badge: "Home", year: siteContent.role, title: `${siteContent.firstName} ${siteContent.lastName}`, copy: siteContent.heroCopy },
    { badge: "About", year: "Portfolio story", title: "How I work", copy: siteContent.about },
    ...projectContent.map((project) => ({ badge: "Project", year: "Portfolio work", title: project.title, copy: project.copy })),
    ...siteContent.experiences.map((experience) => ({ badge: "Experience", year: experience.period, title: `${experience.role} · ${experience.company}`, copy: experience.points.join(" ") })),
    { badge: "Skills", year: "Home toolkit", title: "Core expertise", copy: siteContent.expertise.join(" · ") },
  ];
  const virtualSlides = useMemo(() => Array.from({ length: 150 }, (_, index) => {
    const project = projectContent[index % projectContent.length];
    return { ...project, record: index + 1 };
  }), [projectContent]);

  const recordSlide = (swiper) => {
    const url = new URL(window.location.href);
    url.searchParams.set("demoSlide", String(swiper.realIndex));
    window.history.replaceState({}, "", url);
    setUrlSlide(swiper.realIndex);
  };
  const syncAutoplayControls = (swiper) => {
    const index = swiper.realIndex;
    if (autoplayProgressRef.current) autoplayProgressRef.current.value = String(index);
    if (autoplayFillRef.current) autoplayFillRef.current.style.width = `${((index + 1) / projectContent.length) * 100}%`;
    autoplayDotRefs.current.forEach((dot, dotIndex) => {
      if (!dot) return;
      dot.classList.toggle("bg-teal-300", dotIndex === index);
      dot.classList.toggle("shadow-[0_0_12px_rgba(103,240,221,.8)]", dotIndex === index);
      dot.classList.toggle("bg-white/30", dotIndex !== index);
    });
  };

  return (
    <section className="relative w-full max-w-none border-b border-white/10 bg-slate-950 px-4 py-20 sm:px-8 lg:px-12">
      <div className="w-full max-w-none">
        <div className="grid gap-10">
          <div className="rounded-3xl border border-white bg-white/[.03] p-3 sm:p-8">
            <LabTitle
              number={1}
              title="Autoplay + pause on hover + infinite loop"
              
            />
            <div className="relative">
            <Swiper
              key={`autoplay-projects-${projectContent.map((project) => project.title).join("-")}`}
              modules={[A11y, Autoplay, Navigation, Pagination, Scrollbar]}
              rewind
              autoplay={{
                delay: 2400,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true, dragSize: "auto" }}
              navigation
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={18}
              speed={550}
              onSwiper={(swiper) => { setAutoplaySwiper(swiper); syncAutoplayControls(swiper); }}
              onSlideChange={syncAutoplayControls}
              className={`${labSwiperStyles} w-full min-w-0 h-[310px] min-h-[310px] !pb-10 [&_.swiper-slide]:block [&_.swiper-slide]:h-[250px] [&_.swiper-button-next]:z-[4] [&_.swiper-button-prev]:z-[4] [&_.swiper-scrollbar]:hidden [&_.swiper-pagination]:hidden`}
            >
              {projectContent.map((project) => (
                <SwiperSlide key={project.title}>
                  <article className="min-h-56 rounded-3xl border border-teal-300/20 bg-gradient-to-br from-teal-400/15 to-blue-500/10 p-6">
                    <p className="text-xs font-bold tracking-[.18em] text-teal-200">
                      FEATURED WORK
                    </p>
                    <h3 className="mt-6 text-2xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-300">
                      {project.copy}
                    </p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="relative z-10 -mt-4 flex flex-col gap-4 px-3 sm:px-10">
              <div className="relative mx-auto h-[5px] w-[min(56%,980px)] overflow-hidden rounded-full bg-slate-400/25"><span ref={autoplayFillRef} className="absolute inset-y-0 left-0 w-1/5 rounded-full bg-gradient-to-r from-[#67f0dd] to-[#5c8cff] transition-[width] duration-[450ms] ease-out" /><input ref={autoplayProgressRef} aria-label="Project slide progress" type="range" min="0" max={Math.max(projectContent.length - 1, 0)} defaultValue="0" onChange={(event) => autoplaySwiper?.slideTo(Number(event.target.value))} className="absolute -inset-y-2 inset-x-0 m-0 h-[21px] w-full cursor-ew-resize opacity-0" /></div>
              <div className="flex flex-wrap items-center justify-center gap-2" aria-label="Project pagination">
                {projectContent.map((project, index) => <button ref={(element) => { autoplayDotRefs.current[index] = element; }} key={`${project.title}-page`} type="button" onClick={() => autoplaySwiper?.slideTo(index)} aria-label={`Show ${project.title}`} className={`h-3 w-3 rounded-full transition hover:bg-white/60 ${index === 0 ? "bg-teal-300 shadow-[0_0_12px_rgba(103,240,221,.8)]" : "bg-white/30"}`} />)}
              </div>
            </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
            <LabTitle
              number={2}
              title="Effect gallery: fade, cube, flip, coverflow, cards, creative"
              copy="Select an effect to compare real education, Home, and About content in six different visual treatments."
            />
            <div className="mb-6 flex flex-wrap gap-2">
              {["fade", "cube", "flip", "coverflow", "cards", "creative"].map(
                (name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setEffect(name)}
                    className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[.12em] ${effect === name ? "bg-teal-300 text-slate-950" : "border border-white/15 text-slate-200"}`}
                  >
                    {name}
                  </button>
                ),
              )}
            </div>
            <div className="mb-5 flex flex-wrap gap-2" aria-label="Choose qualification content">
              {educationCards.map((item, index) => <button key={item.title} type="button" onClick={() => effectSwiper?.slideTo(index)} className="rounded-full border border-cyan-200/25 bg-cyan-200/5 px-3 py-2 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-200/15">{item.badge}: {item.title}</button>)}
            </div>
            <div className="mb-5 flex flex-wrap gap-2" aria-label="Choose portfolio content">
              {[{ label: "Home", slide: educationCards.length }, { label: "About", slide: educationCards.length + 1 }, ...projectContent.map((project, index) => ({ label: project.title, slide: educationCards.length + 2 + index })), ...siteContent.experiences.map((experience, index) => ({ label: experience.company, slide: educationCards.length + 2 + projectContent.length + index })), { label: "Skills", slide: effectContent.length - 1 }].map((item) => <button key={item.label} type="button" onClick={() => effectSwiper?.slideTo(item.slide)} className="rounded-full border border-violet-200/25 bg-violet-200/5 px-3 py-2 text-xs font-semibold text-violet-100 transition hover:bg-violet-200/15">{item.label}</button>)}
            </div>
            <Swiper
              key={effect}
              modules={[
                A11y,
                EffectCards,
                EffectCoverflow,
                EffectCreative,
                EffectCube,
                EffectFade,
                EffectFlip,
                Navigation,
                Pagination,
              ]}
              effect={effect}
              onSwiper={setEffectSwiper}
              navigation
              pagination={{ clickable: true }}
              centeredSlides={effect === "coverflow"}
              slidesPerView={effect === "coverflow" ? "auto" : 1}
              coverflowEffect={{ rotate: 28, depth: 120, slideShadows: false }}
              creativeEffect={{
                prev: { translate: ["-110%", 0, -400], rotate: [0, 0, -8] },
                next: { translate: ["110%", 0, -400], rotate: [0, 0, 8] },
              }}
              className={`${labSwiperStyles} h-[360px] pt-3 !pb-10 [&_.swiper-slide]:h-[290px]`}
            >
              {effectContent.map((item) => (
                <SwiperSlide
                  key={`${item.badge}-${item.title}`}
                  className={
                    effect === "coverflow" ? "w-[min(82vw,460px)]" : ""
                  }
                >
                  <article className="min-h-64 rounded-3xl border border-white/15 bg-[#13203a] p-7">
                    <p className="text-xs font-bold tracking-[.18em] text-cyan-200">
                      {item.badge} · {item.year}
                    </p>
                    <h3 className="mt-5 text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-300">{item.copy}</p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
              <LabTitle
                number={3}
                title="Vertical + mouse wheel"
                copy="Move the pointer inside this panel and use the wheel, arrows, or drag. It releases at the edges so page scrolling remains available."
              />
              <Swiper
                modules={[A11y, Keyboard, Mousewheel, Pagination]}
                direction="vertical"
                mousewheel={{ releaseOnEdges: true }}
                keyboard={{ enabled: true }}
                pagination={{ clickable: true }}
                className={`${labSwiperStyles} h-[340px]`}
              >
                {siteContent.experiences.map((item) => (
                  <SwiperSlide key={item.company}>
                    <article className="grid h-full place-items-center rounded-3xl border border-violet-300/20 bg-violet-400/10 p-7 text-center">
                      <p className="text-xs font-bold tracking-[.18em] text-violet-200">
                        {item.period}
                      </p>
                      <h3 className="mt-4 text-2xl font-bold">{item.role}</h3>
                      <p className="mt-2 text-slate-300">{item.company}</p>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
              <LabTitle
                number={4}
                title="Slide groups + multi-row grid + progress scrollbar"
                copy="A compact certification library: navigate cards in grouped two-row pages, or drag the progress bar."
              />
              <Swiper
                modules={[A11y, Grid, Navigation, Scrollbar]}
                navigation
                scrollbar={{ draggable: true }}
                grid={{ rows: 2, fill: "row" }}
                slidesPerView={2}
                slidesPerGroup={2}
                spaceBetween={14}
                className={`${labSwiperStyles} h-[250px] !pb-9`}
              >
                {[
                  ...educationCards,
                  ...siteContent.expertise.map((skill) => ({
                    title: skill,
                    institution: "Technology skill",
                    badge: "Stack",
                  })),
                ].map((item) => (
                  <SwiperSlide key={`${item.title}-${item.badge}`}>
                    <article className="h-full rounded-2xl border border-white/10 bg-slate-900 p-4">
                      <p className="text-[10px] font-bold tracking-[.14em] text-teal-200">
                        {item.badge}
                      </p>
                      <h3 className="mt-4 text-sm font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-400">
                      {item.copy}
                      </p>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="rounded-3xl border text-black border-white/10 bg-white/[.03] p-6 sm:p-8">
            <LabTitle
              number={5}
              title="Thumbnail navigation + controller mode"
              copy="The large project view is controlled by the thumbnail rail below it. This is the recommended pattern for real project screenshots."
            />
            <Swiper
              modules={[A11y, Controller, EffectFade, Navigation, Thumbs]}
              effect="fade"
              navigation
              controller={{ control: controlledSwiper }}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              className={`${labSwiperStyles} lab-main-gallery`}
            >
              {labImages.map((image, index) => (
                <SwiperSlide key={image}>
                  <article className="relative overflow-hidden rounded-3xl">
                    <img src={image} loading="lazy" decoding="async" alt={projectContent[index % projectContent.length].title} className="h-80 w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 to-transparent p-6"><p className="text-xs font-bold tracking-[.16em] text-teal-200">{index === 0 ? "HOME" : index === 1 ? "ABOUT" : "PROJECT"}</p><h3 className="mt-2 text-xl font-bold">{index === 1 ? "How I work" : projectContent[index % projectContent.length].title}</h3><p className="mt-2 line-clamp-2 text-sm text-slate-200">{index === 1 ? siteContent.about : projectContent[index % projectContent.length].copy}</p></div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper
              modules={[A11y, Controller, Thumbs]}
              onSwiper={setThumbsSwiper}
              controller={{ control: controlledSwiper }}
              onSlideChange={(swiper) => setControlledSwiper(swiper)}
              watchSlidesProgress
              slidesPerView={3}
              spaceBetween={12}
              className="mt-4 [&_.swiper-slide]:opacity-50 [&_.swiper-slide]:transition-opacity [&_.swiper-slide]:duration-200 [&_.swiper-slide]:ease-out [&_.swiper-slide-thumb-active]:opacity-100 [&_.swiper-slide-thumb-active]:outline [&_.swiper-slide-thumb-active]:outline-2 [&_.swiper-slide-thumb-active]:outline-[#67f0dd] [&_.swiper-slide-thumb-active]:outline-offset-2 [&_.swiper-slide-thumb-active]:rounded-xl"
            >
              {labImages.map((image, index) => (
                <SwiperSlide key={`${image}-thumb`}>
                  <img
                    src={image}
                    loading="lazy"
                    alt={`Open ${projectContent[index % projectContent.length].title}`}
                    className="h-20 w-full cursor-pointer rounded-xl object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
              <LabTitle
                number={6}
                title="Shareable slide state"
                copy={`This slider writes its current slide to the URL as ?demoSlide=. Current shared slide: ${urlSlide + 1}.`}
              />
              <Swiper
                modules={[A11y, Keyboard, Navigation, Pagination]}
                initialSlide={urlSlide}
                keyboard={{ enabled: true }}
                navigation
                pagination={{ clickable: true }}
                onSlideChange={recordSlide}
                className={`${labSwiperStyles} !pb-10`}
              >
                {projectContent.map((project, index) => (
                  <SwiperSlide key={project.title}>
                    <article className="min-h-56 rounded-3xl border border-blue-300/20 bg-blue-500/10 p-7">
                      <p className="text-xs font-bold text-blue-200">
                        SLIDE {index + 1}
                      </p>
                      <h3 className="mt-6 text-2xl font-bold">
                        {project.title}
                      </h3>
                      <p className="mt-3 text-slate-300">{project.copy}</p>
                      <p className="mt-4 text-xs text-blue-100/70">
                        Copy the address after moving between slides to restore
                        this position.
                      </p>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
              <LabTitle
                number={7}
                title="Parallax layers"
                copy="Foreground copy and background accents move at separate speeds while the slide changes."
              />
              <Swiper
                modules={[A11y, Navigation, Pagination, Parallax]}
                parallax
                navigation
                pagination={{ clickable: true }}
                speed={700}
                className={`${labSwiperStyles} !pb-10`}
              >
                {projectContent.slice(0, 3).map((project, index) => (
                  <SwiperSlide key={project.title}>
                    <article className="relative min-h-56 overflow-hidden rounded-3xl bg-gradient-to-br from-[#182a55] to-[#13152c] p-7">
                      <div
                        data-swiper-parallax="-180%"
                        className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-teal-300/20 blur-2xl"
                      />
                      <p
                        data-swiper-parallax="-300"
                        className="relative text-xs font-bold tracking-[.18em] text-teal-200"
                      >
                        LAYER {index + 1}
                      </p>
                      <h3
                        data-swiper-parallax="-500"
                        className="relative mt-6 text-3xl font-bold"
                      >
                        {project.title}
                      </h3>
                      <p
                        data-swiper-parallax="-700"
                        className="relative mt-4 max-w-md text-slate-300"
                      >
                        {project.copy}
                      </p>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
              <LabTitle
                number={8}
                title="Virtual slides"
                copy="Only visible cards are rendered even though this demo contains 150 project records. Useful only for very large CMS lists."
              />
              <Swiper
                modules={[A11y, Navigation, Pagination, Virtual]}
                virtual
                navigation
                pagination={{ clickable: true }}
                slidesPerView={1}
                breakpoints={{ 700: { slidesPerView: 3 } }}
                spaceBetween={14}
                className={`${labSwiperStyles} !pb-10`}
              >
                {virtualSlides.map((project, index) => (
                  <SwiperSlide key={`${project.title}-${project.record}`} virtualIndex={index}>
                    <article className="min-h-40 rounded-2xl border border-white/10 bg-slate-900 p-5">
                      <p className="text-xs font-bold tracking-[.16em] text-teal-200">
                        PROJECT RECORD {String(project.record).padStart(3, "0")}
                      </p>
                      <h3 className="mt-4 text-lg font-bold">{project.title}</h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">{project.copy}</p>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
              <LabTitle
                number={9}
                title="Zoom gallery + lightbox"
                copy="Click an image to open the lightbox. Inside the slider, use pinch/scroll zoom and the navigation controls."
              />
              <Swiper
                modules={[A11y, Navigation, Pagination, Zoom]}
                zoom
                navigation
                pagination={{ clickable: true }}
                className={`${labSwiperStyles} !pb-10`}
              >
                {labImages.map((image, index) => (
                  <SwiperSlide key={`${image}-zoom`} zoom>
                    <button type="button" onClick={() => setLightbox(index)} className="relative block w-full overflow-hidden rounded-3xl">
                      <img
                        src={image}
                        loading="lazy"
                        decoding="async"
                        alt={`Open ${projectContent[index % projectContent.length].title}`}
                        className="h-56 w-full object-cover"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-slate-950/75 p-4 text-left text-sm font-bold">{index === 1 ? "About: How I work" : projectContent[index % projectContent.length].title}</span>
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      {lightbox !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project image lightbox"
          className="fixed inset-0 z-[80] grid place-items-center bg-slate-950/90 p-6 backdrop-blur"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 rounded-full border border-white/20 px-4 py-2 text-sm font-bold"
          >
            Close
          </button>
          <img
            src={labImages[lightbox]}
            alt="Expanded project screen"
            className="max-h-[82vh] max-w-full rounded-3xl object-contain"
          />
        </div>
      )}
    </section>
  );
}

export default function Animations() {
  const [paused, setPaused] = useState(false);
  const [replay, setReplay] = useState(0);
  const [projects, setProjects] = useState([]);
  const [educationCards, setEducationCards] = useState([]);
  useEffect(() => {
    api
      .get("/projects")
      .then((res) => setProjects(res?.data ?? []))
      .catch(() => setProjects([]));
    api
      .get("/content/education")
      .then((res) => setEducationCards(res?.data ?? []))
      .catch(() => setEducationCards([]));
  }, []);
  return (
    <main
      className="w-full max-w-none overflow-hidden pt-20"
      style={{ overflowX: "hidden", overflowY: "hidden" }}
    >
      {/* <div className="sticky top-20 z-40 border-y border-white/10 bg-slate-950/85 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <p className="text-xs font-bold uppercase tracking-[.15em] text-slate-300">
            50 full-section motion studies
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPaused(!paused)}
              className="rounded-full bg-teal-300 px-4 py-2 text-xs font-extrabold text-slate-950"
            >
              {paused ? "Play" : "Pause"}
            </button>
            <button
              type="button"
              onClick={() => setReplay(replay + 1)}
              className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold"
            >
              Replay
            </button>
          </div>
        </div>
      </div> */}
      <SwiperLab projects={projects} educationCards={educationCards} />
      {allSections.map(
        (
          { pattern: [title, animation, description], index, type },
          position,
        ) => (
          <section
            key={`${title}-${replay}`}
            style={{ overflowX: "hidden", overflowY: "hidden" }}
            className={`relative flex min-h-[82vh] w-full max-w-none items-center overflow-hidden border-b border-white/10 bg-gradient-to-br ${themes[position % themes.length]} px-4 py-20 sm:px-8 lg:px-12`}
          >
            <div className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-teal-300/10 blur-3xl" />
            <SectionMotion
              index={type === "base" ? index : position}
              paused={paused}
            >
              <div className="mx-auto w-full max-w-none">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-xs font-extrabold uppercase tracking-[.22em] text-teal-300">
                    {String(position + 1).padStart(2, "0")} · {animation}
                  </p>
                  <h1 className="mt-3 font-display text-4xl font-bold tracking-[-.045em] sm:text-6xl">
                    {title}
                  </h1>
                  <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-300">
                    {description}
                  </p>
                </div>
                <div className="mt-10 w-full">
                  {type === "base" ? (
                    <PreviewCards index={index} paused={paused} />
                  ) : type === "advanced" ? (
                    <AdvancedCards index={index} paused={paused} />
                  ) : type === "future" ? (
                    <FutureCards index={index} paused={paused} />
                  ) : (
                    <PortalCards index={index} paused={paused} />
                  )}
                </div>
              </div>
            </SectionMotion>
          </section>
        ),
      )}
    </main>
  );
}

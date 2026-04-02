# YJ-Code — Feature Planning

## Overview

A Scratch-like educational coding app for kids. Users build programs by clicking directional blocks (UP / DOWN / LEFT / RIGHT) in a code editor panel, then hit Play to watch a horse move step-by-step across a 10×10 grid toward a goal tile.

The aesthetic is intentionally simple — think early Flash arcade games. Graphics stay minimal (emoji + CSS grid) so the focus stays on the programming logic.

---

## Current Status

**v1.0 MVP — implemented**

- Split-panel layout: game board (left) / code editor (right)
- 10×10 grid with horse (🐴) and goal (⭐)
- 4 movement blocks: UP, DOWN, LEFT, RIGHT
- Sequential block execution with 500ms step animation
- Active block highlighting during playback
- Win detection + celebration modal
- Fail detection (wall collision or wrong destination)
- 5 starter levels with level selector
- Reset / Try Again / Next Level controls

---

## Architecture

### State
Single `useReducer` in `page.tsx`. No Context or external store needed at this scale.

### Animation strategy
Path is pre-computed (pure function, no React state) before any dispatch fires. This avoids stale closure bugs entirely. Each step is scheduled with `setTimeout` keyed by `(i + 1) * 500ms`. Timers are stored in a `useRef` array and cleared on reset or unmount.

### Component tree
```
page.tsx (orchestrator)
├── header (level selector)
├── GameBoard
│   ├── GridCell ×100
│   └── WinModal (overlay)
└── CodeEditor
    ├── BlockPalette (4 add buttons)
    ├── BlockSequence
    │   └── BlockItem ×n
    └── PlayButton
```

---

## Level Design

| # | Name | Start | Goal | Key skill |
|---|---|---|---|---|
| 1 | Straight Ahead | (9,0) | (9,4) | 4× RIGHT |
| 2 | Turn Right | (9,0) | (6,4) | RIGHT + UP combo |
| 3 | Down the Hill | (0,0) | (4,4) | RIGHT + DOWN combo |
| 4 | Climb Up | (4,4) | (0,9) | UP + RIGHT combo |
| 5 | Long Journey | (9,9) | (0,0) | UP + LEFT (longer path) |

---

## Roadmap

### v1.1 — Polish
- [ ] Smoother horse movement (CSS transition instead of instant jump)
- [ ] Sound effects (step blip, win jingle, fail buzzer)
- [ ] Star rating per level (fewer blocks = more stars)
- [ ] Drag-and-drop block reordering in the sequence

### v1.2 — Obstacle levels
- [ ] Add obstacle tiles to later levels (already typed + supported in engine)
- [ ] Level 6–10 with walls and required path-finding

### v2.0 — Programming concepts
- [ ] `REPEAT n [ ... ]` loop block
- [ ] `IF at-goal STOP` conditional
- [ ] Block count limit per level (teaches efficiency)
- [ ] Level editor (place start, goal, obstacles)

### v3.0 — Multiplayer / sharing
- [ ] Save/load programs
- [ ] Share a level solution via URL
- [ ] Community level submissions

---

## Tech Notes

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- No external state library (overkill for single-screen app)
- Levels are static data — no server/DB needed until user-generated content
- Emoji for graphics keeps the bundle tiny and the art zero-cost

---

## Session Log

### 2026-04-02
- Initial planning session
- Decided on pre-compute-path animation strategy to avoid stale closures
- Implemented full v1.0 MVP: 5 levels, all blocks, win/fail states

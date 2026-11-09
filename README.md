# Assignment 5

Name: Yao Chen  
JHED: ychen777

## Q2 - Blender

- Editable project: `Q2/rob.blend`
- Uncolored model: `Q2/a/rob.obj`
- Colored model: `Q2/b/rob.obj` and `Q2/b/rob.mtl` (keep together)
- Facial animation export: `Q2/c/rob.glb`
- Final animated model: `Q2/d/rob.glb`
- Images: `Q2/images/`
- Submission PDF: `Q2_submission.pdf`

Open `Q2/rob.blend` in Blender and press Space to play the walking animation. The walk uses leg IK, forward movement, and opposite arm/leg swings.

To view facial expressions, select `Eye_R`, open Object Data Properties (the green triangle), and expand Shape Keys. Set `Blink` or `Surprise` to 1. Return it to 0 before viewing the other expression. `Basis` is the neutral expression.

The Blender file retains the armature, IK constraints, Shape Keys, and three actions: Blink, Surprise, and Walk. GLB contains baked skeletal animation and morph targets.

## Q3 - Babylon.js Playground

No local server is required for this method.

1. Open https://playground.babylonjs.com/ and select JavaScript.
2. Open `Q3/playground.js` in a text editor and copy its entire contents.
3. Replace the Playground editor contents with this code. Keep the first line `export const createScene = function () {`.
4. Click **Run**.
5. Click **Choose model** in the preview and select `Q2/d/rob.glb` from this project.
6. Click **Next action / Space** to cycle through Blink, Surprise, and Walk. Space also works when the preview is focused; it does not switch actions while typing in the code editor.

Select the model again after rerunning or reopening the Playground. Saving a Playground snippet saves the code, not the selected local model. The file dialog follows the operating system's language.

On a compatible WebXR AR device, load the model and use the AR entry button when available. The controller trigger cycles through the same three actions. Camera/session permissions may be required. Desktop preview does not constitute an AR session.

## Q3 - Local webpage

Install Node.js, open a terminal in the project folder, and run:

```bash
npx --yes http-server . -p 8000 -c-1
```

Open http://localhost:8000/Q3/ in a browser. Keep the terminal running; press Control+C to stop the server. Opening `Q3/index.html` directly may prevent the model from loading.

Use **Next action / Space** to cycle through the actions, or **Reset position** to restart the current action. Immersive AR requires a compatible WebXR device and HTTPS; localhost supports desktop preview. The webpage loads Babylon.js from its CDN, so an internet connection is required.

Screenshots are provided instead of recordings. Headset AR/controller operation has not been tested on a physical device.

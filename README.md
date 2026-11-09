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

To view facial expressions, select `Eye_R`, open Object Data Properties (the green triangle), and expand Shape Keys. Set `Blink` or `Surprise` to 1. Return it to 0 before viewing the other expression. 

The Blender file retains the armature, IK constraints, Shape Keys, and three actions: Blink, Surprise, and Walk. GLB contains baked skeletal animation and morph targets.

## Q3 - Babylon.js Playground

1. Open https://playground.babylonjs.com/ and select JavaScript.
2. Open `Q3/playground.js` in a text editor and copy its entire contents.
3. Replace the Playground editor contents with this code. Keep the first line `export const createScene = function () {`.
4. Click **Run**.
5. Click **Choose model** in the preview and select `Q2/d/rob.glb` from this project.
6. Click **Next action / Space** to cycle through Blink, Surprise, and Walk. 

### Switching actions with an AR controller

1. Open the demo in a WebXR-compatible browser on an AR headset using HTTPS. For the Playground version, run the code and load `Q2/d/rob.glb` first.
2. Select the AR entry button when available and allow the required session permissions. Controller switching operates inside the immersive AR session.
3. Press and release a controller's primary select trigger (usually the index-finger trigger). Each WebXR `select` event advances the action once.
4. The model starts with **Blink**. Successive trigger presses switch to **Surprise**, then **Walk**, then **Blink** again. The selected action repeats until the next press.

The implementation listens for the AR session's `select` event, so either controller can switch actions when it emits that event; it does not require a particular A/B/X/Y button. The **Next action / Space** button provides the same cycle in desktop preview. If no AR entry button appears, confirm that the device/browser supports immersive AR and the page is served over HTTPS. Desktop preview alone does not verify headset/controller operation.

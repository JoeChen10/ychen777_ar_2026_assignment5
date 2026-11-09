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

1. Select the AR entry button and enter the play mode.
3. Press Q or left click to switch actions.
4. The model starts with **Blink**. Successive trigger presses switch to **Surprise**, then **Walk**.


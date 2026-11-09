export const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(.07, .10, .14, 1);
    const camera = new BABYLON.ArcRotateCamera('preview', Math.PI / 2 + .35, 1.2, 2.3, new BABYLON.Vector3(0, .56, 0), scene);
    camera.attachControl(canvas, true);
    new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    const panel = document.createElement('div');
    panel.style.cssText = 'position:fixed;top:80px;right:20px;z-index:1000;padding:14px;background:#152333ee;color:white;border-radius:8px;font:14px system-ui';
    const picker = document.createElement('input');
    picker.type = 'file'; picker.accept = '.glb'; picker.style.display = 'none';
    const choose = document.createElement('button'); choose.textContent = 'Choose model';
    choose.onclick = () => picker.click();
    const status = document.createElement('p'); status.textContent = 'Select Q2/d/rob.glb';
    const button = document.createElement('button'); button.textContent = 'Next action / Space'; button.disabled = true;
    panel.append(choose, picker, status, button); document.body.append(panel);
    let next = () => {}, loaded = false;
    const keydown = e => {
        if (e.code === 'Space' && !e.repeat && loaded && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT' && !e.target.isContentEditable && !e.target.closest('.monaco-editor')) {
            e.preventDefault(); next();
        }
    };
    window.addEventListener('keydown', keydown);
    scene.onDisposeObservable.add(() => { panel.remove(); window.removeEventListener('keydown', keydown); });
    picker.onchange = async () => {
        const file = picker.files[0]; if (!file || loaded) return;
        picker.disabled = true; choose.disabled = true; status.textContent = 'Loading...';
        const url = URL.createObjectURL(file);
        try {
            const result = await BABYLON.SceneLoader.ImportMeshAsync('', '', url, scene, undefined, '.glb');
            const placement = new BABYLON.TransformNode('AR placement', scene);
            result.meshes.filter(m => !m.parent).forEach(m => m.parent = placement);
            placement.scaling.setAll(.4);
            const names = ['Blink', 'Surprise', 'Walk'];
            const clips = names.map(name => result.animationGroups.find(g => g.name === name));
            if (clips.some(c => !c)) throw new Error('Missing animation clips');
            let index = -1;
            next = () => {
                result.animationGroups.forEach(g => { g.stop(); g.reset(); });
                result.meshes.forEach(m => {
                    const mm = m.morphTargetManager;
                    if (mm) for (let i = 0; i < mm.numTargets; i++) mm.getTarget(i).influence = 0;
                });
                index = (index + 1) % names.length;
                clips[index].start(true, 1);
                status.textContent = 'Action ' + (index + 1) + '/3: ' + names[index];
            };
            loaded = true; button.disabled = false; button.onclick = next; next();
            if (navigator.xr && await navigator.xr.isSessionSupported('immersive-ar')) {
                const xr = await scene.createDefaultXRExperienceAsync({ uiOptions: { sessionMode: 'immersive-ar', referenceSpaceType: 'local-floor' }, disableTeleportation: true });
                xr.baseExperience.sessionManager.onXRSessionInit.add(session => {
                    session.addEventListener('select', next);
                    xr.baseExperience.sessionManager.onXRFrameObservable.addOnce(() => {
                        const head = xr.baseExperience.camera;
                        const forward = head.getForwardRay().direction.clone(); forward.y = 0;
                        if (forward.lengthSquared() < 1e-6) forward.set(0, 0, 1);
                        forward.normalize();
                        placement.position.set(head.position.x + forward.x * 1.8, 0, head.position.z + forward.z * 1.8);
                        placement.rotation.y = Math.atan2(-forward.x, -forward.z);
                    });
                });
                xr.baseExperience.onStateChangedObservable.add(state => {
                    if (state === BABYLON.WebXRState.NOT_IN_XR) { placement.position.setAll(0); placement.rotation.y = 0; }
                });
            }
        } catch (e) { status.textContent = e.message; if (!loaded) { picker.disabled = false; choose.disabled = false; } }
        finally { URL.revokeObjectURL(url); }
    };
    return scene;
};

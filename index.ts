import {
    Engine,
    Scene,
    FreeCamera,
    ArcRotateCamera,
    HemisphericLight,
    Vector3,
    Color4,
    SceneLoader,
    MeshBuilder,
    Mesh,
    WebXRFeatureName,
    StandardMaterial,
    Color3,
    Animation,
    Tools,
} from "babylonjs";

async function CreateScene(engine: Engine, canvas: HTMLCanvasElement): Promise<Scene> {
    // scene
    const scene = new Scene(engine);
    // scene.useRightHandedSystem = true; // use right handed coordinates for the sake of mental sanity

    // camera
    const camera = new ArcRotateCamera(
        "cameraArcRotate",
        Tools.ToRadians(45),
        Tools.ToRadians(45),
        10,
        Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);

    // light
    const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // coordinate system axes
    const colorRed = new Color4(1, 0, 0, 1);
    const colorGreen = new Color4(0, 1, 0, 1);
    const colorBlue = new Color4(0, 0, 1, 1);
    const xOptions = { points: [new Vector3(0, 0, 0), new Vector3(10, 0, 0)], colors: [colorRed, colorRed] };
    const yOptions = { points: [new Vector3(0, 0, 0), new Vector3(0, 10, 0)], colors: [colorGreen, colorGreen] };
    const zOptions = { points: [new Vector3(0, 0, 0), new Vector3(0, 0, 10)], colors: [colorBlue, colorBlue] };
    MeshBuilder.CreateLines("yAxis", yOptions, scene);
    MeshBuilder.CreateLines("xAxis", xOptions, scene);
    MeshBuilder.CreateLines("zAxis", zOptions, scene);

    // actual geometry
    const cube01 = MeshBuilder.CreateBox("cube01", { size: 1 }, scene);
    cube01.position = new Vector3(0.5, 0.5, 0.5);

    // create a default environment
    const env = scene.createDefaultEnvironment();

    return scene;
}

const canvas: any = document.getElementById("renderCanvas");
const engine: Engine = new Engine(canvas, true);

CreateScene(engine, canvas).then((scene) => {
    console.log("hey");

    engine.runRenderLoop(() => {
        scene.render();
    });
});

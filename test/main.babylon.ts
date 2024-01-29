// import './style.css'
// import '@babylonjs/core/Helpers/sceneHelpers'
// import { Engine } from '@babylonjs/core/Engines/engine'
// import { Scene } from '@babylonjs/core/scene'
// import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder"
// import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'

// const canvas:HTMLCanvasElement = document.createElement( 'canvas' )
// document.body.appendChild( canvas )

// const engine = new Engine( canvas )
// const scene = new Scene( engine )

// scene.createDefaultCameraOrLight( true, false, true )

// // const box:Mesh = CreateBox( 'box', {
// // 	size: .1,
// // 	width: 2,
// // 	height: .05,
// // 	depth: .5,
// // 	faceColors: [
// // 		new Color4( 1, 0, 0, 1 ),
// // 		Color3.Green()
// // 	]
// // } )

// // const sphere:Mesh = CreateSphere( 'sphere', {
// // 	diameter: 2,
// // 	segments: 32
// // } );
// // sphere.position.y = 1;

// const ground = MeshBuilder.CreateGround( 'ground', {
// 	height: 10,
// 	width: 10,
// 	subdivisions: 5,
// 	subdivisionsX: 10
// } )
// ground.material = new StandardMaterial('standardMaterial')
// ground.material.wireframe = true

// // const groundFromHM:Mesh = CreateGroundFromHeightMap( 'groundFromHM', 'res/Huda.jpg' )

// function render() {
// 	scene.render()
// }
// engine.runRenderLoop( render )

// onresize = () => engine.resize()

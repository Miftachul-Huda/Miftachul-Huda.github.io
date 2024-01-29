import '../styles/Main.css'
import URLs from '../../app/src/URLs'

import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import Stats from 'three/addons/libs/stats.module.js'

let
stats:Stats,
scene:THREE.Scene,
camera:THREE.PerspectiveCamera,
renderer:THREE.WebGLRenderer,
pointer:THREE.Vector2,
raycaster:THREE.Raycaster,
INTERSECTED:any,
zoomControls:TrackballControls,
rotateControls:OrbitControls,
environment:RoomEnvironment,
pmremGenerator:THREE.PMREMGenerator,
dracoLoader:DRACOLoader,
loadManager:THREE.LoadingManager,
glbLoader:GLTFLoader,
texLoader:THREE.TextureLoader,
videoMap:THREE.VideoTexture,
videoEl:HTMLVideoElement,
videoListAt = 0,
url = new URLs()

const videoList = [
	url.video.AgungTech,
	url.video.BukuFisika,
	url.video.Fuzzy,
	url.video.Indiego,
	url.video.KuisArab,
	url.video.PhoneForest,
	url.video.Restoran,
	url.video.Videografi
]

init()

function init() {

	loadManager = new THREE.LoadingManager()
	texLoader = new THREE.TextureLoader( loadManager )
	dracoLoader = new DRACOLoader( loadManager ).setDecoderPath( 'lib/draco/' )
	glbLoader = new GLTFLoader( loadManager )
	glbLoader.setDRACOLoader( dracoLoader )
	loadManager.onLoad = onLoad

	stats = new Stats()
	
	renderer = new THREE.WebGLRenderer( { antialias : true } )
	renderer.setPixelRatio( devicePixelRatio )
	renderer.setSize( innerWidth, innerHeight )
	renderer.toneMapping = THREE.ACESFilmicToneMapping
	renderer.toneMappingExposure = 1

	document.body.append( renderer.domElement )
	document.body.append( stats.dom )

	camera = new THREE.PerspectiveCamera( 45, innerWidth / innerHeight, 1, 2000 )
	
	pointer = new THREE.Vector2()
	raycaster = new THREE.Raycaster()

	environment = new RoomEnvironment( renderer )
	pmremGenerator = new THREE.PMREMGenerator( renderer )

	scene = new THREE.Scene()
	scene.environment = pmremGenerator.fromScene( environment ).texture
	scene.background = new THREE.Color( 0xaaaaaa )
	environment.dispose()

	glbLoader.load( url.monitor.glb, function ( gltf ) {

		const screen:any = gltf.scene.getObjectByName( 'Monitor_Screen' )
		const display:any = gltf.scene.getObjectByName( 'Monitor_Display_LOW' )
		const stand:any = gltf.scene.getObjectByName( 'Monitor_Stand_LOW' )
		initMonitorMaterials( screen.material, display.material, stand.material )

		scene.add( gltf.scene )

	} )

}

function onLoad() {


	window.addEventListener( 'dblclick', nextVideo )
	window.addEventListener( 'resize', onWindowResize )
	document.addEventListener( 'mousemove', onPointerMove )

	createControls()
	onWindowResize()
	animate()

	lookAtMonitor()

}

function render() {

	renderer.render( scene, camera )

}

function animate() {

	requestAnimationFrame( animate )

	stats.update()
	zoomControls.update()
	rotateControls.update()

	raycast()
	render()

}

function lookAtAll() {
	
}

function lookAtChair() {

}

function lookAtMonitor() {

	const screen:any = scene.getObjectByName( 'Monitor_Screen' )
	camera.position.set( screen.position.x, screen.position.y, screen.position.z + 10 )
	camera.lookAt( screen.position )
	zoomControls.target = rotateControls.target = screen.position

}

function lookAtCPU() {

}

function lookAtKeyboard() {

}

function lookAtFan() {

}

function initMonitorMaterials( screen:THREE.MeshStandardMaterial, display:THREE.MeshStandardMaterial, stand:THREE.MeshStandardMaterial ) {

	const B_Map = texLoader.load( url.monitor.B_Map )
	const M_Map = texLoader.load( url.monitor.M_Map )
	const N_Map = texLoader.load( url.monitor.N_Map )
	const R_Map = texLoader.load( url.monitor.R_Map )

	createVideoTexture()

	B_Map.colorSpace = THREE.SRGBColorSpace
	B_Map.flipY = false

	M_Map.colorSpace = THREE.NoColorSpace
	M_Map.flipY = false

	N_Map.colorSpace = THREE.NoColorSpace
	N_Map.flipY = false

	R_Map.colorSpace = THREE.NoColorSpace
	R_Map.flipY = false

	videoMap.colorSpace = THREE.SRGBColorSpace
	videoMap.flipY = false
	videoMap.channel = 1
	videoMap.needsUpdate = true

	display.side = stand.side = screen.side = THREE.FrontSide
	display.map = stand.map = B_Map
	display.normalMap = stand.normalMap = screen.normalMap = N_Map
	display.metalnessMap = stand.metalnessMap = screen.metalnessMap = M_Map
	display.roughnessMap = stand.roughnessMap = screen.roughnessMap = R_Map

	screen.toneMapped = false
	screen.color.set( 0x000000 )
	screen.emissive.set( 0xffffff )
	screen.emissiveMap = videoMap
	screen.emissiveIntensity = .7

}

function onWindowResize() {

	camera.aspect = innerWidth / innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize( innerWidth, innerHeight )

}

function onPointerMove( event:MouseEvent ) {

	pointer.x = ( event.clientX / innerWidth ) * 2 - 1
	pointer.y = - ( event.clientY / innerHeight ) * 2 + 1

}

function raycast() {
	
	raycaster.setFromCamera( pointer, camera )

	const intersects = raycaster.intersectObjects( scene.children[0].children, false )

	if ( intersects.length > 0 ) {

		if ( INTERSECTED != intersects[ 0 ].object ) {

			INTERSECTED = intersects[ 0 ].object

		}

	} else {

		if (INTERSECTED != null ) INTERSECTED = null

	}
}

function createVideoTexture() {

	videoEl = document.createElement('video')
	videoEl.loop = true
	videoEl.playsInline = true
	videoMap = new THREE.VideoTexture( videoEl )

}

function updateVideoTexture( _url:string ) {
	
	videoEl.src = _url
	videoEl.play()

}

function createControls() {

	zoomControls = new TrackballControls( camera, renderer.domElement )
	zoomControls.dynamicDampingFactor = .1
	zoomControls.noPan = true
	zoomControls.noRotate = true
	zoomControls.zoomSpeed = .3
	zoomControls.minDistance = 7
	zoomControls.maxDistance = 30

	rotateControls = new OrbitControls( camera, renderer.domElement )
	rotateControls.enablePan = false
	rotateControls.enableZoom = false
	rotateControls.enableDamping = true
	rotateControls.dampingFactor = .1
	rotateControls.rotateSpeed = .5

}

function nextVideo() {

	if ( INTERSECTED && INTERSECTED.name == 'Monitor_Screen' ) updateVideoTexture( videoList[ videoListAt ++ ] )
	if ( videoListAt == videoList.length ) videoListAt = 0

}
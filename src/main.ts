import './style.css'
import { AmbientLight, GridHelper, Mesh, MeshStandardMaterial, PointLight, PointLightHelper, Scene, TorusGeometry, WebGLRenderer } from 'three'
import { CinematicCamera } from 'three/addons/cameras/CinematicCamera.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene:Scene = new Scene()
const camera:CinematicCamera = new CinematicCamera( 75, innerWidth / innerHeight, .1, 1000 )
const renderer:WebGLRenderer = new WebGLRenderer()

renderer.setPixelRatio( devicePixelRatio )
renderer.setSize( innerWidth, innerHeight )
camera.position.setZ( 30 ) 

document.body.appendChild(renderer.domElement)

const geometry:TorusGeometry = new TorusGeometry( 10, 3, 16, 100 )
const material:MeshStandardMaterial = new MeshStandardMaterial({ color: 0xFF6347 })
const torus:Mesh = new Mesh( geometry, material )

const pointLight:PointLight = new PointLight( 0xFFFFFF )
pointLight.position.set( 5, 5, 5 )

const ambientLight:AmbientLight = new AmbientLight( 0xFFFFFF )
const lightHelper:PointLightHelper = new PointLightHelper(pointLight)
const gridHelper:GridHelper = new GridHelper( 200, 50 )

const controls:OrbitControls = new OrbitControls( camera, renderer.domElement )

scene.add( torus, pointLight, ambientLight, lightHelper, gridHelper )

function animate():void {
	requestAnimationFrame( animate )

	torus.rotation.x += .01
	torus.rotation.y += .005
	torus.rotation.z += .01

	controls.update()

	renderer.render( scene, camera )
}
animate()
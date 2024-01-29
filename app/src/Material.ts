import URLs from './URLs'
import Loader from './Loader'
import { FrontSide, MeshStandardMaterial, NoColorSpace, SRGBColorSpace, VideoTexture } from 'three'

export default class Material {

	private url:URLs
	private texLoader:Loader['texLoader']
	private videoMap:VideoTexture
	private videoEl:HTMLVideoElement
	
	constructor( loader:Loader, videoEl:HTMLVideoElement ) {

		this.url = new URLs
		this.texLoader = loader.texLoader
		this.videoEl = videoEl
		this.videoMap = new VideoTexture( this.videoEl )
	
	}

	public monitor( screen:MeshStandardMaterial, display:MeshStandardMaterial, stand:MeshStandardMaterial ) {

		const B_Map = this.texLoader.load( this.url.monitor.B_Map )
		const M_Map = this.texLoader.load( this.url.monitor.M_Map )
		const N_Map = this.texLoader.load( this.url.monitor.N_Map )
		const R_Map = this.texLoader.load( this.url.monitor.R_Map )
	
		B_Map.colorSpace = SRGBColorSpace
		B_Map.flipY = false
	
		M_Map.colorSpace = NoColorSpace
		M_Map.flipY = false
	
		N_Map.colorSpace = NoColorSpace
		N_Map.flipY = false
	
		R_Map.colorSpace = NoColorSpace
		R_Map.flipY = false
	
		this.videoMap.colorSpace = SRGBColorSpace
		this.videoMap.flipY = false
		this.videoMap.channel = 1
	
		display.side = stand.side = screen.side = FrontSide
		display.map = stand.map = B_Map
		display.normalMap = stand.normalMap = screen.normalMap = N_Map
		display.metalnessMap = stand.metalnessMap = screen.metalnessMap = M_Map
		display.roughnessMap = stand.roughnessMap = screen.roughnessMap = R_Map
	
		screen.toneMapped = false
		screen.color.set( 0x000000 )
		screen.emissive.set( 0xffffff )
		screen.emissiveMap = this.videoMap
		screen.emissiveIntensity = .7

	}
}
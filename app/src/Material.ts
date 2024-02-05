import URLs from './URLs'
import { FrontSide, MeshStandardMaterial, NoColorSpace, SRGBColorSpace, TextureLoader, VideoTexture } from 'three'

export default class Material {

	private texLoader:TextureLoader
	public screenVideoMap:VideoTexture
	public changeScreenMap:Function
	
	constructor( texLoader:TextureLoader, videoEl:HTMLVideoElement ) {

		this.texLoader = texLoader
		this.screenVideoMap = new VideoTexture( videoEl )
	
	}

	public monitor( screen:MeshStandardMaterial, display:MeshStandardMaterial, stand:MeshStandardMaterial ) {
	
		this.screenVideoMap.colorSpace = SRGBColorSpace
		this.screenVideoMap.flipY = false
		this.screenVideoMap.channel = 1
	
		display.side = stand.side = screen.side = FrontSide	
		screen.toneMapped = false
		screen.color.set( 0x000000 )
		screen.emissive.set( 0xffffff )
		screen.emissiveIntensity = .7

		this.changeScreenMap = map => {

			screen.emissiveMap = map
			
		}

		this.changeScreenMap( this.screenVideoMap )

	}
	public desk( desk_base:MeshStandardMaterial, desk_top:MeshStandardMaterial, desk_bottom:MeshStandardMaterial ) {

		const url = new URLs
		const desk_base_ao = this.texLoader.load( url.texture.DeskBase_AO )

		desk_base_ao.flipY  = false
		desk_base_ao.colorSpace = NoColorSpace

		desk_base.side = desk_top.side = desk_bottom.side = FrontSide
		desk_base.aoMap = desk_base_ao
		desk_base.aoMapIntensity = 0
		
	}

}
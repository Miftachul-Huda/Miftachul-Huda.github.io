import { FrontSide, MeshStandardMaterial, SRGBColorSpace, VideoTexture } from 'three'

export default class Material {

	public screenVideoMap:VideoTexture
	public changeScreenMap:Function
	
	constructor( videoEl:HTMLVideoElement ) {

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

		desk_base.side = desk_top.side = desk_bottom.side = FrontSide	
		
	}

}
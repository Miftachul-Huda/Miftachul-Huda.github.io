import { Texture } from 'three'
import Material from './Material'
import URLs from './URLs'
import Loader from './Loader'

export default class Image {

	private imageList:Array<string[]>
	public listAt:number[]
	public el:HTMLVideoElement
	private material:Material
	private imageMap:Texture
	private loader:Loader

	constructor( material:Material, loader:Loader ) {

		const url = new URLs
		this.el = document.createElement('video')
		this.el.loop = true
		this.el.playsInline = true
		this.material = material
		this.loader = loader
		this.listAt = [ 0, 0 ]

		this.imageList = [
			[
				url.image.AgungTech_1,
				url.image.AgungTech_2,
				url.image.AgungTech_3,
				url.image.AgungTech_4,
				url.image.AgungTech_5,
				url.image.AgungTech_6,
				url.image.AgungTech_7,
				url.image.AgungTech_8,
				url.image.AgungTech_9,
				url.image.AgungTech_10,
				url.image.AgungTech_11
			],
			[
				url.image.BukuFisika_1,
				url.image.BukuFisika_2,
				url.image.BukuFisika_3
			],
			[
				url.image.Fuzzy_1,
				url.image.Fuzzy_2,
				url.image.Fuzzy_3,
				url.image.Fuzzy_4,
				url.image.Fuzzy_5,
				url.image.Fuzzy_6
			],
			// [
			// 	url.image.Indiego_1,
			// 	url.image.Indiego_2
			// ],
			[
				url.image.KuisArab_1,
				url.image.KuisArab_2,
				url.image.KuisArab_3,
				url.image.KuisArab_4,
				url.image.KuisArab_5,
				url.image.KuisArab_6
			],
			[
				url.image.PhoneForest_1,
				url.image.PhoneForest_2,
				url.image.PhoneForest_3,
				url.image.PhoneForest_4,
				url.image.PhoneForest_5,
				url.image.PhoneForest_6,
				url.image.PhoneForest_7,
				url.image.PhoneForest_8,
				url.image.PhoneForest_9,
				url.image.PhoneForest_10
			],
			// [
			// 	url.image.Premiere_1,
			// 	url.image.Premiere_2,
			// 	url.image.Premiere_3,
			// 	url.image.Premiere_4
			// ],
			[
				url.image.Restoran_1,
				url.image.Restoran_2,
				url.image.Restoran_3,
				url.image.Restoran_4,
				url.image.Restoran_5,
				url.image.Restoran_6,
				url.image.Restoran_7,
				url.image.Restoran_8,
				url.image.Restoran_9,
				url.image.Restoran_10,
				url.image.Restoran_11,
				url.image.Restoran_12,
				url.image.Restoran_13,
				url.image.Restoran_14
			],
			[
				url.image.Videografi_1,
				url.image.Videografi_2,
				url.image.Videografi_3,
				url.image.Videografi_4,
				url.image.Videografi_5,
				url.image.Videografi_6,
				url.image.Videografi_7,
				url.image.Videografi_8
			],
			// [
			// 	url.image.WHStitching_1,
			// 	url.image.WHStitching_2,
			// 	url.image.WHStitching_3,
			// 	url.image.WHStitching_4,
			// 	url.image.WHStitching_5,
			// 	url.image.WHStitching_6,
			// 	url.image.WHStitching_7,
			// 	url.image.WHStitching_8,
			// 	url.image.WHStitching_9
			// ],
			[
				url.image.VideoNotAvailable
			]
		]

	}

	public change( index:number ) {

		if ( index == -1 ) this.listAt = [ this.imageList.length - 1, 0]
		else this.listAt = [index, 0 ]
		this.changeMap( this.listAt[1] )

	}

	private changeMap( at:number ) {

		if ( this.imageMap ) this.imageMap.dispose()
		this.imageMap = this.loader.texLoader.load( this.imageList[ this.listAt[0] ][ at ] )
		this.imageMap.flipY = false
		this.material.changeScreenMap( this.imageMap )

	}

	public prev() {

		if ( this.listAt[1] > 0 ) this.changeMap( --this.listAt[1] )
			
	}

	public next() {

		if ( this.listAt[1] < this.imageList[ this.listAt[0] ].length - 1 )

			this.changeMap( ++this.listAt[1] )

	}
}
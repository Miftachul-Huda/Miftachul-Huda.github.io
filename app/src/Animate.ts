import UI from './UI'
import URLs from './URLs'
import Controls from './Controls'
import FpsLimiter from './utils/FpsLimiter'
import { getProject, types, IProject, ISheet } from '@theatre/core'
import { MathUtils, PerspectiveCamera } from 'three'
// import studio from '@theatre/studio'

export default class Animate {

	private project:IProject
	private controls:Controls
	private sheet:ISheet[]
	private isReady:boolean
	private isLoaded:boolean
	private isStarted:boolean
	private ui:UI

	constructor( object:any, controls:Controls, ui:UI ) {

		const url = new URLs
		this.ui = ui
		this.isReady = false
		this.isLoaded = false
		this.isStarted = false

		this.project = getProject( 'Portofolio', { state : url.anim.Portofolio } )
		this.controls = controls
		this.sheet = []

		this.loaderInit( object )
		this.cameraInit( controls.camera )

		// studio.initialize()

		this.project.ready.then( () => this.loaderShow() )

		new FpsLimiter( () => this.update(), 5 )
		
	}

	private cameraInit( _camera:PerspectiveCamera ) {

		const sheet:ISheet = this.project.sheet('Camera')

		const camera = sheet.object( 'camera', {

			position: types.compound({
				x: types.number(_camera.position.x, { range: [-100, 100], nudgeMultiplier : 0.01 }),
				y: types.number(_camera.position.y, { range: [-100, 100], nudgeMultiplier : 0.01 }),
				z: types.number(_camera.position.z, { range: [-100, 100], nudgeMultiplier : 0.01 }),
			}),
			rotation: types.compound({
				x: types.number(_camera.rotation.x, { range: [-180, 180], nudgeMultiplier : 1 }),
				y: types.number(_camera.rotation.y, { range: [-180, 180], nudgeMultiplier : 1 }),
				z: types.number(_camera.rotation.z, { range: [-180, 180], nudgeMultiplier : 1 }),
			}),
		} )

		camera.onValuesChange( v => {

			_camera.position.x = v.position.x
			_camera.position.y = v.position.y
			_camera.position.z = v.position.z
			_camera.rotation.x = v.rotation.x * MathUtils.DEG2RAD
			_camera.rotation.y = v.rotation.y * MathUtils.DEG2RAD
			_camera.rotation.z = v.rotation.z * MathUtils.DEG2RAD

		} )

		this.sheet['Camera'] = sheet
	
	}

	private cameraPlay() {

		const camera = this.sheet['Camera']
		return camera.sequence.play()		
	}

	private loaderInit( object:any ) {

		const sheet:ISheet = this.project.sheet('Loader')

		const _container:HTMLElement = object.container
		const _loader:HTMLElement = object.loader
		const _ring:HTMLElement = _loader.querySelector( 'ring' )
		const _textTitle:HTMLElement = _loader.querySelector( 'text[title]' )
		const _textPercent:HTMLElement = _loader.querySelector( 'text[percent]' )
		const _textFiles:HTMLElement = _loader.querySelector( 'text[files]' )

		const container = sheet.object( 'container', {

			size		: types.number( 0, { range: [ 0, 100 ] }),
			blur		: types.number( 0, { range: [ 0, 10 ] }),
			opacity	: types.number( 0, { range: [ 0, 1 ] }),

		} )

		container.onValuesChange( v => {

			let size:number, width:number, height:number, radius:number, _50:number, ringSize = 100

			if ( innerWidth > innerHeight ) { // Landscape

				_50 = ( innerHeight / innerWidth ) * 100
				_50 *= ( 100 - v.size ) / ( 100 - _50 )
				size		= ( ( innerWidth - ringSize ) * ( v.size / 100 ) ) + ringSize
				width		= size
				height	= size < innerHeight ? size : innerHeight
				radius	= size < innerHeight ? 50 : _50

			} else { // Portrait

				_50 = ( innerWidth / innerHeight ) * 100
				_50 *= ( 100 - v.size ) / ( 100 - _50 )
				size		= ( ( innerHeight - ringSize ) * ( v.size / 100 ) ) + ringSize
				width		= size < innerWidth ? size : innerWidth
				height	= size
				radius	= size < innerWidth ? 50 : _50

			}

			if ( v.size == 100 ) {

				_container.style.position			= `fixed`
				_container.style.width				= `100%`
				_container.style.height				= `100%`
				_container.style.margin				= `0`
				_container.style.padding			= `0`
				_container.style.top					= `0`
				_container.style.left					= `0`
				_container.style.border				= `0`
				_container.style.borderRadius	= `0`
	
			} else {

				_container.style.width				= `${ width }px`
				_container.style.height				= `${ height }px`
				_container.style.marginLeft		= `${ (width+4) / -2 }px`
				_container.style.marginTop		= `${ (height+4) / -2 }px`
				_container.style.filter				= `blur(${ v.blur }px)`
				_container.style.opacity			= `${ v.opacity }`
				_container.style.borderRadius	= `${ radius }%`
				_ring.style.width							= `${ size }px`
				_ring.style.height						= `${ size }px`
				_ring.style.marginLeft				= `${ (size+4) / -2 }px`
				_ring.style.marginTop					= `${ (size+4) / -2 }px`

			}
		} )

		const loader = sheet.object( 'loader', {

			active : types.boolean( true ),
			opacity	: types.number( 1, { range: [ 0, 1 ] }),

		} )

		loader.onValuesChange( v => {

			_loader.style.display	= v.active ? '' : 'none'
			_loader.style.opacity	= `${ v.opacity }`

		} )

		const text = sheet.object( 'text', {

			titleScale	: types.number( 1, { range: [ 0, 1 ] }),
			scale				: types.number( 1, { range: [ 0, 1 ] }),
			opacity			: types.number( 1, { range: [ 0, 1 ] }),
			isReady			: types.boolean( false ),

		} )

		text.onValuesChange( v => {

			_textTitle.style.transform		= `scale(${ v.titleScale })`
			_textPercent.style.transform	=
			_textFiles.style.transform		= `scale(${ v.scale })`
			_textTitle.style.opacity			= 
			_textPercent.style.opacity		= 
			_textFiles.style.opacity			= `${ v.opacity }`

			if ( v.isReady ) _textFiles.textContent = 'READY'

		} )

		this.sheet['Loader'] = sheet
		
	}

	private loaderShow() {

		const loader:ISheet = this.sheet['Loader']

		loader.sequence.play({ range : [ 0, 0.5 ] })
		.then( () => this.isReady = true )
		
	}

	private loaderHide() {

		const loader:ISheet = this.sheet['Loader']

		return loader.sequence.play({ range : [ 0.5, 2 ] })		
		
	}

	public onLoad() {

		this.isLoaded = true

	}

	private update() {

		if ( !this.isStarted && this.isLoaded && this.isReady && this.project.isReady ) {

			this.start()
			this.isStarted = true

		}

	}

	private start() {

		this.loaderHide()
		.then(() => this.cameraPlay()
		.then(() => {

			this.controls.lookAt.monitor()
			if ( location.hash != '' ) this.ui.monitorShow()

		}))
		
	}
}
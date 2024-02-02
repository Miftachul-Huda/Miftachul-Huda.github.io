export default class FpsLimiter {

  private targetFps = 0
	private fpsInterval = 0
  private lastTime = 0
	private lastOverTime = 0
	private prevOverTime = 0
	private deltaTime = 0
	private callback:Function

	constructor( callback:Function, fps = 60 ) {

		this.callback = callback

		this.updateFps( fps )

		this.animate()

	}

  private updateFps( value:number ) {

    this.targetFps = value
    this.fpsInterval = 1000 / this.targetFps

  }

	public get fps() {

		return this.targetFps

	}

	public set fps( value ) {

		this.updateFps( value )

	}

	private update( time:number ) {

		this.deltaTime = time - this.lastTime

		if ( this.deltaTime >= this.fpsInterval ) {

			this.prevOverTime = this.lastOverTime
			this.lastOverTime = this.deltaTime % this.fpsInterval
			this.lastTime = time - this.lastOverTime
			this.deltaTime -= this.prevOverTime

			this.callback( this.deltaTime )

		}
	}

	private animate( time = 0 ) {

		this.update( time )

		requestAnimationFrame( time => this.animate( time ) )

	}
}
// const OT = await import("@opentok/client");
// import OT from "@opentok/client"
// console.log(OT)
export class Vonage {
  OT: any
  apiKey: string
  sessionId: string

  isEntered: boolean

  publisherOpts: object
  sessionObj: any
  publisherObj: any
  subscribeOpts: object

  // OT: any, 
  constructor(OT: any, apiKey: string, sessionId: string){
    this.OT = OT
    this.apiKey = apiKey
    this.sessionId = sessionId

    this.isEntered = false

    this.sessionObj = null
    this.publisherObj = null
    this.publisherOpts = {
      fitMode: "cover",
      insertMode: "append",
      name: "",
      style: {
        audioLevelDisplayMode: "off",
        archiveStatusDisplayMode: "off",
        buttonDisplayMode: "off",
        nameDisplayMode: "on",
      },
    };
    this.subscribeOpts = {
      fitMode: "contain",
      insertMode: "append",
      style: {
        audioBlockedDisplayMode: "off",
        audioLevelDisplayMode: "off",
        buttonDisplayMode: "off",
        nameDisplayMode: "on",
        videoDisabledDisplayMode: "off",
      },
    }
  };

  // async sample() {
  //   const OT = await import("@opentok/client");
  //   this.OT = OT
  //   console.log(OT)
  //   console.log(this.OT)
  // }

  /**
   * 
   */
  initSession() {
    this.sessionObj = this.OT.initSession(this.apiKey, this.sessionId)
    .on('streamCreated', (e) => {
      console.log('streamCreated', e)
      this.sessionObj.subscribe(e.stream, 'videos', this.subscribeOpts);
    }, this)
    .on('streamDestroyed', (e) => {
      console.log('streamDestroyed', e)
    })
    .on('sessionConnected', (e) => {
      console.log('sessionConnected', e)
    })
    .on('sessionDisconnected', (e) => {
      console.log('sessionDisconnected', e)
    })
    .on('connectionCreated', (e) => {
      console.log('connectionCreated', e)
    })
    .on('connectionDestroyed', (e) => {
      console.log('connectionDestroyed', e)
    })
    // console.log(this.sessionObj)
  }

  initPublisher() {
    this.publisherObj = this.OT.initPublisher('videos', this.publisherOpts)
  }

  async sessionConnect(token: string): Promise<boolean> {
    await new Promise((resolve) => {
      this.sessionObj.connect(token, (e: Error) => {
        if(e) {
          console.log('error', e)
          resolve(false)
        } else {
          this.sessionObj.publish(this.publisherObj)
          resolve(true)
        }
      })
    }).then((isEntered: boolean) => {
      this.isEntered = isEntered
    })
    return this.isEntered
  }

  sessionDisconnect(): boolean {
    this.sessionObj.disconnect()
    this.isEntered = false
    return this.isEntered
  }
}
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

  /**
   * セッションオブジェクト初期化
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

  /**
   * publisherオブジェクト初期化
   */
  initPublisher() {
    this.publisherObj = this.OT.initPublisher('videos', this.publisherOpts)
  }

  /**
   * sessionに接続
   * @param {string} token
   * @returns {boolean}
   */
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

  /**
   * sessionの接続解除
   * @returns {boolean}
   */
  sessionDisconnect(): boolean {
    this.sessionObj.disconnect()
    this.isEntered = false
    return this.isEntered
  }
}
// const OT = await import("@opentok/client");
// import OT from "@opentok/client"
// console.log(OT)
export class Vonage {
  OT: any
  apiKey: string
  sessionId: string
  publisherOpts: object // 仮の型
  sessionObj: any
  publisherObj: any
  subscribeOpts: any

  // OT: any, 
  constructor(OT: any, apiKey: string, sessionId: string){
    this.OT = OT
    this.apiKey = apiKey
    this.sessionId = sessionId

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

  initSession() {
    this.sessionObj = this.OT.initSession(this.apiKey, this.sessionId).on('streamCreated', (e) => {
      console.log('streamCreated', e)
      this.sessionObj.subscribe(e.stream, 'videos', this.subscribeOpts);
    }, this);
    // console.log(this.sessionObj)
  }

  initPublisher() {
    this.publisherObj = this.OT.initPublisher('videos', this.publisherOpts)
  }

  sessionConnect(token: string) {
    this.sessionObj.connect(token, (e: Error) => {
      if(e) {
        console.log('error', e)
      } else {
        this.sessionObj.publish(this.publisherObj)
      }
    } )
  }
}
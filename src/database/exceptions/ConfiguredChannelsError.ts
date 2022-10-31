/**
 * Error thrown on attempts at modifying a non-configured channel
 */
export class ChannelNotConfiguredError extends Error {
  readonly channelUuid;

  public constructor(uuid:string) {
    super();
    this.channelUuid = uuid;
  }
}
let nextIdentifier:number = 0;

type StoredListener =  {
    func : (eventData:Object) => boolean|void;
    id : number
}

/**
 * When inherited, allows a class to emit events and to be listened for the events to trigger arbitrary actions
 */
export abstract class EventListenable {

    /**
     * List of all listeners of this EventListenable inheriting class, not to be edited manually
     */
    readonly listeners = new Map<string, StoredListener[]>();


    /**
     * Adds a listener function to this class instance
     * @param eventName event name that will be listened
     * @param listener listener function, called whenever the event with this name is triggered, and returning true if the event must be cancelled (false or nothing otherwise)
     * @returns a unique ID for this event listener, so it can be removed later if necessary
     */
    on(eventName:string, listener:(eventData:Object) => boolean|void) : number {
        let listeners = this.listeners.get(eventName);
        if(listeners === undefined) {
            listeners = [];
            this.listeners.set(eventName, listeners);
        }
        listeners.push({id:nextIdentifier, func:listener});
        return nextIdentifier++;
    }


    /**
     * Triggers an event coming from this class instance
     * @param eventName name of the triggered event
     * @param eventData data object related to the event, provided as the only argument to all the listener functions previously added using myInstance.on(eventName, listenerFunction)
     * @returns whether any of the functions has required the event to be cancelled
     */
    emit(eventName:string, eventData:Object) : boolean {
        let listeners = this.listeners.get(eventName);
        if(listeners === undefined)
            return true;
        else {
            let cancelled:boolean = false;
            for(let listener of listeners) {
                cancelled = cancelled || listener.func(eventData) === true;
            }
            return cancelled;
        }
    }

    /**
     * removes a listener from this class instance based on the ID provided when the listener was added using myInstance.on(eventName, listener)
     * @param eventName (necessary) Name of the event the listener listens to
     * @param listenerId ID of the listener that must be removed from this event, provided when the listener was added
     * @returns true if the listener was successfully removed, false the listener was not found, possibly because of a wrong event name
     */
    removeListener(eventName:string, listenerId:number) : boolean {
        const listeners = this.listeners.get(eventName);
        if(listeners === undefined)
            return false;
        
        const index:number = listeners.findIndex(listener => listener.id === listenerId);
        if(index === -1)
            return false;

        listeners.splice(index, 1);
        return true;
    }

}